import { Link } from 'expo-router'
import LottieView from 'lottie-react-native'
import React, { useEffect } from 'react'
import { View } from 'react-native'
import Animated, { FadeIn } from 'react-native-reanimated'
import { useBoolean } from 'usehooks-ts'
import { useSafeAreaStyles } from '~/hooks/use-safe-area-styles'
import Congrats from '~/modules/onboarding/assets/Congrats.json'
import { Button } from '~/modules/ui/button'
import { Typography } from '~/modules/ui/typography'

function FirstView() {
  return (
    <View className="pt-28 pb-16 gap-2">
      <Typography brand level="h1" color="accent" className="text-center">
        {'Profile \nSaved!'}
      </Typography>
    </View>
  )
}

function SecondView() {
  return (
    <Animated.View entering={FadeIn} className="flex-1">
      <View className="flex-1 justify-center">
        <LottieView
          style={{
            height: 150,
            width: 150,
            alignSelf: 'center',
          }}
          source={Congrats}
          loop={false}
          autoPlay
        />
      </View>
      <View className="gap-8">
        <View>
          <Typography brand level="h1" color="accent" className="text-center">
            Congrats!!
          </Typography>
          <Typography color="accent" className="text-center mt-2">
            You can now begin creating your lasting mind.
          </Typography>
        </View>
        <Link asChild href="/(protected)/(tabs)/home">
          <Button>Continue</Button>
        </Link>
      </View>
    </Animated.View>
  )
}

export function CongratsScreen() {
  const { value: showSecondScreen, setTrue: setShowSecondScreen } = useBoolean(false)
  const safeStyles = useSafeAreaStyles()

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSecondScreen()
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <View className="gap-4 px-8 flex flex-1" style={safeStyles}>
      {!showSecondScreen ? <FirstView /> : <SecondView />}
    </View>
  )
}
