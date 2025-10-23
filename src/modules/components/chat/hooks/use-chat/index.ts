import { useCallback, useState } from 'react'
import { isIncomingMessage, isOutgoingMessage } from '~/utils/chat'
import {
  ChatMessage,
  IncomingChatMessage,
  IncomingMessageData,
  IncomingMessageDataItem,
  OutgoingChatMessage,
  OutgoingMessageData,
} from '../../index.types'

export function useChat() {
  const [state, setState] = useState<{ messages: ChatMessage[] }>({ messages: [] })

  const addIncoming = useCallback(
    (data: IncomingMessageData) => {
      const newMessage: IncomingChatMessage = { type: 'incoming', index: state.messages.length, data }

      setState((prevState) => ({
        ...prevState,
        messages: [...prevState.messages, newMessage],
      }))

      return newMessage
    },
    [state.messages.length]
  )

  const addOutgoing = useCallback(
    (data: OutgoingMessageData) => {
      const newMessage: OutgoingChatMessage = { type: 'outgoing', index: state.messages.length, data }

      setState((prevState) => ({
        ...prevState,
        messages: [...prevState.messages, newMessage],
      }))

      return newMessage
    },
    [state.messages.length]
  )

  const remove = useCallback((index: number) => {
    setState((prevState) => ({
      ...prevState,
      messages: prevState.messages.filter((prevMessage) => prevMessage.index !== index),
    }))
  }, [])

  const updateIncoming = useCallback((index: number, data: IncomingMessageData) => {
    setState((prevState) => ({
      ...prevState,
      messages: prevState.messages.map((message) =>
        message.index === index && isIncomingMessage(message) ? { ...message, data } : message
      ),
    }))
  }, [])

  const updateOutgoing = useCallback((index: number, data: OutgoingMessageData) => {
    setState((prevState) => ({
      ...prevState,
      messages: prevState.messages.map((message) =>
        message.index === index && isOutgoingMessage(message) ? { ...message, data } : message
      ),
    }))
  }, [])

  const appendDataToLastMessageIncomingMessage = useCallback((data: IncomingMessageDataItem) => {
    setState((prevState) => {
      const lastMessage = prevState.messages.at(-1)
      const messagesWithoutLastMessage = prevState.messages.slice(0, -1)

      if (isIncomingMessage(lastMessage)) {
        return {
          ...prevState,
          messages: [
            ...messagesWithoutLastMessage,
            {
              ...lastMessage,
              data: lastMessage.data.concat(data),
            },
          ],
        }
      } else {
        const newMessage: IncomingChatMessage = { type: 'incoming', index: prevState.messages.length, data: [data] }

        return {
          ...prevState,
          messages: [...prevState.messages, newMessage],
        }
      }
    })
  }, [])

  return {
    state,
    actions: {
      addIncoming,
      addOutgoing,
      remove,
      updateIncoming,
      updateOutgoing,
      appendDataToLastMessageIncomingMessage,
    },
  }
}
