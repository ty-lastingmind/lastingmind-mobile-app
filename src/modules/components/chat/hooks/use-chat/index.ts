import { useCallback, useState } from 'react'
import { ChatMessage } from '../../index.types'

export function useChat() {
  const [state, setState] = useState<{ messages: ChatMessage[] }>({ messages: [] })

  const add = useCallback(
    (message: Omit<ChatMessage, 'index'>) => {
      const newMessage = { index: state.messages.length, ...message }

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

  const update = useCallback((index: number, message: Omit<Partial<ChatMessage>, 'index'>) => {
    setState((prevState) => ({
      ...prevState,
      messages: prevState.messages.map((prevMessage) =>
        prevMessage.index === index ? { ...message, ...prevMessage } : prevMessage
      ),
    }))
  }, [])

  return {
    state,
    actions: {
      add,
      remove,
      update,
    },
  }
}
