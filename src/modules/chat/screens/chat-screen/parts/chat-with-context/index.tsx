import { createContext, PropsWithChildren, useContext, useState } from 'react'

interface ChatWithContextValue {
  chattingWithViewUid: string | null
  setChattingWithViewUid: (viewId: string) => void
}

const ChatWithContext = createContext<ChatWithContextValue>({
  chattingWithViewUid: null,
  setChattingWithViewUid: () => {},
})

export const useChatWithContext = () => useContext(ChatWithContext)

export function ChatWithContextProvider({ children }: PropsWithChildren) {
  const [chattingWithViewId, setChattingWithViewId] = useState<string | null>(null)

  return (
    <ChatWithContext.Provider
      value={{ chattingWithViewUid: chattingWithViewId, setChattingWithViewUid: setChattingWithViewId }}
    >
      {children}
    </ChatWithContext.Provider>
  )
}
