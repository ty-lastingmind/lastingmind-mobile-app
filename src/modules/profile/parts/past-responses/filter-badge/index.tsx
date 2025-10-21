import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Avatar } from '~/modules/ui/avatar'
import { Icon } from '~/modules/ui/icon'
import { Typography } from '~/modules/ui/typography'

interface FilterBadgeProps {
  label: string
  avatarUrl?: string
  showCloseIcon?: boolean
  onPress?: () => void
}

export function FilterBadge({ label, avatarUrl, showCloseIcon, onPress }: FilterBadgeProps) {
  return (
    <TouchableOpacity className="bg-bg-secondary rounded-full py-2 px-4 flex-row gap-2 items-center" onPress={onPress}>
      {avatarUrl && <Avatar source={avatarUrl} size="xs" />}
      <Typography>{label}</Typography>
      {showCloseIcon && <Icon name="close" color="secondary" />}
    </TouchableOpacity>
  )
}
