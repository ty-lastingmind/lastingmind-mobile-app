import { View } from 'react-native'
import { Button } from '~/modules/ui/button'
import { Dialog } from '~/modules/ui/dialog'
import { Typography } from '~/modules/ui/typography'

interface ConfirmDialogProps {
  title: string
  yesLabel?: string
  noLabel?: string
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDialog({ onConfirm, onCancel, title, yesLabel = 'Yes', noLabel = 'No' }: ConfirmDialogProps) {
  return (
    <Dialog isOpen className="w-full gap-8 py-8">
      <Typography level="h5" className="text-center">
        {title}
      </Typography>
      <View className="flex flex-row gap-2 justify-center">
        <Button onPress={onCancel} variant="outlined" size="sm">
          {noLabel}
        </Button>
        <Button onPress={onConfirm} size="sm">
          {yesLabel}
        </Button>
      </View>
    </Dialog>
  )
}
