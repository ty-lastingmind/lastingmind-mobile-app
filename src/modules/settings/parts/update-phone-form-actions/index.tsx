import { ScreenButton } from '../../components/common/screen-button'
import { useSettings } from '../../contexts/settings-context'

export function UpdatePhoneFormActions() {
  const { saveNewPhoneNumber, newPhoneNumber, isUpdating } = useSettings()
  const isValid = newPhoneNumber.length > 0

  return <ScreenButton onPress={saveNewPhoneNumber} disabled={!isValid} label="Save" loading={isUpdating} />
}
