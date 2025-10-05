import React, { createContext, PropsWithChildren } from 'react'
import { ChatMessage } from '~/modules/components/chat/index.types'

export interface ContextValue {
  state: {
    messages: ChatMessage[]
  }
  actions: {
    add?: (message: ChatMessage) => void
    remove?: (index: number) => void
    update?: (index: number, message: Omit<Partial<ChatMessage>, 'index'>) => void
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
