import { router } from 'expo-router'
import { markSuccessNotifcationUtilsSucccessfulNotificationPost } from '~/services/api/generated'
import { logError, logInfo } from '~/services/logger'
import { NotificationData, ROUTER_ENUM } from '~/services/notifications/index.schema'

/**
 * Handle navigation based on notification payload
 */
export async function handleNotificationNavigation(data: NotificationData) {
  try {
    logInfo('navigation', 'Handling notification navigation', data)

    switch (data.router) {
      case ROUTER_ENUM.BASIC_INFO:
        router.push('/(protected)/onboarding/01-name')
        logInfo('navigation', 'Navigated to basic info screen')
        break

      case ROUTER_ENUM.CHAT:
        router.push(`/(protected)/(tabs)/chats/chat/${data.user_viewing_id}`)
        logInfo('navigation', 'Navigated to chat screen')
        break

      case ROUTER_ENUM.VOICE_CLONE:
        // todo - add handler
        logInfo('navigation', 'Navigated to voice clone screen')
        break

      case ROUTER_ENUM.INVITE_AUDIENCE:
        // todo - add handler
        logInfo('navigation', 'Navigated to invite audience screen')
        break

      case ROUTER_ENUM.JOURNAL:
        router.push(`/(protected)/(tabs)/questions/journal/add/01-select-topic?topicName=${data.topic}`)
        logInfo('navigation', 'Navigated to journal screen')
        break

      case ROUTER_ENUM.INTERVIEW:
        router.push(`/(protected)/(tabs)/questions/interview/add/01-select-topic?topicName=${data.topic}`)
        logInfo('navigation', 'Navigated to interview screen')
        break

      case ROUTER_ENUM.CURATED_QUESTIONS:
        // router.push(`/(protected)/(tabs)/questions/curated-questions?topicName=${data.topic}`)
        // todo add handler
        logInfo('navigation', 'Navigated to curated questions screen')
        break

      default:
        logError('navigation', `Unknown notification type: ${screen}`)
        break
    }

    await markSuccessNotifcationUtilsSucccessfulNotificationPost({ notificationId: data.notification_id })
  } catch (error) {
    logError('navigation', 'Error handling notification navigation', error)
  }
}
