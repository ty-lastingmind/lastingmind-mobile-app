import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Dialog } from '~/modules/ui/dialog'
import { Typography } from '~/modules/ui/typography'

interface EmailConfirmDialogProps {
  isOpen: boolean
  email: string
  onCancel: () => void
  onConfirm: () => void
}

export function EmailConfirmDialog({ isOpen, email, onCancel, onConfirm }: EmailConfirmDialogProps) {
  return (
    <Dialog isOpen={isOpen} onClose={onCancel}>
      <View className="gap-6 py-4">
        <Typography level="h4" weight="bold" color="primary" className="text-center">
          Are you sure you want to update your email?
        </Typography>
        <Typography level="body-1" color="primary" className="text-center">
          This change cannot be undone.
        </Typography>
        <Typography level="h5" weight="bold" color="accent" className="text-center">
          {email}
        </Typography>
        <Typography level="body-2" color="secondary" className="text-center">
          (Please make sure this email is correct)
        </Typography>
        <View className="flex flex-row gap-4 justify-center mt-2">
          <TouchableOpacity
            onPress={onCancel}
            className="bg-miscellaneous-topic-stroke rounded-full px-8 py-3 min-w-[120px]"
            activeOpacity={0.7}
          >
            <Typography level="h5" weight="bold" color="primary" className="text-center">
              Cancel
            </Typography>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onConfirm}
            className="bg-accent rounded-full px-8 py-3 min-w-[120px]"
            activeOpacity={0.7}
          >
            <Typography level="h5" weight="bold" color="white" className="text-center">
              Change
            </Typography>
          </TouchableOpacity>
        </View>
      </View>
    </Dialog>
  )
}
