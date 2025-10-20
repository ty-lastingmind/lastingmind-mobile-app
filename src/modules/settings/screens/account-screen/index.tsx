import { useFocusEffect } from '@react-navigation/native'
import { useCallback } from 'react'
import { SettingsScreenLayout } from '../../components/common/screen-layout'
import { useSettings } from '../../contexts/settings-context'
import { AccountForm } from '../../parts/account-form'
import { AccountFormActions } from '../../parts/account-form-actions'

export function AccountScreen() {
  const { fetchUserSettings } = useSettings()

  // Refresh user settings when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchUserSettings()
    }, [fetchUserSettings])
  )

  return (
    <SettingsScreenLayout title="Account">
      <AccountForm />
      <AccountFormActions />
    </SettingsScreenLayout>
  )
}
