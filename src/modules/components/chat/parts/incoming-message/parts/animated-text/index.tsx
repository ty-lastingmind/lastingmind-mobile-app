import { useEffect, useMemo, useRef } from 'react'
import { Text, View } from 'react-native'
import Animated, { FadeIn, FadeInLeft } from 'react-native-reanimated'
import { useMessageAudio } from '~/modules/components/chat/hooks/use-message-audio'
import { IncomingMessageDataItem } from '~/modules/components/chat/index.types'
import { Typography } from '~/modules/ui/typography'

interface AnimatedTextProps {
  messageData: IncomingMessageDataItem[]
}

interface CharacterData {
  char: string
  delay: number
  messageIndex: number
  charIndex: number
}

export function AnimatedText({ messageData }: AnimatedTextProps) {
  const { currentIndex: currentAudioIndex } = useMessageAudio()
  const hasStartedPlayingRef = useRef(false)
  const hasCompletedAnimationRef = useRef(false)

  // Track if audio has ever started playing
  useEffect(() => {
    if (currentAudioIndex !== null) {
      hasStartedPlayingRef.current = true
    }
  }, [currentAudioIndex])

  // Track when animation completes (audio finishes playing)
  useEffect(() => {
    if (hasStartedPlayingRef.current && currentAudioIndex === null) {
      hasCompletedAnimationRef.current = true
    }
  }, [currentAudioIndex])

  // Build character data with delay timing for each message part
  const messageCharacters = useMemo(() => {
    return messageData.map((data, messageIndex) => {
      const chars: CharacterData[] = []

      if (data.alignment) {
        const { characters, character_start_times_seconds } = data.alignment

        characters.forEach((char, charIndex) => {
          chars.push({
            char,
            delay: character_start_times_seconds[charIndex] * 1000, // Convert to milliseconds
            messageIndex,
            charIndex,
          })
        })
      } else {
        // If no alignment data, just add the text as-is (show immediately)
        const text = data.text || ''
        text.split('').forEach((char, charIndex) => {
          chars.push({
            char,
            delay: 0,
            messageIndex,
            charIndex,
          })
        })
      }

      return chars
    })
  }, [messageData])

  // Check if any message part has audio
  const hasAudio = messageData.some((data) => data.audioSrc)

  // If no audio at all, just show full text
  if (!hasAudio) {
    const fullText = messageData.map((data) => data.text ?? '').join('')
    return (
      <Animated.View entering={FadeIn}>
        <Typography level="body-1">{fullText}</Typography>
      </Animated.View>
    )
  }

  // Handle different states based on currentIndex
  if (currentAudioIndex === null) {
    // If audio has finished (was playing but now index is null), show full text
    if (hasStartedPlayingRef.current) {
      return (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {messageCharacters.map((chars, messageIndex) =>
            chars.map((charData) => (
              <Typography key={`${charData.messageIndex}-${charData.charIndex}`} level="body-1">
                {charData.char}
              </Typography>
            ))
          )}
        </View>
      )
    }
    // Otherwise, still waiting for auto-play to start - show nothing
    return null
  }

  // If animation has already completed once, just show all text without animation
  if (hasCompletedAnimationRef.current) {
    return (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {messageCharacters.map((chars, messageIndex) =>
          chars.map((charData) => (
            <Typography key={`${charData.messageIndex}-${charData.charIndex}`} level="body-1">
              {charData.char}
            </Typography>
          ))
        )}
      </View>
    )
  }

  // Render characters for all message parts (when audio index is set)
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {messageCharacters.map((chars, messageIndex) => {
        const isCurrentAudio = messageIndex === currentAudioIndex
        const isPastAudio = messageIndex < currentAudioIndex

        return chars.map((charData) => {
          // Show past audio text immediately without animation
          if (isPastAudio) {
            return (
              <Typography key={`${charData.messageIndex}-${charData.charIndex}`} level="body-1">
                {charData.char}
              </Typography>
            )
          }

          // Animate current audio text with delay
          if (isCurrentAudio) {
            return (
              <AnimatedCharacter
                key={`${charData.messageIndex}-${charData.charIndex}-${currentAudioIndex}`}
                char={charData.char}
                delay={charData.delay}
              />
            )
          }

          // Hide future audio text (render nothing)
          return null
        })
      })}
    </View>
  )
}

interface AnimatedCharacterProps {
  char: string
  delay: number
}

function AnimatedCharacter({ char, delay }: AnimatedCharacterProps) {
  return (
    <Animated.View entering={FadeIn.duration(200).delay(delay)}>
      <Typography level="body-1">{char}</Typography>
    </Animated.View>
  )
}
