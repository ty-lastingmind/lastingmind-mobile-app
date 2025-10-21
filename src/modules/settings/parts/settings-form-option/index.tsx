import { TouchableOpacity, View } from 'react-native'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { SvgIconName } from '~/modules/ui/svg-icon/index.types'
import { Typography } from '~/modules/ui/typography'
import { SettingsOption } from '../../types'

interface SettingsFormOptionProps {
  item: SettingsOption
  showSeparator?: boolean
}

export function SettingsFormOption({ item, showSeparator }: SettingsFormOptionProps) {
  return (
    <TouchableOpacity
      onPress={item.onPress}
      className={`flex flex-row items-center justify-between h-[100px] pl-[24px] pr-[12px] gap-[12px] ${!showSeparator ? 'border-b border-miscellaneous-topic-stroke' : ''}`}
    >
      <SvgIcon name={item.icon as SvgIconName} size="2xl" color="accent" />
      <View className="flex-1 flex-col gap-[10px]">
        <Typography brand weight="bold" color="accent" level="h5">
          {item.title}
        </Typography>
        <Typography weight="normal" color="primary" level="body-2">
          {item.description}
        </Typography>
      </View>
      <SvgIcon name="arrow_right" size="lg" color="secondary" />
    </TouchableOpacity>
  )
}
