import { SettingsScreenLayout } from '../../components/common/screen-layout'
import { AccountForm } from '../../parts/account-form'
import { AccountFormActions } from '../../parts/account-form-actions'

export function AccountScreen() {
  return (
    <SettingsScreenLayout title="Account">
      <AccountForm />
      <AccountFormActions />
    </SettingsScreenLayout>
  )
}
