import { createContext, useContext } from 'react'

interface MessagesListContextValue {
  chattingWithViewId: string
  chattingWithRealId: string
  conversationId: string
}

const MessagesListContext = createContext<MessagesListContextValue>({
  chattingWithViewId: '',
  chattingWithRealId: '',
  conversationId: '',
})

export const useMessagesListContext = () => useContext(MessagesListContext)

export const MessagesListContextProvider = MessagesListContext.Provider
