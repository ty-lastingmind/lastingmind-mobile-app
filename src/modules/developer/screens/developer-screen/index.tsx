import { SafeAreaView, ScrollView } from 'react-native'

import { BadgeShowcase } from '~/modules/developer/screens/developer-screen/parts/badge-showcase'
import { ButtonShowcase } from '~/modules/developer/screens/developer-screen/parts/button-showcase'
import { TypographyShowcase } from '~/modules/developer/screens/developer-screen/parts/typography-showcase'
import { Typography } from '~/modules/ui/typography'

export function DeveloperScreen() {
  return (
    <ScrollView>
      <SafeAreaView className="flex gap-8">
        <Typography level="h1">Developer Screen</Typography>
        <ButtonShowcase />
        <BadgeShowcase />
        <TypographyShowcase />
      </SafeAreaView>
    </ScrollView>
  )
}
