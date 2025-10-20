import { TouchableOpacity } from 'react-native'
import { Typography } from '~/modules/ui/typography'
import { useSettings } from '../../contexts/settings-context'

export function UpdatePhoneFormActions() {
  const { saveNewPhoneNumber, newPhoneNumber } = useSettings()
  const isValid = newPhoneNumber.length > 0

  return (
    <TouchableOpacity onPress={saveNewPhoneNumber} disabled={!isValid}>
      <Typography level="body-lg" color="primary" className="text-center">
        Save
      </Typography>
    </TouchableOpacity>
  )
}
