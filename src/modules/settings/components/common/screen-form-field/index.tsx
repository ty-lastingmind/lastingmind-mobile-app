import { useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Input, InputProps } from '~/modules/ui/input'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { Typography } from '~/modules/ui/typography'

interface ScreenFormFieldProps extends InputProps {
  label: string
  showSeparator?: boolean
  isError?: boolean
  isPassword?: boolean
}
export function ScreenFormField({ label, showSeparator, isError, isPassword, ...props }: ScreenFormFieldProps) {
  const [isVisible, setIsVisible] = useState(false)
  const iconName = !isVisible ? 'eye' : 'eye_slash'

  return (
    <View
      className={`flex flex-row items-center justify-between pl-[24px] pr-[12px] gap-[12px] ${showSeparator ? 'border-b border-miscellaneous-topic-stroke' : ''} ${isError ? 'border-input-border--error' : ''}`}
    >
      <Typography brand level="h5" weight="bold" color="accent">
        {label}
      </Typography>
      <Input
        color="secondary"
        className="bg-transparent border-0 text-right flex-1 ml-4"
        textAlign="right"
        secureTextEntry={isPassword ? !isVisible : false}
        {...props}
      />
      {isPassword ? (
        <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
          <SvgIcon name={iconName} size="lg" color="secondary" />
        </TouchableOpacity>
      ) : null}
    </View>
  )
}
