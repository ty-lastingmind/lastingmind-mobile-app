import { View } from 'react-native'
import React from 'react'
import { Typography } from '~/modules/ui/typography'
import { NameForm } from '../../parts/NameForm'

export function CompletedProfileScreen() {
  return (
    <View className="gap-4 px-10 py-safe flex flex-1">
      <View className="justify-center flex-1">
        <Typography brand className="text-center" level="logo" color="accent" weight="light">
          LM
        </Typography>

        <Typography brand className="text-center" level="h3" color="accent" weight="light">
          LastingMind
        </Typography>
      </View>

      <View>
        <NameForm />
      </View>
    </View>
  )
}
