import * as Messaging from '@react-native-firebase/messaging'
import { AppState } from 'react-native'
import { messaging } from '~/libs/firebase'
import { logError, logInfo } from '~/services/logger'
import { handleNotificationNavigation } from '~/services/navigation'
import {
  chatWithSelfNotificationData,
  interviewNotificationData,
  inviteAudienceNotificationData,
  journalNotificationData,
  NotificationData,
  personalSurveyNotificationData,
  ROUTER_ENUM,
  RouterType,
  voiceCloneNotificationData,
} from '~/services/notifications/index.schema'

/**
 * Parse and validate notification data using Zod schemas
 */
function parseNotificationData(data: Record<string, unknown>): NotificationData | null {
  try {
    // Try to parse with each schema based on router value
    const router = data.router as RouterType

    switch (router) {
      case ROUTER_ENUM.BASIC_INFO:
        return personalSurveyNotificationData.parse(data)

      case ROUTER_ENUM.CHAT:
        return chatWithSelfNotificationData.parse(data)

      case ROUTER_ENUM.VOICE_CLONE:
        return voiceCloneNotificationData.parse(data)

      case ROUTER_ENUM.INVITE_AUDIENCE:
        return inviteAudienceNotificationData.parse(data)

      case ROUTER_ENUM.JOURNAL:
        return journalNotificationData.parse(data)

      case ROUTER_ENUM.INTERVIEW:
        return interviewNotificationData.parse(data)

      default:
        logError('notification-handler', `Unknown router type: ${router}`)
        return null
    }
  } catch (error) {
    logError('notification-handler', 'Failed to parse notification data', error)
    return null
  }
}

/**
 * Handle notification navigation based on validated data
 */
function handleValidatedNotification(notificationData: NotificationData) {
  try {
    logInfo('notification-handler', 'Navigating with data', notificationData)
    handleNotificationNavigation(notificationData)
  } catch (error) {
    logError('notification-handler', 'Error handling validated notification', error)
  }
}

/**
 * Initialize notification handlers
 */
export function initNotificationHandlers() {
  try {
    // Handle notification opened app (when user taps notification)
    Messaging.onNotificationOpenedApp(messaging, (remoteMessage) => {
      logInfo('notification-handler', 'Notification opened app', JSON.stringify(remoteMessage, null, 2))

      // Parse and validate notification data using Zod schemas
      const validatedData = parseNotificationData(remoteMessage.data || {})

      if (validatedData) {
        handleValidatedNotification(validatedData)
      } else {
        logError('notification-handler', 'Failed to validate notification data')
      }
    })

    // Handle initial notification (when app is opened from notification)
    Messaging.getInitialNotification(messaging).then((remoteMessage) => {
      if (remoteMessage) {
        logInfo('notification-handler', 'Initial notification', JSON.stringify(remoteMessage, null, 2))

        // Wait for app to be ready before navigating
        const handleInitialNotification = () => {
          // Parse and validate notification data using Zod schemas
          const validatedData = parseNotificationData(remoteMessage.data || {})

          if (validatedData) {
            handleValidatedNotification(validatedData)
          } else {
            logError('notification-handler', 'Failed to validate initial notification data')
          }
        }

        // If app is already active, navigate immediately
        if (AppState.currentState === 'active') {
          setTimeout(handleInitialNotification, 1000) // Small delay to ensure app is ready
        } else {
          // Wait for app to become active
          const subscription = AppState.addEventListener('change', (nextAppState) => {
            if (nextAppState === 'active') {
              handleInitialNotification()
              subscription?.remove()
            }
          })
        }
      }
    })

    logInfo('notification-handler', 'Notification handlers initialized')
  } catch (error) {
    logError('notification-handler', 'Error initializing notification handlers', error)
  }
}
