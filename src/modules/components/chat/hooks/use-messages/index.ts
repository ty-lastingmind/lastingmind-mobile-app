import { useCallback, useState } from 'react'

export interface ChatMessage {
  index: number
  text: string
  isIncoming: boolean
  isLoading: boolean
  audioUrl?: string
}

export function useMessages() {
  const [messages, setMessages] = useState<ChatMessage[]>([])

  const addNewMessage = useCallback((message: Omit<ChatMessage, 'index'>) => {
    return setMessages((prev) =>
      prev.concat({
        ...message,
        index: prev.length,
      })
    )
  }, [])

  const addLoadingOutgoingMessage = useCallback(() => {
    return setMessages((prev) =>
      prev.concat({
        text: '',
        index: prev.length,
        isIncoming: false,
        isLoading: true,
      })
    )
  }, [])

  const updateLastMessage = useCallback((updateMessage: Partial<ChatMessage>) => {
    setMessages((prevMessages) =>
      prevMessages.map((message, index) =>
        index === prevMessages.length - 1
          ? {
              ...message,
              ...updateMessage,
            }
          : message
      )
    )
  }, [])

  const updateMessageAtIndex = useCallback((index: number, updateMessage: Partial<ChatMessage>) => {
    setMessages((prevMessages) =>
      prevMessages.map((message, messageIndex) =>
        index === messageIndex
          ? {
              ...message,
              ...updateMessage,
            }
          : message
      )
    )
  }, [])

  const removeLastMessage = useCallback(() => {
    setMessages((prevMessages) => prevMessages.slice(0, prevMessages.length - 1))
  }, [])

  return {
    messages,
    addNewMessage,
    addLoadingOutgoingMessage,
    updateLastMessage,
    updateMessageAtIndex,
    removeLastMessage,
  }
}
