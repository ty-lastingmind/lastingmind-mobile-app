import { View } from 'react-native'
import { SettingsOption } from '../../types'
import { SettingsFormOption } from '../settings-form-option/index'

export function SettingsForm() {
  const settingsItems: SettingsOption[] = [
    {
      title: 'Your Account',
      description: 'Update and view your email, passwords, and other personal information.',
      icon: 'person',
      // @ts-expect-error - Route types will be regenerated
      href: '/(protected)/settings/account',
    },
    {
      title: 'Help',
      description: 'Find answers to common questions and learn how to use all the features.',
      icon: 'question',
      // @ts-expect-error - Route types will be regenerated
      href: '/(protected)/settings/help',
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
