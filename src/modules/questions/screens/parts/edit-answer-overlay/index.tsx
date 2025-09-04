import { View, TouchableOpacity } from 'react-native'
import { Typography } from '~/modules/ui/typography'
import { DialogContent, DialogHeader, Dialog, DialogTitle } from '~/modules/ui/dialog'
import { useCallback, useState } from 'react'
import { Button } from '~/modules/ui/button'
import { Textarea } from '~/modules/ui/textarea'
import { SvgIcon } from '~/modules/ui/svg-icon'

interface EditAnswerOverlayProps {
  isOpen: boolean
  onClose: () => void
  onSave: (answer: string) => void
  question: string
  answer: string
}

export function EditAnswerOverlay({ isOpen, onClose, onSave, question, answer }: EditAnswerOverlayProps) {
  const [editAnswer, setEditAnswer] = useState(answer)
  const handleSave = useCallback(() => {
    onSave(editAnswer)
    onClose()
  }, [onSave, onClose, editAnswer])

  return (
    <Dialog isOpen={isOpen} className="gap-0 mt-safe mb-safe">
      <DialogHeader>
        <View className="flex flex-row gap-2 justify-between items-center">
          <Button onPress={onClose} variant="outlined" size="sm">
            Cancel
          </Button>
          <DialogTitle>Edit Transcription</DialogTitle>
          <Button onPress={handleSave} size="sm">
            Save
          </Button>
        </View>
      </DialogHeader>

      <DialogContent className="flex-1 gap-4">
        <View className="gap-2">
          <Typography level="label-1" color="secondary" weight="medium">
            Question
          </Typography>
          <Typography level="body-1" color="primary" className="text-wrap bg-bg-secondary rounded-md p-4">
            {question}
          </Typography>
        </View>

        <View className="gap-2">
          <Typography level="label-1" color="secondary" weight="medium">
            Answer
          </Typography>
          <Textarea
            value={editAnswer}
            onChangeText={setEditAnswer}
            numberOfLines={20}
            scrollEnabled
            className="h-64 border-b-0"
            placeholderTextColor="text-label-secondary"
            placeholder="Enter Answer..."
            bottomAdornment={
              <>
                <View className="border-t border-miscellaneous-topic-stroke" />
                <TouchableOpacity className="mx-2 mt-2 h-5 w-5 items-center justify-center">
                  <SvgIcon name="mic" size="md" color="secondary" />
                </TouchableOpacity>
              </>
            }
          />
        </View>

        <View className="gap-2">
          <Typography level="label-1" color="secondary" weight="medium">
            Answer Audio
          </Typography>
          <View className="flex-row items-center gap-3 bg-bg-secondary rounded-md p-4">
            <TouchableOpacity>
              <SvgIcon name="play" size="md" color="accent" />
            </TouchableOpacity>
            <Typography level="body-2" color="primary" className="flex-1">
              Your Answer 1
            </Typography>
            <Typography level="body-2" color="accent">
              1:58
            </Typography>
          </View>
        </View>

        <View className="flex-row justify-end">
          {/* todo: make disabled style */}
          <Button onPress={handleSave} size="md" disabled={editAnswer.length === 0}>
            Submit
          </Button>
        </View>
      </DialogContent>
    </Dialog>
  )
}
