import { View } from 'react-native'
import { Input } from '~/modules/ui/input'
import { SvgIcon } from '~/modules/ui/svg-icon'

export function HelpInput() {
  return (
    <View className="flex-row bg-bg-secondary items-center justify-center h-[52px] p-[14px] rounded-[26px]">
      <Input
        placeholder="Ask anything"
        value=""
        onChangeText={() => {}}
        color="secondary"
        className="bg-transparent border-0 flex-1"
      />
      <SvgIcon name="mic" size="lg" color="miscellaneous" />
    </View>
  )
}
