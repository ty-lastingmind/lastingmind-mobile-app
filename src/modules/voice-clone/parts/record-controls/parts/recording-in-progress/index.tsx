import { View } from 'react-native'
import React from 'react'
import { RecordingWaveVisualization } from '~/modules/questions/screens/parts/recording-wave-visualization'
import { Button } from '~/modules/ui/button'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { useBoolean } from 'usehooks-ts'

interface RecordingInProgressProps {
  onStop: () => void
  onPause: () => void
  onContinue: () => void
  duration: number
  metering: number | undefined
}

export function RecordingInProgress({ onStop, onPause, onContinue, duration, metering }: RecordingInProgressProps) {
  const { value: isPaused, toggle: togglePause } = useBoolean(false)

  const handlePauseContinue = () => {
    togglePause()
    if (isPaused) {
      onContinue()
    } else {
      onPause()
    }
  }

  return (
    <>
      <RecordingWaveVisualization duration={duration} metering={metering} />
      <View className="gap-6 pb-5">
        <Button onPress={onStop} icon={<SvgIcon name="stop" size="sm" color="white" />} variant="primary" size="lg">
          Stop
        </Button>
        <Button
          onPress={handlePauseContinue}
          icon={<SvgIcon name={isPaused ? 'play' : 'pause'} size="sm" color="accent" />}
          variant="outlined"
          size="lg"
        >
          {isPaused ? 'Resume' : 'Pause'}
        </Button>
      </View>
    </>
  )
}
