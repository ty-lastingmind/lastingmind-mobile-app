import { View, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Typography } from '~/modules/ui/typography'
import Congrats from '~/modules/onboarding/assets/Congrats.json'
import LottieView from 'lottie-react-native'
import { Button } from '~/modules/ui/button'
import { useRouter } from 'expo-router'

function FirstView() {
  return (
    <View className="pt-28 pb-16 gap-2">
      <Typography brand level="h1" color="accent" className="text-center">
        {'Profile \nSaved!'}
      </Typography>
    </View>
  )
}

function SecondView({ fadeAnim }: { fadeAnim: Animated.Value }) {
  const router = useRouter()

  const handleContinue = () => {
    router.push('/(protected)/(tabs)/home')
  }

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
      }}
      className="flex-1"
    >
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
            {'Congrats!!'}
          </Typography>
          <Typography color="accent" className="text-center mt-2">
            You can now begin creating your lasting mind.
          </Typography>
        </View>
        <Button onPress={handleContinue}>Continue</Button>
      </View>
    </Animated.View>
  )
}

export function CongratsScreen() {
  const [showSecondScreen, setShowSecondScreen] = useState(false)
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSecondScreen(true)
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500, // Fade-in duration
        useNativeDriver: true,
      }).start()
    }, 2000)

    return () => clearTimeout(timer)
  }, [fadeAnim])

  return (
    <View className="gap-4 px-8 py-safe flex flex-1">
      {!showSecondScreen ? <FirstView /> : <SecondView fadeAnim={fadeAnim} />}
    </View>
  )
}
