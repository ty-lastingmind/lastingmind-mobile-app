import { TouchableOpacity } from 'react-native'
import { Typography } from '~/modules/ui/typography'
import { useSettings } from '../../contexts/settings-context'

export function HelpActions() {
  const { navigateToContactUs } = useSettings()

  return (
    <TouchableOpacity className="h-[27px]" onPress={navigateToContactUs}>
      <Typography level="body-2" color="accent" className="text-center ">
        Contact Us
      </Typography>
    </TouchableOpacity>
  )
}
