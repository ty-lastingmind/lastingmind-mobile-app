import { useContext } from 'react'
import { ChatContext } from '../../contexts/chat-context'

export function useChatContext() {
  const context = useContext(ChatContext)

  if (!context) {
    throw new Error('useChatContext must be used within ChatProvider')
  }

  return context
}
