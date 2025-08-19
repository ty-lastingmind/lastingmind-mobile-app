import { useFocusEffect, useRouter } from 'expo-router'
import { useCallback } from 'react'
import { TitleAndCaption } from '../../../title-and-caption'

interface SavedAnswerProps {
  title: string
  caption: string
}

export function SavedAnswer({ title, caption }: SavedAnswerProps) {
  const router = useRouter()

  useFocusEffect(
    useCallback(() => {
      const timeout = setTimeout(() => {
        router.replace('/questions/journal/add/01-select-topic')
      }, 3000)

      return () => {
        clearTimeout(timeout)
      }
    }, [])
  )

  return <TitleAndCaption title={title} caption={caption} />
}
