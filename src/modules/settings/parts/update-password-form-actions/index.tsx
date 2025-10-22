import { ScreenButton } from '../../components/common/screen-button'
import { useSettings } from '../../contexts/settings-context'

export function UpdatePasswordFormActions() {
  const {
    saveNewPassword,
    handleSendPasswordResetEmail,
    newPassword,
    newPasswordConfirm,
    currentPassword,
    isSendingEmail,
    isSavingPassword,
  } = useSettings()
  const isValid =
    currentPassword.length > 5 &&
    newPassword.length > 5 &&
    newPasswordConfirm.length > 5 &&
    newPassword === newPasswordConfirm

  return (
    <>
      <ScreenButton onPress={saveNewPassword} disabled={!isValid} label="Save" loading={isSavingPassword} />
      <ScreenButton
        variant="red"
        onPress={handleSendPasswordResetEmail}
        label="Forgot Password?"
        loading={isSendingEmail}
        loadingLabel="Sending Email..."
      />
    </>
  )
}
