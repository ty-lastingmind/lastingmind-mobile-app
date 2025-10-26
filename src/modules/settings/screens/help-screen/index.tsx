import { View } from 'react-native'
import { SettingsScreenLayout } from '../../components/common/screen-layout'
import { HelpActions } from '../../parts/help-actions'
import { HelpInput } from '../../parts/help-input'

export function HelpScreen() {
  return (
    <SettingsScreenLayout title="Help">
      <View className="w-full h-full justify-end py-[70px] px-[46px]">
        <HelpActions />
        <HelpInput />
      </View>
    </SettingsScreenLayout>
  )
}
