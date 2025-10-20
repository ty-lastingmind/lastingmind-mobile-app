import { View } from 'react-native'
import { Input } from '~/modules/ui/input'
import { Typography } from '~/modules/ui/typography'

interface UpdateEmailFormFieldProps {
  label: string
  value: string
  onChangeText: (text: string) => void
  showSeparator?: boolean
}
export function UpdateEmailFormField({ label, value, onChangeText, showSeparator }: UpdateEmailFormFieldProps) {
  return (
    <View
      className={`flex-row items-center justify-between px-[24px] gap-[12px] ${showSeparator ? 'border-b border-miscellaneous-topic-stroke' : ''}`}
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
      />
    </View>
  )
}
