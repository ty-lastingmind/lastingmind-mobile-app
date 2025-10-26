import { Link } from 'expo-router'
import { TouchableOpacity } from 'react-native'
import { Typography } from '~/modules/ui/typography'
import { ScreenButton } from '../../components/common/screen-button'
import { useSettings } from '../../contexts/settings-context'

export function AccountFormActions() {
  const { handleLogout, isLoggingOut } = useSettings()

  return (
    <>
      <Link href="/(protected)/settings/update-password" asChild>
        <TouchableOpacity>
          <Typography level="body-lg" color="primary" className="text-center">
            Change Password
          </Typography>
        </TouchableOpacity>
      </Link>
      <ScreenButton
        variant="red"
        onPress={handleLogout}
        label="Log Out"
        loading={isLoggingOut}
        loadingLabel="Logging Out..."
      />
    </>
  )
}
