import { useFocusEffect, useRouter } from 'expo-router'
import { useCallback } from 'react'
import { TitleAndCaption } from '../../../title-and-caption'

interface SavedAnswerProps {
  title: string
  caption: string
  shouldRedirect?: boolean
  onRedirect?: () => void
}

export function SavedAnswer({ title, caption, shouldRedirect, onRedirect }: SavedAnswerProps) {
  const router = useRouter()

  useFocusEffect(
    useCallback(() => {
      if (!shouldRedirect) {
        return
      }

      const timeout = setTimeout(() => {
        if (onRedirect) onRedirect()
        router.replace('/(protected)/(tabs)/home')
      }, 3000)

      return () => {
        clearTimeout(timeout)
      }
    }, [])
  )

  return <TitleAndCaption title={title} caption={caption} />
}
