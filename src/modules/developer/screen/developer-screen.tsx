import { SafeAreaView, ScrollView } from 'react-native'

import { ButtonShowcase } from '~/modules/developer/screen/parts/button-showcase'
import { TypographyShowcase } from '~/modules/developer/screen/parts/typography-showcase'
import { Typography } from '~/modules/ui/typography'

export function DeveloperScreen() {
  return (
    <ScrollView>
      <SafeAreaView className="flex gap-8">
        <Typography level="h1">Developer Screen</Typography>
        <ButtonShowcase />
        <TypographyShowcase />
      </SafeAreaView>
    </ScrollView>
  )
}
