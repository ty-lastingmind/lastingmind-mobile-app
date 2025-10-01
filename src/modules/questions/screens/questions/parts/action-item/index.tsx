import { Link } from 'expo-router'
import { TouchableOpacity, View } from 'react-native'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { Typography } from '~/modules/ui/typography'
import { ActionItem as ActionItemType } from '../../types'

type ActionItemProps = {
  action: ActionItemType
}

export function ActionItem({ action }: ActionItemProps) {
  return (
    <Link href={action.href} asChild>
      <TouchableOpacity className="flex-row items-center gap-6 px-8 py-4 bg-button-secondary-bg rounded-md">
        <SvgIcon name={action.icon} size="3xl" color="primary" />
        <View className="flex-col gap-2 flex-1">
          <Typography level="body-lg" color="accent" brand>
            {action.title}
          </Typography>
          <Typography level="body-1" color="primary">
            {action.description}
          </Typography>
        </View>
      </TouchableOpacity>
    </Link>
  )
}
