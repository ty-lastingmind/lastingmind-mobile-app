import { useMemo } from 'react'

export function useConversationId() {
  return useMemo(() => Math.random().toString(), [])
}
