import { z } from 'zod'

enum NotificationType {
  test = 'test',
}

export type Notification = {
  id: string
  notificationType?: NotificationType
  title: string
  body: string
}

export const schema = z
  .object({
    data: z.object({
      notificationType: z.nativeEnum(NotificationType),
    }),
    messageId: z.string(),
    notification: z.object({
      body: z.string(),
      title: z.string(),
    }),
    android: z
      .object({
        notification: z.object({
          channel_id: z.string(),
          sound: z.string(),
        }),
      })
      .optional(),
    apns: z
      .object({
        payload: z.object({
          aps: z.object({
            sound: z.string(),
          }),
        }),
      })
      .optional(),
  })
  .transform<Notification>(({ messageId, notification: { title, body }, data }) => ({
    id: messageId,
    notificationType: data?.notificationType,
    title,
    body,
  }))
