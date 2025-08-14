import { useMemo } from 'react'
import { View } from 'react-native'
import Animated, { FadeIn } from 'react-native-reanimated'
import { Typography, TypographyProps } from '~/modules/ui/typography'

interface TypographyTypingProps extends TypographyProps {
  children: string
}

export function TypographyTyping({ children, ...typographyProps }: TypographyTypingProps) {
  const parts = useMemo(() => {
    return children.split(' ')
  }, [children])

  return (
    <View className="gap-2">
      <Typography {...typographyProps}>
        {parts.map((part, index) => (
          <Animated.View entering={FadeIn.delay(index * 50)} key={index}>
            <Typography {...typographyProps}>{part} </Typography>
          </Animated.View>
        ))}
      </Typography>
    </View>
  )
}
