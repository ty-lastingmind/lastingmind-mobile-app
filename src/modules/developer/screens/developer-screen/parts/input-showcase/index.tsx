import { View } from 'react-native'

import { Input } from '~/modules/ui/input'
import { Typography } from '~/modules/ui/typography'

export function InputShowcase() {
  return (
    <View className="flex gap-4">
      <Typography level="h2">Input</Typography>

      <View className="flex gap-2">
        <Input placeholder="Input placeholder" />
        <Input isError placeholder="Input placeholder" />
      </View>
    </View>
  )
}
