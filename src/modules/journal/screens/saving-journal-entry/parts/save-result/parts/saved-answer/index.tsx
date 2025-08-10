import { useFocusEffect, useRouter } from 'expo-router'
import { useCallback } from 'react'
import { TitleAndCaption } from '../../../title-and-caption'

export function SavedAnswer() {
  const router = useRouter()

  useFocusEffect(
    useCallback(() => {
      const timeout = setTimeout(() => {
        router.replace('/journal/01-select-topic')
      }, 3000)

      return () => {
        clearTimeout(timeout)
      }
    }, [])
  )

  return <TitleAndCaption title="Entry Saved!" caption={'Keep adding more responses to\nimprove your LastingMind!'} />
}
