import { ScreenButton } from '../../components/common/screen-button'
import { useSettings } from '../../contexts/settings-context'

export function UpdateEmailFormActions() {
  const { saveNewEmail, newEmail, isUpdating } = useSettings()
  const isValid = newEmail.length > 0

  return <ScreenButton onPress={saveNewEmail} disabled={!isValid} label="Save" loading={isUpdating} />
}
