import { useEffect, useMemo } from 'react'
import { View } from 'react-native'
import { Typography } from '~/modules/ui/typography'
import { formatDuration } from '~/utils/player'
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated'

const MIN_PX = 12
const MAX_PX = 120
const DB_FLOOR = -60
const GAIN = 1.0
const CURVE = 1.0

interface RecordingWaveVisualizationProps {
  duration: number
  metering?: number
}

function WaveBar({ metering01 = 0 }: { metering01?: number }) {
  const v = useSharedValue(0)

  useEffect(() => {
    const clamped = Math.max(0, Math.min(1, metering01))
    v.value = withTiming(clamped, { duration: 60 })
  }, [metering01, v])

  const style = useAnimatedStyle(() => ({
    height: MIN_PX + (MAX_PX - MIN_PX) * v.value,
  }))

  return <Animated.View className="bg-accent w-1.5 rounded-full" style={style} />
}

export function RecordingWaveVisualization({ duration, metering = 0 }: RecordingWaveVisualizationProps) {
  const BARS = 30

  const weights = useMemo(() => {
    const c = (BARS - 1) / 2
    return Array.from({ length: BARS }, (_, i) => {
      const falloff = 1 - Math.abs(i - c) / c
      return 0.25 + 0.75 * falloff
    })
  }, [])

  let meter01 = (metering - DB_FLOOR) / (0 - DB_FLOOR)
  meter01 = Math.pow(Math.max(0, Math.min(1, meter01 * GAIN)), CURVE)

  return (
    <View className="items-center gap-6 py-8">
      <View className="flex-row items-end gap-1.5 h-12 px-4 py-2">
        {weights.map((w, i) => (
          <WaveBar key={i} metering01={meter01 * w} />
        ))}
      </View>

      <Typography level="h4" weight="medium" color="primary" brand>
        {formatDuration(duration / 1000)}
      </Typography>
    </View>
  )
}
