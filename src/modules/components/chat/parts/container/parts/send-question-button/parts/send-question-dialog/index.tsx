import { useState } from 'react'
import { View } from 'react-native'
import { Button } from '~/modules/ui/button'
import { Dialog } from '~/modules/ui/dialog'
import { Input } from '~/modules/ui/input'
import { Typography } from '~/modules/ui/typography'

interface SendQuestionDialogProps {
  question: string
  onClose: () => void
  onConfirm: (question: string) => void
  isLoading: boolean
}

export function SendQuestionDialog({ question, isLoading, onConfirm, onClose }: SendQuestionDialogProps) {
  const [text, setText] = useState(question)

  return (
    <Dialog isOpen className="w-full max-h-[38vh] flex-1 gap-6 py-8 justify-between">
      <Typography level="h5" className="text-center">
        Do you want to send this question?
      </Typography>
      <Input value={text} onChangeText={setText} />
      <Typography level="label-1" className="text-center" color="secondary">
        Make sure this is the exact question you want to send?
      </Typography>
      <View className="flex flex-row gap-2 justify-center">
        <Button disabled={isLoading} size="sm" variant="outlined" onPress={onClose}>
          No
        </Button>
        <Button disabled={isLoading} loading={isLoading} size="sm" onPress={() => onConfirm(text)}>
          Yes
        </Button>
      </View>
    </Dialog>
  )
}
