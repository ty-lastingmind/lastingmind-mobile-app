import { ScreenButton } from '../../components/common/screen-button'
import { useSettings } from '../../contexts/settings-context'

export function UserFormActions() {
  const { saveNewDisplayName, newDisplayName, isUpdating } = useSettings()
  const isValid = newDisplayName.length > 0

  return <ScreenButton onPress={saveNewDisplayName} disabled={!isValid} label="Save" loading={isUpdating} />
}
