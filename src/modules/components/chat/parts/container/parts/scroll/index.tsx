import { PropsWithChildren, useRef } from 'react'
import { ScrollView, ScrollViewProps } from 'react-native'
import { cn } from '~/utils/cn'

export function Scroll({ children, contentContainerClassName, ...props }: PropsWithChildren<ScrollViewProps>) {
  const scrollRef = useRef<ScrollView>(null)

  function scrollToBottom() {
    setTimeout(() => {
      scrollRef.current?.scrollToEnd()
    }, 1000)
  }

  return (
    <ScrollView
      {...props}
      className="flex-1"
      ref={scrollRef}
      contentContainerClassName={cn('flex flex-col', contentContainerClassName)}
      showsVerticalScrollIndicator={false}
      onContentSizeChange={scrollToBottom}
    >
      {children}
    </ScrollView>
  )
}
