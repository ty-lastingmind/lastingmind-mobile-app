import { z } from 'zod'

// Router enum for type identification
export const ROUTER_ENUM = {
  BASIC_INFO: '/basic-info',
  CHAT: '/chat',
  VOICE_CLONE: '/voice-clone',
  INVITE_AUDIENCE: '/invite-audience',
  JOURNAL: '/journal',
} as const

export type RouterType = (typeof ROUTER_ENUM)[keyof typeof ROUTER_ENUM]

export const personalSurveyNotificationData = z.object({
  notification_id: z.string(),
  router: z.enum([ROUTER_ENUM.BASIC_INFO]),
})

export const chatWithSelfNotificationData = z.object({
  notification_id: z.string(),
  user_viewing_id: z.string(),
  router: z.enum([ROUTER_ENUM.CHAT]),
})

export const voiceCloneNotificationData = z.object({
  notification_id: z.string(),
  router: z.enum([ROUTER_ENUM.VOICE_CLONE]),
})

export const inviteAudienceNotificationData = z.object({
  notification_id: z.string(),
  router: z.enum([ROUTER_ENUM.INVITE_AUDIENCE]),
})

export const journalNotificationData = z.object({
  notification_id: z.string(),
  topic: z.string(),
  router: z.enum([ROUTER_ENUM.JOURNAL]),
})

export type PersonalSurveyNotificationData = z.infer<typeof personalSurveyNotificationData>
export type ChatWithSelfNotificationData = z.infer<typeof chatWithSelfNotificationData>
export type VoiceCloneNotificationData = z.infer<typeof voiceCloneNotificationData>
export type InviteAudienceNotificationData = z.infer<typeof inviteAudienceNotificationData>
export type JournalNotificationData = z.infer<typeof journalNotificationData>

export type NotificationData =
  | PersonalSurveyNotificationData
  | ChatWithSelfNotificationData
  | VoiceCloneNotificationData
  | InviteAudienceNotificationData
  | JournalNotificationData
