import { RelativePathString } from 'expo-router'
export interface SettingsOption {
  title: string
  description: string
  icon: string
  href: RelativePathString
}
export interface AccountField {
  label: string
  value: string
  hasChevron: boolean
  href: RelativePathString
}
