import LottieView from 'lottie-react-native'
import { View } from 'react-native'
import { Typography } from '~/modules/ui/typography'
import { Button } from '~/modules/ui/button'
import CheckSpecial from '~/modules/friends-family/assets/Check_Special.json'
import { router } from 'expo-router'

export function SaveCompleteScreen() {
  const onFinish = () => {
    router.push('/profile')
  }

  return (
    <View className="flex-1">
      <View className="flex-1 justify-center">
        <LottieView
          style={{
            height: 300,
            width: 300,
            alignSelf: 'center',
          }}
          source={CheckSpecial}
          loop={true}
          autoPlay
        />
      </View>
      <View className="gap-8">
        <Typography level="h2" weight="bold" color="accent" brand className="text-center">
          Great Job!
        </Typography>
        <View className="px-6">
          <Typography level="body-1" color="accent" brand className="text-center">
            Your Family and Friends have now been captured! You can view, edit, or add in your profile!
          </Typography>
        </View>
        <View className="px-6 pb-14">
          <Button size="lg" onPress={onFinish}>
            Finish
          </Button>
        </View>
      </View>
    </View>
  )
}
