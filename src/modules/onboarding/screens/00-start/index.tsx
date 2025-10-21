import { View } from 'react-native'
import { Logo } from '~/modules/components/logo'
import { Typography } from '~/modules/ui/typography'
import { Button } from '~/modules/ui/button'
import { router } from 'expo-router'

export function StartScreen() {
  return (
    <View className="flex-1 bg-white justify-between items-center px-8 pt-24 pb-safe pt-safe">
      <View className="flex-1 justify-center items-center gap-6">
        <Logo level="logo" />
        <Typography
          level="h2"
          color="accent"
          weight="normal"
          className="text-center"
          style={{ fontFamily: 'InriaSerif-Regular' }}
        >
          Start building{'\n'}your LastingMind{'\n'}today!
        </Typography>
      </View>

      <Button
        btnContainerClassName="w-full"
        variant="primary"
        size="lg"
        onPress={() =>
          router.push({
            pathname: '/onboarding/04-topics',
            params: { needsToUpgrade: 'true' },
          })
        }
      >
        Start
      </Button>
    </View>
  )
}
