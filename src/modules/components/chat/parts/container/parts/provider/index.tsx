import React, { createContext, PropsWithChildren } from 'react'
import { ChatMessage, IncomingMessageData, OutgoingMessageData } from '~/modules/components/chat/index.types'

export interface ContextValue {
  state: {
    messages: ChatMessage[]
  }
  actions: {
    addIncoming?: (message: IncomingMessageData) => void
    addOutgoing?: (message: OutgoingMessageData) => void
    remove?: (index: number) => void
    updateIncoming?: (index: number, data: IncomingMessageData) => void
    updateOutgoing?: (index: number, data: OutgoingMessageData) => void
  }
  meta: {
    avatarSrc?: string
    chattingWithViewId: string
    conversationId: string
    uid: string
  }
}

export const initialState: ContextValue['state'] = {
  messages: [],
}

const Context = createContext<ContextValue>({
  state: initialState,
  actions: {},
  meta: {
    chattingWithViewId: '',
    conversationId: '',
    uid: '',
  },
})

export function useChatContext() {
  return React.useContext(Context)
}

export function Provider({ actions, state, children, meta }: PropsWithChildren<ContextValue>) {
  return (
    <Context.Provider
      value={{
        state,
        actions,
        meta,
      }}
    >
      {children}
    </Context.Provider>
  )
}
