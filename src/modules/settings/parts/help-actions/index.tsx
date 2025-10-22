import { Link } from 'expo-router'
import { TouchableOpacity } from 'react-native'
import { Typography } from '~/modules/ui/typography'

export function HelpActions() {
  return (
    <Link asChild href="/(protected)/contact-us">
      <TouchableOpacity className="h-[27px]">
        <Typography level="body-2" color="accent" className="text-center ">
          Contact Us
        </Typography>
      </TouchableOpacity>
    </Link>
  )
}
