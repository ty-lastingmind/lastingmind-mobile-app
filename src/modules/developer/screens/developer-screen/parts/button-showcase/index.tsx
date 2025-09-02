import { View } from 'react-native'

import { Button } from '~/modules/ui/button'
import { Typography } from '~/modules/ui/typography'

export function ButtonShowcase() {
  return (
    <View className="flex gap-4">
      <Typography level="h2">Button</Typography>
      <View className="flex gap-2">
        <Typography level="h3">Button variants</Typography>
        <Button variant="primary">Button primary</Button>
        <Button variant="secondary">Button secondary</Button>
        <Button variant="outlined">Button outlined</Button>
        <Button variant="outlinedSecondary">Button outlinedSecondary</Button>
        <Button variant="white">Button white</Button>
      </View>

      <View className="flex gap-2">
        <Typography level="h3">Button sizes</Typography>
        <Button variant="primary" size="sm">
          Small button
        </Button>
        <Button variant="primary" size="md">
          Medium button
        </Button>
        <Button variant="primary" size="lg">
          Large button
        </Button>
      </View>
      <View className="flex gap-2">
        <Typography level="h3">Button state</Typography>
        <Button loading>Button loading</Button>
        <Button disabled>Button loading</Button>
      </View>
    </View>
  )
}
