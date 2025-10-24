import { useEffect, useMemo, useRef } from 'react'
import { View } from 'react-native'
import Animated, { FadeIn } from 'react-native-reanimated'
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
  const animatedIndicesRef = useRef<Set<number>>(new Set())
  const allAnimationsCompleteRef = useRef(false)
  const previousMessageCountRef = useRef(0)
  const previousAudioIndexRef = useRef<number | null>(null)

  // Track when new message parts arrive
  useEffect(() => {
    const currentCount = messageData.length
    const previousCount = previousMessageCountRef.current

    // If new parts arrived and we have audio data with them
    if (currentCount > previousCount) {
      // Check if new parts have audio
      const newParts = messageData.slice(previousCount)
      const hasNewAudio = newParts.some((data) => data.audioSrc)

      if (hasNewAudio) {
        // New parts with audio arrived, so animations are not complete anymore
        allAnimationsCompleteRef.current = false
      }
    }

    previousMessageCountRef.current = currentCount
  }, [messageData])

  // Track which message indices have been animated
  useEffect(() => {
    if (currentAudioIndex !== null) {
      animatedIndicesRef.current.add(currentAudioIndex)
    }

    // Detect when audio finishes (goes from a number to null)
    if (previousAudioIndexRef.current !== null && currentAudioIndex === null) {
      // Check if all message parts with audio have been animated
      const audioIndices = messageData.map((data, idx) => (data.audioSrc ? idx : -1)).filter((idx) => idx !== -1)

      const allAnimated = audioIndices.every((idx) => animatedIndicesRef.current.has(idx))

      if (allAnimated && audioIndices.length > 0) {
        allAnimationsCompleteRef.current = true
      }
    }

    previousAudioIndexRef.current = currentAudioIndex
  }, [currentAudioIndex, messageData])

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

  // If all animations have completed, always show full text without animation
  if (allAnimationsCompleteRef.current) {
    return (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {messageCharacters.map((chars) =>
          chars.map((charData) => (
            <Typography key={`${charData.messageIndex}-${charData.charIndex}`} level="body-1">
              {charData.char}
            </Typography>
          ))
        )}
      </View>
    )
  }

  // If no audio is currently playing, show all text that exists
  if (currentAudioIndex === null) {
    return (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {messageCharacters.map((chars) =>
          chars.map((charData) => (
            <Typography key={`${charData.messageIndex}-${charData.charIndex}`} level="body-1">
              {charData.char}
            </Typography>
          ))
        )}
      </View>
    )
  }

  // Render characters for all message parts (with animation for current part)
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {messageCharacters.map((chars, messageIndex) => {
        const isCurrentAudio = messageIndex === currentAudioIndex
        const hasBeenAnimated = animatedIndicesRef.current.has(messageIndex)

        return chars.map((charData) => {
          // Show text that has already been animated (from previous or earlier parts)
          if (hasBeenAnimated && !isCurrentAudio) {
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

          // Hide future audio text that hasn't been played yet (render nothing)
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
