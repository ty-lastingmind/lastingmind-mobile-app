import React, { createContext, PropsWithChildren, useContext } from 'react'
import {
  useGenerateUuidUtilsGenerateUuidGet,
  useSendHelpChatQuerySettingsSendHelpChatQueryPost,
} from '~/services/api/generated'

// Help Chat Context Interface
interface HelpChatContextType {
  uuid: unknown
  isLoadingUuid: boolean
  errorUuid: unknown
  sendHelpChat: (query: string) => void
  isLoadingSendHelpChat: boolean
}

// Create Context
const HelpChatContext = createContext<HelpChatContextType | undefined>(undefined)

// Help Chat Provider Component
export function HelpChatProvider({ children }: PropsWithChildren) {
  const { data: uuid, isLoading: isLoadingUuid, error: errorUuid } = useGenerateUuidUtilsGenerateUuidGet()
  const helpChatMutation = useSendHelpChatQuerySettingsSendHelpChatQueryPost()

  const sendHelpChat = (query: string) => {
    if (!uuid) return
    helpChatMutation.mutate(
      {
        data: {
          convoId: (uuid as { uuid: string }).uuid,
          query: query,
        },
      },
      {
        onSuccess: (response) => {
          console.warn(response)
        },
        onError: (error) => {
          console.error(error)
        },
      }
    )
  }
  // Context Value
  const contextValue: HelpChatContextType = {
    uuid,
    isLoadingUuid,
    errorUuid,
    sendHelpChat,
    isLoadingSendHelpChat: helpChatMutation.isPending,
  }

  return <HelpChatContext.Provider value={contextValue}>{children}</HelpChatContext.Provider>
}

// Custom Hook to use Chat Context
export function useHelpChat(): HelpChatContextType {
  const context = useContext(HelpChatContext)
  if (context === undefined) {
    throw new Error('useChat must be used within a HelpChatProvider')
  }
  return context
}
