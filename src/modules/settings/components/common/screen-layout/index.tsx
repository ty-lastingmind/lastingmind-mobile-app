import React, { PropsWithChildren } from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SettingsHeader } from '../screen-header'

export type SettingsScreenLayoutProps = PropsWithChildren<{
  title: string
  contentStyle?: string
}>

export function SettingsScreenLayout({ children, title, contentStyle }: SettingsScreenLayoutProps) {
  return (
    <SafeAreaView className="flex-1 bg-bg-primary">
      <SettingsHeader title={title} />
      <View className={`p-[16px] gap-[24px] ${contentStyle}`}>{children}</View>
    </SafeAreaView>
  )
}
