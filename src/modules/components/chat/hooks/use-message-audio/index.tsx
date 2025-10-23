import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio'
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { IncomingChatMessage } from '~/modules/components/chat/index.types'
import { logInfo } from '~/services/logger'

interface MessageAudioContextValue {
  player: ReturnType<typeof useAudioPlayer>
  status: ReturnType<typeof useAudioPlayerStatus>
  currentIndex: number | null
  isPlaying: boolean
  handlePlayAudio: () => void
}

const MessageAudioContext = createContext<MessageAudioContextValue | null>(null)

interface MessageAudioProviderProps extends PropsWithChildren {
  message: IncomingChatMessage
}

export function MessageAudioProvider({ message, children }: MessageAudioProviderProps) {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null)
  const player = useAudioPlayer()
  const status = useAudioPlayerStatus(player)
  const previousPlayingRef = useRef<boolean>(false)
  const lastProcessedIndexRef = useRef<number>(-1)
  const audioSources = useMemo(() => message.data.map((data) => data.audioSrc), [message.data])

  logInfo(
    `currentIndex: ${currentIndex}, playing: ${status.playing}, currentTime: ${status.currentTime}, duration: ${status.duration}, audioSources: ${audioSources.length}`
  )

  // Auto-play audio when new parts with audio arrive
  useEffect(() => {
    if (!audioSources || audioSources.length === 0) return

    // Find the first unprocessed audio source
    const nextAudioIndex = audioSources.findIndex((src, idx) => src && idx > lastProcessedIndexRef.current)
    
    if (nextAudioIndex === -1) return // No new audio sources

    // If we're not currently playing anything, auto-play the new audio
    if (currentIndex === null && !status.playing) {
      logInfo('Auto-playing new audio at index:', nextAudioIndex)
      lastProcessedIndexRef.current = nextAudioIndex
      setCurrentIndex(nextAudioIndex)
      player.replace({ uri: audioSources[nextAudioIndex] })
      player.play()
    }
  }, [audioSources, currentIndex, status.playing, player])

  // Monitor playback status and advance to next audio when current one finishes
  useEffect(() => {
    if (!audioSources || currentIndex === null) return

    // Detect transition from playing to not playing (audio just finished)
    const justFinished = previousPlayingRef.current && !status.playing
    previousPlayingRef.current = status.playing

    // Check if current audio has finished playing (and it actually finished, not paused at start)
    if (justFinished && status.currentTime > 0 && status.currentTime >= status.duration) {
      logInfo('Audio finished at index:', currentIndex)

      // Update last processed index
      lastProcessedIndexRef.current = currentIndex

      // Look for next audio source (might be at currentIndex + 1 or later if some parts don't have audio)
      const nextIndex = audioSources.findIndex((src, idx) => src && idx > currentIndex)

      if (nextIndex !== -1) {
        // Play next audio
        logInfo('Playing next audio at index:', nextIndex)
        setCurrentIndex(nextIndex)
        player.replace({ uri: audioSources[nextIndex] })
        player.play()
      } else {
        // No more audio in queue (for now)
        logInfo('Queue finished (waiting for more parts)')
        setCurrentIndex(null)
      }
    }
  }, [status.playing, status.currentTime, status.duration, currentIndex, audioSources, player])

  function handlePlayAudio() {
    if (!audioSources || audioSources.length === 0) return

    // If already playing, stop
    if (status.playing) {
      player.pause()
      setCurrentIndex(null)
      previousPlayingRef.current = false
      return
    }

    // Start playing from first audio
    logInfo('Starting playback from index 0')
    setCurrentIndex(0)
    previousPlayingRef.current = false
    player.replace({ uri: audioSources[0] })
    player.play()
  }

  const value: MessageAudioContextValue = {
    player,
    status,
    currentIndex,
    isPlaying: status.playing,
    handlePlayAudio,
  }

  return <MessageAudioContext.Provider value={value}>{children}</MessageAudioContext.Provider>
}

export function useMessageAudio() {
  const context = useContext(MessageAudioContext)
  if (!context) {
    throw new Error('useMessageAudio must be used within MessageAudioProvider')
  }
  return context
}

