import { TouchableOpacity } from 'react-native'
import { Typography } from '~/modules/ui/typography'
import { useSettings } from '../../contexts/settings-context'

export function AccountFormActions() {
  const { navigateToChangePassword, handleLogout } = useSettings()

  return (
    <>
      <TouchableOpacity onPress={navigateToChangePassword}>
        <Typography level="body-lg" color="primary" className="text-center">
          Change Password
        </Typography>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout}>
        <Typography level="body-lg" color="red" className="text-center">
          Log Out
        </Typography>
      </TouchableOpacity>
    </>
  )
}
