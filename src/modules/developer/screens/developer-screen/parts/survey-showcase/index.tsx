import { Link } from 'expo-router'
import React from 'react'
import { View } from 'react-native'
import { Button } from '~/modules/ui/button'

export default function SurveyShowcase() {
  return (
    <View>
      <Link asChild href="/(protected)/basic-info/01-home">
        <Button>Survey Showcase</Button>
      </Link>
    </View>
  )
}
