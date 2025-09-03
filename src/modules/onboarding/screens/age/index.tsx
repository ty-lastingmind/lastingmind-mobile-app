import { View } from 'react-native'
import React, { useState } from 'react'
import { Typography } from '~/modules/ui/typography'
import { Button } from '~/modules/ui/button'
import { CheckboxList } from '../../parts/CheckboxList'
import { useRouter } from 'expo-router'

const ageOptions = ['Less than 20', '20s', '30s', '40s', '50s', '60+']

export function AgePage() {
  const [selectedAge, setSelectedAge] = useState<string | null>(null)

  const router = useRouter()

  const handleContinueButton = () => {
    router.push('/(protected)/onboarding/topics')
  }

  const handleCheckboxChange = (label: string) => {
    setSelectedAge(label)
  }

  return (
    <View className="gap-4 px-8 py-safe flex flex-1">
      <View className="py-28 gap-2">
        <Typography brand level="h3" color="accent">
          How old are you?
        </Typography>
        <Typography color="accent">Please select one option.</Typography>
      </View>

      <CheckboxList options={ageOptions} selectedOption={selectedAge} onSelect={handleCheckboxChange} />

      <View className="px-2">
        <Button onPress={handleContinueButton}>Continue</Button>
      </View>
    </View>
  )
}
