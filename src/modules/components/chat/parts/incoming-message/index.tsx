import { PropsWithChildren } from 'react'
import { View, ViewProps } from 'react-native'
import Animated, { FadeInLeft } from 'react-native-reanimated'
import { Typography } from '~/modules/ui/typography'
import { cn } from '~/utils/cn'

export { DislikeButton } from './parts/dislike-button'
export { LikeButton } from './parts/like-button'
export { EditButton } from './parts/edit-button'
export { CommonActions } from './parts/common-actions'
export { AudioButton } from './parts/audio-button'
export { AnimatedText } from './parts/animated-text'

export function Container({ children, className }: ViewProps) {
  return <View className={cn('gap-3', className)}>{children}</View>
}

export function Text({ text }: { text: string }) {
  return (
    <Animated.View entering={FadeInLeft}>
      <Typography level="body-1">{text}</Typography>
    </Animated.View>
  )
}

export function HeaderContainer({ children }: PropsWithChildren) {
  return <View className="flex flex-row gap-2">{children}</View>
}
