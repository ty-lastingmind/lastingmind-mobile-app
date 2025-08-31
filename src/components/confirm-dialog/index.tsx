import { View } from 'react-native'
import { Button } from '~/modules/ui/button'
import { Dialog } from '~/modules/ui/dialog'
import { Typography } from '~/modules/ui/typography'

interface ConfirmDialogProps {
  title: string
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDialog({ onConfirm, onCancel, title }: ConfirmDialogProps) {
  return (
    <Dialog isOpen className="w-full gap-8 py-8">
      <Typography level="h5" className="text-center">
        {title}
      </Typography>
      <View className="flex flex-row gap-2 justify-center">
        <Button onPress={onConfirm} size="sm">
          Yes
        </Button>
        <Button onPress={onCancel} variant="outlined" size="sm">
          No
        </Button>
      </View>
    </Dialog>
  )
}
