import { useFocusEffect } from 'expo-router'
import { useCallback, useRef } from 'react'

export function useStartConversation(handleSendMessage: () => void) {
  const conversationStaredRef = useRef(false)

  const handleSendFirstMessage = useCallback(() => {
    if (conversationStaredRef.current) return

    handleSendMessage()

    conversationStaredRef.current = true
  }, [])

  useFocusEffect(handleSendFirstMessage)
}
