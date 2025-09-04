import { useEffect, useMemo, useRef } from 'react'
import { Animated, View } from 'react-native'
import { Typography } from '~/modules/ui/typography'
import { formatDuration } from '~/utils/player'

interface RecordingWaveVisualizationProps {
  duration: number
}

interface WaveBarProps {
  delay: number
}

function WaveBar({ delay }: WaveBarProps) {
  const animatedValue = useRef(new Animated.Value(0.3)).current

  useEffect(() => {
    const startAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 800 + Math.random() * 400, // Random duration between 800-1200ms
            useNativeDriver: false,
          }),
          Animated.timing(animatedValue, {
            toValue: 0.3,
            duration: 800 + Math.random() * 400,
            useNativeDriver: false,
          }),
        ])
      ).start()
    }

    const timeoutId = setTimeout(startAnimation, delay)

    return () => {
      clearTimeout(timeoutId)
      animatedValue.stopAnimation()
    }
  }, [delay, animatedValue])

  return (
    <Animated.View
      className="bg-accent w-1.5 rounded-full"
      style={{
        height: animatedValue.interpolate({
          inputRange: [0.3, 1],
          outputRange: [16, 40],
        }),
      }}
    />
  )
}

export function RecordingWaveVisualization({ duration }: RecordingWaveVisualizationProps) {
  const waveBars = useMemo(
    () => Array.from({ length: 30 }, (_, index) => <WaveBar key={index} delay={index * 100} />),
    []
  )

  return (
    <View className="items-center gap-6 py-8">
      <View className="flex-row items-end gap-1.5 h-12 px-4 py-2">{waveBars}</View>

      <Typography level="h4" weight="medium" color="primary" brand>
        {formatDuration(duration / 1000)}
      </Typography>
    </View>
  )
}
