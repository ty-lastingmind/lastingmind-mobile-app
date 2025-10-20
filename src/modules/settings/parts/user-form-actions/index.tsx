import { TouchableOpacity } from 'react-native'
import { Typography } from '~/modules/ui/typography'
import { useSettings } from '../../contexts/settings-context'

export function UserFormActions() {
  const { saveNewDisplayName, newDisplayName } = useSettings()
  const isValid = newDisplayName.length > 0

  return (
    <TouchableOpacity onPress={saveNewDisplayName} disabled={!isValid}>
      <Typography level="body-lg" color="primary" className="text-center">
        Save
      </Typography>
    </TouchableOpacity>
  )
}
