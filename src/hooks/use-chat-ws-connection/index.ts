import { useFocusEffect } from 'expo-router'
import { useCallback } from 'react'
import useUser from '~/hooks/auth/use-user'
import { serverWebsocketUrl } from '~/libs/axios'
import { UseChatWsConnectionProps } from '~/hooks/use-chat-ws-connection/index.types'
import { messageSchema } from '~/hooks/use-chat-ws-connection/index.validation'
import { Auth, Logger } from '~/services'

export function useChatWsConnection({ onMessage, onConnected }: UseChatWsConnectionProps) {
  const user = useUser()

  const connectToWebSocket = async () => {
    if (!user.data) {
      Logger.logWarn('User is not signed in')
      return
    }

    const token = await Auth.getIdToken(user.data)

    // @ts-expect-error - WebSocket typings are incorrect
    const websocket = new WebSocket(`${serverWebsocketUrl}/utils/tts-stream`, null, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })

    websocket.onopen = () => {
      Logger.logInfo('WebSocket opened')

      setTimeout(() => {
        onConnected()
      }, 500)
    }
    websocket.onmessage = (event) => {
      Logger.logInfo('WebSocket message')

      const data = JSON.parse(event.data)
      const result = messageSchema.safeParse(data)

      if (!result.data) {
        Logger.logWarn('WebSocket message is not valid')
        return
      }

      onMessage(result.data)
    }
    websocket.onclose = () => {
      Logger.logInfo('WebSocket closed')
    }
    websocket.onerror = (error) => {
      Logger.logError('WebSocket error', error)
    }

    return websocket
  }

  useFocusEffect(
    useCallback(() => {
      let websocket: WebSocket | null = null

      connectToWebSocket().then((ws) => {
        websocket = ws ?? null
      })

      return () => {
        websocket?.close()
      }
    }, [])
  )
}
