import { View } from 'react-native'
import { Button } from '~/modules/ui/button'
import { Dialog } from '~/modules/ui/dialog'
import { Typography } from '~/modules/ui/typography'

interface InactiveChatDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function InactiveChatDialog({ isOpen, onClose }: InactiveChatDialogProps) {
  return (
    <Dialog isOpen={isOpen} onClose={onClose} className="w-full gap-8 py-8">
      <Typography level="h5" className="text-center">
        More Questions Need to Be Answered before this Chat is Active
      </Typography>
      <View className="flex items-center">
        <Button onPress={onClose} size="md" btnContainerClassName="w-32">
          Close
        </Button>
      </View>
    </Dialog>
  )
}
