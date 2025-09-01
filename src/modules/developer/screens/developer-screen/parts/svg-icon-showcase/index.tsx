import { View } from 'react-native'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { Typography } from '~/modules/ui/typography'

export function SvgIconShowcase() {
  return (
    <View className="flex gap-4">
      <Typography level="h2">Svg Icon</Typography>

      <View className="flex gap-2">
        <Typography level="h3">Svg icon sizes</Typography>
        <View className="flex flex-row gap-2 items-center">
          <SvgIcon name="interview" size="xs" />
          <SvgIcon name="interview" size="sm" />
          <SvgIcon name="interview" size="md" />
          <SvgIcon name="interview" size="lg" />
          <SvgIcon name="interview" size="xl" />
          <SvgIcon name="interview" size="2xl" />
          <SvgIcon name="interview" size="3xl" />
          <SvgIcon name="interview" size="4xl" />
        </View>
      </View>

      <View className="flex gap-2">
        <Typography level="h3">Svg icon colors</Typography>
        <View className="flex flex-row gap-2 items-center">
          <SvgIcon name="interview" color="primary" size="lg" />
          <SvgIcon name="interview" color="secondary" size="lg" />
          <SvgIcon name="interview" color="tertiary" size="lg" />
          <SvgIcon name="interview" color="brand" size="lg" />
          <SvgIcon name="interview" color="red" size="lg" />
          <SvgIcon name="interview" color="green" size="lg" />
          <SvgIcon name="interview" color="blue" size="lg" />
          <SvgIcon name="interview" color="error" size="lg" />
        </View>
      </View>
    </View>
  )
}
