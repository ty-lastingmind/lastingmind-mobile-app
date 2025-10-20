import { QuickAction, QuickActionAction } from '~/services/api/model'

export const FALLBACK_QUICK_ACTIONS: QuickAction[] = [
  {
    action: QuickActionAction.curated_question_action,
    action_data: null,
  },
  {
    action: QuickActionAction.interview_action,
    action_data: null,
  },
  {
    action: QuickActionAction.journal_action,
    action_data: null,
  },
  {
    action: QuickActionAction.chat_self_action,
    action_data: null,
  },
]
