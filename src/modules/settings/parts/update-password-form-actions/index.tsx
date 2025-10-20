import { TouchableOpacity } from 'react-native'
import { Typography } from '~/modules/ui/typography'
import { useSettings } from '../../contexts/settings-context'

export function UpdatePasswordFormActions() {
  const { saveNewPassword, handleSendPasswordResetEmail, newPassword, newPasswordConfirm, currentPassword } =
    useSettings()
  const isValid =
    currentPassword.length > 0 &&
    newPassword.length > 0 &&
    newPasswordConfirm.length > 0 &&
    newPassword === newPasswordConfirm

  return (
    <>
      <TouchableOpacity onPress={saveNewPassword} disabled={!isValid}>
        <Typography level="body-lg" color="primary" className="text-center">
          Save
        </Typography>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSendPasswordResetEmail}>
        <Typography level="body-lg" color="red" className="text-center">
          Forgot Password?
        </Typography>
      </TouchableOpacity>
    </>
  )
}
