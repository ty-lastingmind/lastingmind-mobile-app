import React, { PropsWithChildren } from 'react'
import { SafeAreaView, View } from 'react-native'
import { SettingsProvider } from '~/modules/settings/contexts/settings-context'
import { SettingsHeader } from '../screen-header'

export type SettingsScreenLayoutProps = PropsWithChildren<{
  title: string
}>

export function SettingsScreenLayout({ children, title }: SettingsScreenLayoutProps) {
  return (
    <SettingsProvider>
      <SafeAreaView className="flex-1bg-bg-primary">
        <SettingsHeader title={title} />
        <View className="p-[16px] gap-[24px]">{children}</View>
      </SafeAreaView>
    </SettingsProvider>
  )
}
