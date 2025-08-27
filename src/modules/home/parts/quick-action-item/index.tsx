import { TouchableOpacity } from 'react-native'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { Typography } from '~/modules/ui/typography'
import type { QuickAction } from '~/services/api/model'
import { quickActionToData, defaultQuickActionConfig } from './index.static'
import { useCallback } from 'react'
import { useTailwindColors } from '~/providers/tailwind-colors-provider'
const ICON_SIZE = 48

interface QuickActionItemProps {
  action: QuickAction
}

export const QuickActionItem = ({ action }: QuickActionItemProps) => {
  const colors = useTailwindColors()
  const actionProps = quickActionToData[action.action] ?? {
    ...defaultQuickActionConfig,
    title: `${defaultQuickActionConfig.title} (${action.action})`,
  }

  // TODO: Add other actions when we have them
  const handleActionPress = useCallback(() => {
    switch (action.action) {
      case 'curated_question_action':
        // - run /curated-questions/generate-starting-questions with topic field empty.
        break
      default:
        console.log('Unknown action:', action.action)
        break
    }
  }, [action.action])

  return (
    <TouchableOpacity
      onPress={handleActionPress}
      className="w-36 h-36 bg-button-secondary-bg rounded-[20px] flex flex-col items-center justify-center gap-3"
      activeOpacity={0.7}
    >
      <Typography level="label-1" color="primary" className="text-center px-2">
        {actionProps.title}
      </Typography>
      <SvgIcon name={actionProps.icon} size={ICON_SIZE} color={colors['label-primary']} />
    </TouchableOpacity>
  )
}
