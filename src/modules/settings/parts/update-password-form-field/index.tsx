import { useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Input } from '~/modules/ui/input'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { Typography } from '~/modules/ui/typography'

interface UpdatePasswordFormFieldProps {
  label: string
  value: string
  onChangeText: (text: string) => void
  showSeparator?: boolean
}
export function UpdatePasswordFormField({ label, showSeparator, value, onChangeText }: UpdatePasswordFormFieldProps) {
  const [isVisible, setIsVisible] = useState(false)
  const iconName = !isVisible ? 'eye' : 'eye_slash'

  return (
    <View
      className={`flex flex-row items-center justify-between pl-[24px] pr-[12px] gap-[12px] ${showSeparator ? 'border-b border-miscellaneous-topic-stroke' : ''}`}
    >
      <Typography brand level="h5" weight="bold" color="accent">
        {label}
      </Typography>
      <Input
        placeholder="Enter"
        value={value}
        onChangeText={onChangeText}
        color="secondary"
        className="bg-transparent border-0 text-right flex-1 ml-4"
        textAlign="right"
        secureTextEntry={!isVisible}
      />
      <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
        <SvgIcon name={iconName} size="lg" color="secondary" />
      </TouchableOpacity>
    </View>
  )
}
