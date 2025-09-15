import { View } from 'react-native'
import { Icon } from '~/modules/ui/icon'

import { Input } from '~/modules/ui/input'
import { Selector } from '~/modules/ui/selector'
import { Typography } from '~/modules/ui/typography'

const mockOptions = ['option 1', 'option 2', 'option 3']

export function InputShowcase() {
  return (
    <View className="flex gap-4">
      <Typography level="h2">Input</Typography>

      <View className="flex gap-2">
        <Typography level="h3">Input variants</Typography>
        <Input color="primary" placeholder="Input primary" />
        <Input color="secondary" placeholder="Input secondary" />
        <Input isError placeholder="Input error" />
        <Selector options={mockOptions} placeholder="Select an option" />
      </View>
      <View className="flex gap-2">
        <Typography level="h3">Input right adornment</Typography>
        <Input color="primary" placeholder="Input primary" rightAdornment={<Icon name="person" />} />
      </View>
    </View>
  )
}
