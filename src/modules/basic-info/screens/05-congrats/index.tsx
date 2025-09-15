import { View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
import CheckSpecial from '~/modules/basic-info/assets/Check_Special.json'
import { Typography } from '~/modules/ui/typography'
import { Link } from 'expo-router'
import { Button } from '~/modules/ui/button'

export function BasicInfoCongratsPage() {
  return (
    <View className="gap-4 px-8 py-safe flex flex-1">
      <View className="flex-1 justify-center">
        <LottieView
          style={{
            height: 150,
            width: 150,
            alignSelf: 'center',
          }}
          source={CheckSpecial}
          loop={false}
          autoPlay
        />
      </View>
      <View className="gap-8">
        <View>
          <Typography brand level="h1" color="accent" className="text-center">
            Great Job!!
          </Typography>
          <Typography color="accent" className="text-center mt-2">
            You can now start answering more in-depth questions about yourself!
          </Typography>
        </View>
        <Link asChild href="/(protected)/(tabs)/home">
          <Button>Continue</Button>
        </Link>
      </View>
    </View>
  )
}
