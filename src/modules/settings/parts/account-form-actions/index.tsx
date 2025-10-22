import { Link } from 'expo-router'
import { TouchableOpacity } from 'react-native'
import { Typography } from '~/modules/ui/typography'
import { useSettings } from '../../contexts/settings-context'

export function AccountFormActions() {
  const { handleLogout } = useSettings()

  return (
    <>
      <Link href="/(protected)/settings/update-password" asChild>
        <TouchableOpacity>
          <Typography level="body-lg" color="primary" className="text-center">
            Change Password
          </Typography>
        </TouchableOpacity>
      </Link>
      <TouchableOpacity onPress={handleLogout}>
        <Typography level="body-lg" color="red" className="text-center">
          Log Out
        </Typography>
      </TouchableOpacity>
    </>
  )
}
