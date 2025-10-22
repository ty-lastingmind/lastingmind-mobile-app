import { Alert, Linking, TouchableOpacity } from 'react-native'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { Typography } from '~/modules/ui/typography'

const SUPPORT_EMAIL = 'help@lastingmind.ai'

export function ContactUsForm() {
  const handleEmailPress = async () => {
    const emailUrl = `mailto:${SUPPORT_EMAIL}`

    try {
      const canOpen = await Linking.canOpenURL(emailUrl)
      if (canOpen) {
        await Linking.openURL(emailUrl)
      } else {
        Alert.alert(
          'Email Not Available',
          'Please send an email to help@lastingmind.ai using your preferred email app.'
        )
      }
    } catch (error) {
      console.error('Error opening email app:', error)
      Alert.alert('Error', 'Unable to open email app. Please try again.')
    }
  }

  return (
    <TouchableOpacity
      onPress={handleEmailPress}
      className="flex flex-row items-center justify-center bg-bg-secondary h-[64px] p-[16px] gap-[10px] rounded-[20px]"
      activeOpacity={0.7}
    >
      <SvgIcon name="email_card" size="lg" color="accent" />
      <Typography level="h5" weight="bold" color="primary" className="text-center">
        {SUPPORT_EMAIL}
      </Typography>
    </TouchableOpacity>
  )
}
