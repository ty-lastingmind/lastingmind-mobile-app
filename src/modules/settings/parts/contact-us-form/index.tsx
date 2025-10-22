import { View } from 'react-native'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { Typography } from '~/modules/ui/typography'

export function ContactUsForm() {
  return (
    <View className="flex flex-row items-center justify-center bg-bg-secondary h-[64px] p-[16px] gap-[10px] rounded-[20px]">
      <SvgIcon name="email_card" size="lg" color="accent" />
      <Typography level="h5" weight="bold" color="primary" className="text-center">
        help@lastingmind.ai
      </Typography>
    </View>
  )
}
