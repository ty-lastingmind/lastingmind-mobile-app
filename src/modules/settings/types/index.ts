export interface SettingsOption {
  title: string
  description: string
  icon: string
  onPress: () => void
}

export interface AccountField {
  label: string
  value: string
  hasChevron: boolean
  onPress: () => void
}

export interface SettingsNavigation {
  navigateToAccount: () => void
  navigateToHelp: () => void
}

export interface AccountNavigation {
  navigateToEditName: () => void
  navigateToEditEmail: () => void
  navigateToEditPhone: () => void
  navigateToChangePassword: () => void
  handleLogout: () => void
}
