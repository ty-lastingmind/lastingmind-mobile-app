import { SettingsScreenLayout } from '../../components/common/screen-layout'
import { SettingsForm } from '../../parts/settings-form'

export function SettingsScreen() {
  return (
    <SettingsScreenLayout title="Settings">
      <SettingsForm />
    </SettingsScreenLayout>
  )
}
