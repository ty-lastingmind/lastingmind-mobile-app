import React from 'react'
import { TouchableOpacity } from 'react-native'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { Typography } from '~/modules/ui/typography'
import { AccountField } from '../../types'

interface AccountFormFieldProps {
  field: AccountField
  showSeparator: boolean
}

export function AccountFormField({ field, showSeparator }: AccountFormFieldProps) {
  return (
    <TouchableOpacity
      onPress={field.onPress}
      className={`flex flex-row items-center justify-between h-[52px] pl-[24px] pr-[12px] gap-[12px] ${!showSeparator ? 'border-b border-miscellaneous-topic-stroke' : ''}`}
    >
      <Typography brand level="h5" weight="bold" color="accent">
        {field.label}
      </Typography>
      <Typography level="body-1" color="secondary" className="text-right flex-1 ml-4">
        {field.value}
      </Typography>
      <SvgIcon name="arrow_right" size="lg" color="secondary" />
    </TouchableOpacity>
  )
}
