import { SentQuestionData, TopContainerTopContainerData, UIActiveInivteItem } from '~/services/api/model'

export function isUIActiveInviteItem(data: TopContainerTopContainerData): data is UIActiveInivteItem {
  return data !== null && typeof data === 'object' && 'invitationId' in data && 'sender_full_name' in data
}

export function isTopContainerDataAnyOf(
  data: TopContainerTopContainerData
): data is { [key: string]: SentQuestionData } {
  if (data === null || typeof data !== 'object') return false

  // Check if it's a plain object (not UIActiveInivteItem or ProgressData)
  const hasInvitationId = 'invitationId' in data
  const hasProgressPercent = 'progress_percent' in data

  return !hasInvitationId && !hasProgressPercent && Object.keys(data).length > 0
}

// Type guards for sender (UIActiveInivteItem | SentQuestionData | null)
export function isSenderUIActiveInvite(
  sender: UIActiveInivteItem | SentQuestionData | null
): sender is UIActiveInivteItem {
  return sender !== null && 'sender_full_name' in sender
}

export function isSenderSentQuestion(sender: UIActiveInivteItem | SentQuestionData | null): sender is SentQuestionData {
  return sender !== null && 'who_sent' in sender
}
