import { View } from 'react-native'
import { Logo } from '~/modules/components/logo'
import { Icon } from '~/modules/ui/icon'
import { Typography } from '~/modules/ui/typography'

export function Header() {
  return (
    <View className="pt-safe px-8">
      <View className="h-[72px] relative flex flex-row items-center justify-between">
        <Icon name="menu" color="accent" size="2xl" />
        <View className="absolute left-0 top-0 flex items-center justify-center right-0 bottom-0">
          <Typography level="h5" brand color="accent">
            Journal
          </Typography>
        </View>
        <Logo />
      </View>
    </View>
  )
}
