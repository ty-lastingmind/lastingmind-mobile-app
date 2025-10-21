import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio'
import { useCallback, useEffect, useMemo } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Icon } from '~/modules/ui/icon'
import { Progress } from '~/modules/ui/progress'
import { Typography } from '~/modules/ui/typography'
import { cn } from '~/utils/cn'
import { formatDuration } from '~/utils/player'

interface AudioPlayerProps {
  audioSrc: string
  className?: string
  showSlider?: boolean
}

export function AudioPlayer({ audioSrc, className, showSlider }: AudioPlayerProps) {
  const player = useAudioPlayer(audioSrc)
  const status = useAudioPlayerStatus(player)

  useEffect(() => {
    player.volume = 1.0
  }, [player])

  const containerClassName = useMemo(() => {
    return cn('rounded-full h-[52px] items-center px-4 flex flex-row justify-between', className)
  }, [className])

  const togglePlayPause = useCallback(async () => {
    if (status.playing) {
      player.pause()
    } else {
      if (status.didJustFinish) {
        await player.seekTo(0)
      }
      player.play()
    }
  }, [player, status.didJustFinish, status.playing])

  const sliderProgress = useMemo(() => {
    return (status.currentTime / status.duration) * 100
  }, [status.currentTime, status.duration])

  const sliderText = useMemo(() => {
    return `${formatDuration(status.currentTime || 0)}/${formatDuration(status.duration || 0)}`
  }, [status.currentTime, status.duration])

  return (
    <View className={containerClassName}>
      <TouchableOpacity onPress={togglePlayPause}>
        <Icon name={status.playing ? 'pause' : 'play'} color="accent" size="lg" />
      </TouchableOpacity>

      {showSlider && status.playing ? (
        <View className="flex-1 flex-row items-center gap-2">
          <Typography level="body-1" color="accent" weight="medium" brand className="min-w-[100px] text-right">
            {sliderText}
          </Typography>
          <Progress value={sliderProgress} color="accent" />
        </View>
      ) : (
        <>
          <View className="flex-1 ml-3">
            <Typography level="body-1" color="primary">
              Your Answer
            </Typography>
          </View>

          <Typography level="body-1" color="accent" weight="medium" brand>
            {formatDuration(status.duration || 0)}
          </Typography>
        </>
      )}
    </View>
  )
}
