import React from 'react'
import { SafeAreaView, ScrollView } from 'react-native'

import { BadgeShowcase } from '~/modules/developer/screens/developer-screen/parts/badge-showcase'
import { ButtonShowcase } from '~/modules/developer/screens/developer-screen/parts/button-showcase'
import { IconShowcase } from '~/modules/developer/screens/developer-screen/parts/icon-showcase'
import { InputShowcase } from '~/modules/developer/screens/developer-screen/parts/input-showcase'
import { TypographyShowcase } from '~/modules/developer/screens/developer-screen/parts/typography-showcase'
import { Separator } from '~/modules/ui/separator'
import { Typography } from '~/modules/ui/typography'

const showCaseComponents = [ButtonShowcase, BadgeShowcase, IconShowcase, InputShowcase, TypographyShowcase]

export function DeveloperScreen() {
  return (
    <ScrollView className="px-4">
      <SafeAreaView className="flex gap-8">
        <Typography level="h1">Developer Screen</Typography>
        {showCaseComponents.map((Component, index) => (
          <React.Fragment key={index}>
            <Component />
            <Separator />
          </React.Fragment>
        ))}
      </SafeAreaView>
    </ScrollView>
  )
}
