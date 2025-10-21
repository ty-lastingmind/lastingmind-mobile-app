import { View } from 'react-native'
import { useSettings } from '../../contexts/settings-context'
import { SettingsOption } from '../../types'
import { SettingsFormOption } from '../settings-form-option/index'

export function SettingsForm() {
  const { navigateToAccount, navigateToHelp } = useSettings()

  const settingsItems: SettingsOption[] = [
    {
      title: 'Your Account',
      description: 'Update and view your email, passwords, and other personal information.',
      icon: 'person',
      onPress: navigateToAccount,
    },
    {
      title: 'Help',
      description: 'Find answers to common questions and learn how to use all the features.',
      icon: 'question',
      onPress: navigateToHelp,
    },
  ]

  return (
    <View className="flex flex bg-bg-secondary rounded-t-[20px] rounded-b-[20px]">
      {settingsItems.map((item, index) => {
        return <SettingsFormOption item={item} key={index} showSeparator={index === settingsItems.length - 1} />
      })}
    </View>
  )
}
