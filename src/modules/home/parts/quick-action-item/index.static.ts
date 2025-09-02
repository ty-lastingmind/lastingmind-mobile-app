import type { SvgIconProps } from '~/modules/ui/svg-icon/index.types'
import type { QuickActionAction } from '~/services/api/model'

interface QuickActionConfig {
  title: string
  icon: SvgIconProps['name']
}

export const quickActionToData: Record<QuickActionAction, QuickActionConfig> = {
  curated_question_action: {
    title: 'Answer Curated Questions',
    icon: 'curated_questions',
  },
  interview_action: {
    title: 'Record an Interview',
    icon: 'interview',
  },
  journal_action: {
    title: 'Write a Journal Entry',
    icon: 'journal',
  },
  chat_self_action: {
    title: 'Chat with My LastingMind',
    icon: 'chat',
  },
  invite_audience_action: {
    title: 'Invite Audience',
    icon: 'chat',
  },
  clone_voice_action: {
    title: 'Clone Voice',
    icon: 'chat',
  },
  view_answers_action: {
    title: 'View Answers',
    icon: 'interview',
  },
  chat_with_other_action: {
    title: 'Chat with Other',
    icon: 'chat',
  },
}

export const defaultQuickActionConfig: QuickActionConfig = {
  title: 'Unknown Action',
  icon: 'chat',
}
