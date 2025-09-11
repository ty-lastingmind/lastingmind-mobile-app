import { View } from 'react-native'
import React, { useEffect } from 'react'
import { Typography } from '~/modules/ui/typography'
import { useBoolean } from 'usehooks-ts'
import Animated, { FadeIn } from 'react-native-reanimated'

interface TransitionProps {
  title: string
  subtitle: string
  children: React.ReactNode
}

function TransitionView({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <View className="gap-8 px-8 pt-[50%] flex flex-1">
      <Typography brand level="h1" color="accent" className="text-center">
        {title}
      </Typography>
      <Typography brand level="h6" className="text-center">
        {subtitle}
      </Typography>
    </View>
  )
}

export default function Transition({ title, subtitle, children }: TransitionProps) {
  const { value: showChildren, setTrue: setShowChildren } = useBoolean(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowChildren()
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <View className="flex-1">
      {!showChildren ? (
        <TransitionView title={title} subtitle={subtitle} />
      ) : (
        <Animated.View entering={FadeIn} className="flex-1">
          {children}
        </Animated.View>
      )}
    </View>
  )
}
