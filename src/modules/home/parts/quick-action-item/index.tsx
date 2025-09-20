import { TouchableOpacity } from 'react-native'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { Typography } from '~/modules/ui/typography'
import { QuickActionAction, type QuickAction } from '~/services/api/model'
import { quickActionToData, defaultQuickActionConfig } from './index.static'
import { useCallback, useMemo } from 'react'
import { useRouter } from 'expo-router'
import { Avatar } from '~/modules/ui/avatar'

interface QuickActionItemProps {
  action: QuickAction
}

export const QuickActionItem = ({ action }: QuickActionItemProps) => {
  const router = useRouter()
  const actionProps = quickActionToData[action.action] ?? {
    ...defaultQuickActionConfig,
    title: `${defaultQuickActionConfig.title} (${action.action})`,
  }

  const actionTitle = useMemo(() => {
    if (action.action === QuickActionAction.chat_with_other_action) {
      return `Chat with ${action.action_data?.full_user_name ?? ''}`
    }

    return actionProps.title
  }, [actionProps.title, action.action, action.action_data?.full_user_name])

  const handleActionPress = useCallback(() => {
    const route = actionProps.route
    if (!route) {
      return
    }
    router.navigate(route)
  }, [actionProps.route, router])

  return (
    <TouchableOpacity
      onPress={handleActionPress}
      className="w-36 h-36 bg-button-secondary-bg rounded-[20px] flex flex-col items-center justify-center gap-3"
      activeOpacity={0.7}
    >
      <Typography level="label-1" color="primary" className="text-center px-2">
        {actionTitle}
      </Typography>
      {action.action === QuickActionAction.chat_with_other_action ? (
        <Avatar source={action.action_data?.profile_image} size="sm" />
      ) : (
        <SvgIcon name={actionProps.icon} size="3xl" color="primary" />
      )}
    </TouchableOpacity>
  )
}
