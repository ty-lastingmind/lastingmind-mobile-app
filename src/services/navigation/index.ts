import { router } from 'expo-router'
import { logError, logInfo } from '~/services/logger'
import { NotificationData, ROUTER_ENUM } from '~/services/notifications/index.schema'

/**
 * Handle navigation based on notification payload
 */
export function handleNotificationNavigation(data: NotificationData) {
  try {
    logInfo('navigation', 'Handling notification navigation', data)

    // Handle schema-based router paths
    switch (data.router) {
      case ROUTER_ENUM.BASIC_INFO:
        // Navigate to basic info screen
        // todo - add handler
        logInfo('navigation', 'Navigated to basic info screen')
        break

      case ROUTER_ENUM.CHAT:
        // Navigate to chat screen
        router.push(`/(protected)/(tabs)/chats/chat/${data.user_viewing_id}`)
        logInfo('navigation', 'Navigated to chat screen')
        break

      case ROUTER_ENUM.VOICE_CLONE:
        // Navigate to voice clone screen
        // todo - add handler
        logInfo('navigation', 'Navigated to voice clone screen')
        break

      case ROUTER_ENUM.INVITE_AUDIENCE:
        // Navigate to invite audience screen
        // todo - add handler
        logInfo('navigation', 'Navigated to invite audience screen')
        break

      default:
        logError('navigation', `Unknown notification type: ${screen}`)
        break
    }
  } catch (error) {
    logError('navigation', 'Error handling notification navigation', error)
  }
}
