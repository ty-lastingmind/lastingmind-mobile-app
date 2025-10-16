import { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { router, usePathname } from 'expo-router'
import { CanChatWithItem } from '~/services/api/model'
import { usePullCanChatWithChatPullCanChatWithGet } from '~/services/api/generated'

interface ChatContextValue {
  chattingWithViewId: string | null
  setChattingWithViewId: (id: string | null) => void
  chattingWithUser: CanChatWithItem | undefined
  selectPersonToChat: (user: CanChatWithItem) => void
  users: CanChatWithItem[]
  isInChatsArea: boolean
}

export const ChatContext = createContext<ChatContextValue | null>(null)

interface ChatProviderProps {
  children: ReactNode
}

export function ChatProvider({ children }: ChatProviderProps) {
  const [chattingWithViewId, setChattingWithViewId] = useState<string | null>(null)

  const pathname = usePathname()
  const isInChatsArea = pathname.includes('/chats')

  const canChatWith = usePullCanChatWithChatPullCanChatWithGet({
    query: {
      enabled: isInChatsArea,
    },
  })

  const chattingWithUser = useMemo(() => {
    if (!chattingWithViewId || !canChatWith.data?.can_chat_with?.length) return undefined
    return canChatWith.data?.can_chat_with.find((user) => user.chattingWithViewId === chattingWithViewId)
  }, [canChatWith.data?.can_chat_with, chattingWithViewId])

  const selectPersonToChat = useCallback(
    (user: CanChatWithItem) => {
      setChattingWithViewId(user.chattingWithViewId)
      if (!isInChatsArea) {
        router.push('/chats')
      }
    },
    [isInChatsArea]
  )

  useEffect(() => {
    if (!isInChatsArea) {
      setChattingWithViewId(null)
    }
  }, [isInChatsArea])

  /**
   * Initialize chat with first user
   */
  useEffect(() => {
    if (canChatWith.data?.can_chat_with && !chattingWithViewId) {
      const firstUser = canChatWith.data.can_chat_with.at(0)

      if (firstUser) {
        setChattingWithViewId(firstUser.chattingWithViewId)
      }
    }
  }, [canChatWith.data?.can_chat_with, chattingWithViewId])

  const value = useMemo(
    () => ({
      chattingWithViewId,
      setChattingWithViewId,
      chattingWithUser,
      selectPersonToChat,
      isInChatsArea,
      users: canChatWith.data?.can_chat_with ?? [],
    }),
    [chattingWithViewId, chattingWithUser, selectPersonToChat, isInChatsArea, canChatWith.data?.can_chat_with]
  )

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}
