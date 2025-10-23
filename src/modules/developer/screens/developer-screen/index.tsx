import React, { useState } from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AnimatedTypographyShowcase } from '~/modules/developer/screens/developer-screen/parts/animated-typography-showcase'
import { AvatarShowcase } from '~/modules/developer/screens/developer-screen/parts/avatar-showcase'

import { BadgeShowcase } from '~/modules/developer/screens/developer-screen/parts/badge-showcase'
import { ButtonShowcase } from '~/modules/developer/screens/developer-screen/parts/button-showcase'
import { DialogShowcase } from '~/modules/developer/screens/developer-screen/parts/dialog-showcase'
import { IconShowcase } from '~/modules/developer/screens/developer-screen/parts/icon-showcase'
import { InputShowcase } from '~/modules/developer/screens/developer-screen/parts/input-showcase'
import { MiniPlayerShowcase } from '~/modules/developer/screens/developer-screen/parts/mini-player-showcase'
import { NotificationsShowcase } from '~/modules/developer/screens/developer-screen/parts/notifications-showcase'
import { OutgoingMessageShowcase } from '~/modules/developer/screens/developer-screen/parts/outgoing-message-showcase'
import { ProgressShowcase } from '~/modules/developer/screens/developer-screen/parts/progress-showcase'
import { SvgIconShowcase } from '~/modules/developer/screens/developer-screen/parts/svg-icon-showcase'
import { TypographyShowcase } from '~/modules/developer/screens/developer-screen/parts/typography-showcase'
import { Badge } from '~/modules/ui/badge'
import SurveyShowcase from './parts/survey-showcase'

const showCaseComponents = {
  OutgoingMessageShowcase: OutgoingMessageShowcase,
  SvgIconShowcase: SvgIconShowcase,
  DialogShowcase: DialogShowcase,
  MiniPlayerShowcase: MiniPlayerShowcase,
  AnimatedTypographyShowcase: AnimatedTypographyShowcase,
  AvatarShowcase: AvatarShowcase,
  ProgressShowcase: ProgressShowcase,
  NotificationsShowcase: NotificationsShowcase,
  ButtonShowcase: ButtonShowcase,
  BadgeShowcase: BadgeShowcase,
  IconShowcase: IconShowcase,
  InputShowcase: InputShowcase,
  TypographyShowcase: TypographyShowcase,
  SurveyShowcase: SurveyShowcase,
} as const

type ShowCaseComponent = keyof typeof showCaseComponents

export function DeveloperScreen() {
  const [currentTab, setCurrentTab] = useState<ShowCaseComponent>('OutgoingMessageShowcase')
  const Component = showCaseComponents[currentTab]

  return (
    <SafeAreaView>
      <View className="gap-8">
        <ScrollView horizontal contentContainerClassName="gap-2 px-4" showsHorizontalScrollIndicator={false}>
          {Object.keys(showCaseComponents).map((label) => (
            <TouchableOpacity key={label} onPress={() => setCurrentTab(label as ShowCaseComponent)}>
              <Badge variant={currentTab === label ? 'primary' : 'outlined'} label={label} />
            </TouchableOpacity>
          ))}
        </ScrollView>
        <ScrollView className="px-4">
          <View className="flex gap-8">
            <Component />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}
