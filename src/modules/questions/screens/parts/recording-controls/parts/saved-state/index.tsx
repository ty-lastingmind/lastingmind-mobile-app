import { TouchableOpacity, View } from 'react-native'
import { AudioPlayer } from '~/modules/questions/screens/parts/audio-player'
import { Button } from '~/modules/ui/button'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { Typography } from '~/modules/ui/typography'

interface SavedStateProps {
  onViewTranscription: () => void
  onRecordNewAnswer: () => void
  onWriteNewAnswer: () => void
  audioUrl: string | null
}

export function SavedState({ onViewTranscription, onRecordNewAnswer, onWriteNewAnswer, audioUrl }: SavedStateProps) {
  const hasRecorded = Boolean(audioUrl)

  return (
    <View className="gap-4">
      {hasRecorded && (
        <>
          <TouchableOpacity
            className="flex-row items-center justify-between gap-2 bg-bg-secondary rounded-full h-[40px] px-4"
            onPress={onViewTranscription}
          >
            <View className="flex-row items-center gap-2">
              <SvgIcon name="audio_wave" size="md" color="accent" />
              <Typography level="body-1" color="primary" weight="medium">
                View Transcription
              </Typography>
            </View>
            <SvgIcon name="arrow_right" size="md" color="accent" />
          </TouchableOpacity>

          {audioUrl && <AudioPlayer audioSrc={audioUrl} className="h-[40px]" showSlider />}
        </>
      )}

      <Button
        onPress={onRecordNewAnswer}
        icon={<SvgIcon name="mic" size="md" color="white" />}
        variant="primary"
        size="lg"
      >
        Record New Answer
      </Button>

      <Button
        onPress={onWriteNewAnswer}
        icon={<SvgIcon name="write_answer" size="md" color="accent" />}
        variant="outlined"
        size="lg"
      >
        Write New Answer
      </Button>
    </View>
  )
}
