import { router } from 'expo-router'
import React, { useCallback } from 'react'
import { Alert, View } from 'react-native'
import { Button } from '~/modules/ui/button'
import { Typography } from '~/modules/ui/typography'
import { useInitializeUserOnboardingInitializeUserPost } from '~/services/api/generated'
import { CheckboxList } from '../../../ui/checkbox-list'
import { useOnboardingFormContext } from '../../hooks/use-onboarding-form'

const ageOptions = ['Less than 20', '20s', '30s', '40s', '50s', '60+']
// todo: replace with chat user check when link is added
const isChatUser = false

export function AgePage() {
  const form = useOnboardingFormContext()
  const currentAge = form.watch('age')
  const initializeUser = useInitializeUserOnboardingInitializeUserPost()

  const handleCheckboxChange = (label: string) => {
    form.setValue('age', label)
  }

  const handleSubmit = useCallback(() => {
    if (!isChatUser) {
      router.push('/onboarding/04-topics')
      return
    }
    initializeUser.mutate(
      {
        data: {
          age: currentAge,
          name: `${form.getValues('firstName')} ${form.getValues('lastName')}`,
          chosen_topics: [],
        },
      },
      {
        onSuccess: () => {
          router.push('/onboarding/05-congrats')
        },
        onError: () => {
          Alert.alert('Error', 'Failed to initialize profile.')
        },
      }
    )
  }, [currentAge, form, initializeUser])

  return (
    <View className="gap-4 px-8 py-safe flex flex-1">
      <View className="pt-28 gap-2">
        <Typography brand level="h3" color="accent">
          How old are you?
        </Typography>
        <Typography color="accent">Please select one option.</Typography>
      </View>

      <CheckboxList options={ageOptions} selectedOption={currentAge} onSelect={handleCheckboxChange} />

      <View className="px-2">
        <Button disabled={!currentAge} onPress={handleSubmit}>
          Continue
        </Button>
      </View>
    </View>
  )
}
