// import { useAppleSignIn } from '~/hooks/auth/use-apple-sign-in'
import * as AppleAuthentication from 'expo-apple-authentication'
import { View } from 'react-native'

export function AppleButton() {
  // TODO: Configure Apple sign in certificates
  // const appleSignInMutation = useAppleSignIn()

  function handleAppleSignIn() {
    // appleSignInMutation.mutate()
  }

  return (
    <View className="flex-1 items-center justify-center">
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={5}
        onPress={handleAppleSignIn}
      />
    </View>
  )
}
