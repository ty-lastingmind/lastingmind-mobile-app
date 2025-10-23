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
  const hasAutoPlayedRef = useRef<boolean>(false)
  const audioSources = useMemo(() => message.data.map((data) => data.audioSrc), [message.data])

  logInfo(
    `currentIndex: ${currentIndex}, playing: ${status.playing}, currentTime: ${status.currentTime}, duration: ${status.duration}`
  )

  // Auto-play audio on mount if available
  useEffect(() => {
    if (hasAutoPlayedRef.current) return
    if (!audioSources || audioSources.length === 0) return
    if (!audioSources[0]) return

    hasAutoPlayedRef.current = true
    logInfo('Auto-playing audio on mount')
    
    // Set index and start playing simultaneously
    setCurrentIndex(0)
    player.replace({ uri: audioSources[0] })
    player.play()
  }, [audioSources, player])

  // Monitor playback status and advance to next audio when current one finishes
  useEffect(() => {
    if (!audioSources || currentIndex === null) return

    // Detect transition from playing to not playing (audio just finished)
    const justFinished = previousPlayingRef.current && !status.playing
    previousPlayingRef.current = status.playing

    // Check if current audio has finished playing (and it actually finished, not paused at start)
    if (justFinished && status.currentTime > 0 && status.currentTime >= status.duration) {
      logInfo('Audio finished at index:', currentIndex)

      // Move to next audio
      const nextIndex = currentIndex + 1

      if (nextIndex < audioSources.length) {
        // Play next audio
        logInfo('Playing next audio at index:', nextIndex)
        setCurrentIndex(nextIndex)
        player.replace({ uri: audioSources[nextIndex] })
        player.play()
      } else {
        // Queue finished
        logInfo('Queue finished')
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

