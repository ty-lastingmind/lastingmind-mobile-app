import { TouchableOpacity } from 'react-native'
import { Typography } from '~/modules/ui/typography'
import { useSettings } from '../../contexts/settings-context'

export function UpdateEmailFormActions() {
  const { saveNewEmail, newEmail } = useSettings()
  const isValid = newEmail.length > 0

  return (
    <TouchableOpacity onPress={saveNewEmail} disabled={!isValid}>
      <Typography level="body-lg" color="primary" className="text-center">
        Save
      </Typography>
    </TouchableOpacity>
  )
}
