import { Link } from 'expo-router'
import LottieView from 'lottie-react-native'
import React from 'react'
import { View } from 'react-native'
import { useSafeAreaStyles } from '~/hooks/use-safe-area-styles'
import CheckSpecial from '~/modules/basic-info/assets/Check_Special.json'
import { Button } from '~/modules/ui/button'
import { Typography } from '~/modules/ui/typography'

export function BasicInfoCongratsPage() {
  const safeStyles = useSafeAreaStyles()

  return (
    <View className="gap-4 px-8 flex flex-1" style={safeStyles}>
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
