import type { SvgIconProps } from '~/modules/ui/svg-icon/index.types'
import { QuickActionAction } from '~/services/api/model'
import { Href } from 'expo-router'

interface QuickActionConfig {
  title: string
  icon: SvgIconProps['name']
  route?: Href
}

export const quickActionToData: Record<QuickActionAction, QuickActionConfig> = {
  [QuickActionAction.curated_question_action]: {
    title: 'Answer Curated Questions',
    icon: 'curated_questions',
    route: '/questions/curated-questions',
  },
  [QuickActionAction.interview_action]: {
    title: 'Record an Interview',
    icon: 'interview',
  },
  [QuickActionAction.journal_action]: {
    title: 'Write a Journal Entry',
    icon: 'journal',
  },
  [QuickActionAction.chat_self_action]: {
    title: 'Chat with My LastingMind',
    icon: 'chat',
  },
  [QuickActionAction.invite_audience_action]: {
    title: 'Invite Your Audience',
    icon: 'audience',
  },
  [QuickActionAction.clone_voice_action]: {
    title: 'Clone Your Voice',
    icon: 'mic_filled',
  },
  [QuickActionAction.view_answers_action]: {
    title: 'View Your Past Answers',
    icon: 'chat_text',
  },
  [QuickActionAction.chat_with_other_action]: {
    title: 'Chat with Other',
    icon: 'chat',
  },
}

export const defaultQuickActionConfig: QuickActionConfig = {
  title: 'Unknown Action',
  icon: 'chat',
}
