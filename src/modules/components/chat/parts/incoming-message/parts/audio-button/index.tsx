import { useEffect, useRef, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio'
import { ChatMessage } from '~/modules/components/chat/index.types'
import { Icon } from '~/modules/ui/icon'
import { logInfo } from '~/services/logger'

interface AudioButtonProps {
  message: ChatMessage
}

export function AudioButton({ message }: AudioButtonProps) {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null)
  const player = useAudioPlayer()
  const status = useAudioPlayerStatus(player)
  const previousPlayingRef = useRef<boolean>(false)

  logInfo(
    `currentIndex: ${currentIndex}, playing: ${status.playing}, currentTime: ${status.currentTime}, duration: ${status.duration}`
  )

  // Monitor playback status and advance to next audio when current one finishes
  useEffect(() => {
    if (!message.audioSources || currentIndex === null) return

    // Detect transition from playing to not playing (audio just finished)
    const justFinished = previousPlayingRef.current && !status.playing
    previousPlayingRef.current = status.playing

    // Check if current audio has finished playing (and it actually finished, not paused at start)
    if (justFinished && status.currentTime > 0 && status.currentTime >= status.duration) {
      logInfo('Audio finished at index:', currentIndex)

      // Move to next audio
      const nextIndex = currentIndex + 1

      if (nextIndex < message.audioSources.length) {
        // Play next audio
        logInfo('Playing next audio at index:', nextIndex)
        setCurrentIndex(nextIndex)
        player.replace({ uri: message.audioSources[nextIndex] })
        player.play()
      } else {
        // Queue finished
        logInfo('Queue finished')
        setCurrentIndex(null)
      }
    }
  }, [status.playing, status.currentTime, status.duration, currentIndex, message.audioSources, player])

  function handlePlayAudio() {
    const audioSources = message.audioSources

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

  if (!message.audioSources || message.audioSources?.length === 0) return null

  return (
    <TouchableOpacity onPress={handlePlayAudio}>
      <Icon size="lg" color="secondary" name={status.playing ? 'pause-outline' : 'volume-high-outline'} />
    </TouchableOpacity>
  )
}
