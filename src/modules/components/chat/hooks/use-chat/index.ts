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

  const appendTextAndAudioToLastMessage = useCallback((text: string, audioSrc: string) => {
    setState((prevState) => {
      const lastMessage = prevState.messages.at(-1)
      const messagesWithoutLastMessage = prevState.messages.slice(0, -1)

      if (!lastMessage) return prevState

      return {
        ...prevState,
        messages: [
          ...messagesWithoutLastMessage,
          ...(lastMessage.isIncoming
            ? [
                {
                  ...lastMessage,
                  text: lastMessage.text + ` ${text}`,
                  audioSources: lastMessage.audioSources ? [...lastMessage.audioSources, audioSrc] : [audioSrc],
                },
              ]
            : [lastMessage, { index: lastMessage.index + 1, text: text, isIncoming: true, audioSources: [audioSrc] }]),
        ],
      }
    })
  }, [])

  return {
    state,
    actions: {
      add,
      remove,
      update,
      appendTextAndAudioToLastMessage,
    },
  }
}
