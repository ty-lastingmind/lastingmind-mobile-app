import { View } from 'react-native'
import React from 'react'
import { Button } from '~/modules/ui/button'
import { Link } from 'expo-router'

export default function SurveyShowcase() {
  return (
    <View>
      <Link asChild href="/">
        <Button>Survey Showcase</Button>
      </Link>
    </View>
  )
}
