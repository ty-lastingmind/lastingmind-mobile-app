import React, { useEffect, useMemo, useRef, useState } from 'react'
import Animated, { FadeIn, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
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
  const [isReadyToAnimate, setIsReadyToAnimate] = useState(false)
  const animationStartedRef = useRef(false)
  const currentlyAnimatingIndexRef = useRef<number | null>(null)
  const animationLoopRunningRef = useRef(false)
  const [animationTrigger, setAnimationTrigger] = useState(0) // Used to re-trigger effect when loop finishes with unananimated parts
  const messageDataRef = useRef(messageData) // Keep a ref to the latest messageData

  // Update ref whenever messageData changes
  useEffect(() => {
    messageDataRef.current = messageData
  }, [messageData])

  // Start animation when first audio begins OR when new parts arrive
  useEffect(() => {
    // Get all audio indices
    const audioIndices = messageData.map((data, idx) => (data.audioSrc ? idx : -1)).filter((idx) => idx !== -1)

    // Check if there are unananimated parts
    const hasUnanimatedParts = audioIndices.some((idx) => !animatedIndicesRef.current.has(idx))

    // Start animation loop if:
    // 1. Audio has started playing (currentAudioIndex !== null)
    // 2. Animation loop is not already running
    // 3. There are parts that haven't been animated yet
    if (currentAudioIndex !== null && !animationLoopRunningRef.current && hasUnanimatedParts) {
      animationStartedRef.current = true
      animationLoopRunningRef.current = true
      allAnimationsCompleteRef.current = false

      // Trigger animation for all parts sequentially, independent of audio
      const animateAllParts = async () => {
        // Capture the indices we're going to animate in THIS loop
        const indicesToAnimateInThisLoop = [...audioIndices]

        for (const idx of indicesToAnimateInThisLoop) {
          // Skip parts that are already animated
          if (animatedIndicesRef.current.has(idx)) {
            continue
          }
          currentlyAnimatingIndexRef.current = idx
          setIsReadyToAnimate(false)

          // Small delay to trigger re-render
          await new Promise((resolve) => setTimeout(resolve, 0))
          setIsReadyToAnimate(true)

          // Wait for this part's animation to complete (based on longest character delay + animation duration)
          const partData = messageDataRef.current[idx]
          if (partData?.alignment) {
            const maxDelay = Math.max(...partData.alignment.character_start_times_seconds) * 1000
            const animationDuration = 200
            const totalTime = maxDelay + animationDuration + 300 // Increased buffer to 300ms to ensure all characters finish
            await new Promise((resolve) => setTimeout(resolve, totalTime))
          }

          // Mark this part as animated
          animatedIndicesRef.current.add(idx)
        }

        // Check if ALL current audio parts have been animated
        // Get the current audio indices at the END of the loop (might have changed during animation)
        // Use the ref to get the LATEST messageData, not the stale closure
        const currentAudioIndices = messageDataRef.current
          .map((data, idx) => (data.audioSrc ? idx : -1))
          .filter((idx) => idx !== -1)

        const allCurrentPartsAnimated = currentAudioIndices.every((idx) => animatedIndicesRef.current.has(idx))

        // Only mark as complete if we've animated ALL parts (including ones that arrived during animation)
        if (allCurrentPartsAnimated) {
          allAnimationsCompleteRef.current = true
        } else {
          // Trigger the effect to run again to animate the remaining parts
          setAnimationTrigger((prev) => prev + 1)
        }

        currentlyAnimatingIndexRef.current = null
        animationLoopRunningRef.current = false
      }

      animateAllParts()
    }
  }, [currentAudioIndex, messageData.length, animationTrigger]) // animationTrigger will re-trigger effect when loop finishes with unananimated parts

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

  // If animation hasn't started yet, show nothing
  if (!animationStartedRef.current) {
    return null
  }

  // Render characters for all message parts (with animation for current animating part)
  const currentAnimatingIndex = currentlyAnimatingIndexRef.current

  return (
    <Typography level="body-1">
      {messageCharacters.map((chars, messageIndex) => {
        const isCurrentlyAnimating = messageIndex === currentAnimatingIndex
        const hasBeenAnimated = animatedIndicesRef.current.has(messageIndex)
        const shouldRender = hasBeenAnimated || (isCurrentlyAnimating && isReadyToAnimate)

        // Check if we need to add a space before this part
        // Add space if: this is not the first part AND the previous part's last character is not a space
        // AND this part's first character is not a space
        const needsSpaceBefore = messageIndex > 0 && chars.length > 0 && messageCharacters[messageIndex - 1].length > 0
        const previousPartLastChar = needsSpaceBefore
          ? messageCharacters[messageIndex - 1][messageCharacters[messageIndex - 1].length - 1].char
          : ''
        const currentPartFirstChar = chars.length > 0 ? chars[0].char : ''
        const shouldAddSpace = needsSpaceBefore && previousPartLastChar !== ' ' && currentPartFirstChar !== ' '

        return (
          <React.Fragment key={`part-${messageIndex}`}>
            {/* Add space between parts if needed */}
            {shouldAddSpace && shouldRender && ' '}

            {chars.map((charData) => {
              // Only render if shouldRender is true (calculated above)
              if (shouldRender) {
                return (
                  <AnimatedCharacter
                    key={`${charData.messageIndex}-${charData.charIndex}`}
                    char={charData.char}
                    delay={charData.delay}
                    messageIndex={charData.messageIndex}
                    hasBeenAnimated={hasBeenAnimated}
                  />
                )
              }

              // Hide future parts that haven't been animated yet
              return null
            })}
          </React.Fragment>
        )
      })}
    </Typography>
  )
}

interface AnimatedCharacterProps {
  char: string
  delay: number
  messageIndex: number
  hasBeenAnimated: boolean
}

function AnimatedCharacter({ char, delay, messageIndex, hasBeenAnimated }: AnimatedCharacterProps) {
  // If part has been animated, start at full opacity; otherwise start at 0
  const opacity = useSharedValue(hasBeenAnimated ? 1 : 0)
  const hasAnimatedRef = useRef(hasBeenAnimated)

  useEffect(() => {
    // If this part has already been animated, keep it at full opacity
    if (hasBeenAnimated) {
      opacity.value = 1
      return
    }

    // If this character was already animated (component remounted), show it immediately
    if (hasAnimatedRef.current) {
      opacity.value = 1
      return
    }

    // Start fade in after delay
    const timer = setTimeout(() => {
      opacity.value = withTiming(1, { duration: 200 })
      hasAnimatedRef.current = true
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [delay, opacity, char, hasBeenAnimated, messageIndex])

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))

  return <Animated.Text style={animatedStyle}>{char}</Animated.Text>
}
