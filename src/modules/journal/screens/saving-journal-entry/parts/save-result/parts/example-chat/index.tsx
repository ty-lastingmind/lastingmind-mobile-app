import React from 'react'
import { ScrollView, View } from 'react-native'
import { IncomingMessage } from '~/modules/components/chat/incoming-message'
import { OutgoingMessage } from '~/modules/components/chat/outgoing-message'
import { Button } from '~/modules/ui/button'
import { Typography } from '~/modules/ui/typography'
import { cn } from '~/utils/cn'

interface ExampleChatProps {
  title: string
  caption: string
  message: string
  answer: string
  overline?: string
  avatarUrl: string
  onPress: () => void
}

export function ExampleChat({ title, caption, overline, message, answer, avatarUrl, onPress }: ExampleChatProps) {
  return (
    <View className="px-6 flex-1 pb-safe gap-8">
      <View className="gap-4">
        <Typography className="text-center" brand level="h2">
          {title}
        </Typography>
        <Typography className="text-center" color="secondary" level="h5">
          {caption}
        </Typography>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="border border-miscellaneous-topic-stroke rounded-md flex-1"
        contentContainerClassName="p-4 gap-5"
      >
        <View className="flex flex-row justify-end">
          <OutgoingMessage message={message} />
        </View>
        <View>
          <IncomingMessage message={answer} avatarUrl={avatarUrl} />
        </View>
      </ScrollView>
      {overline && (
        <View>
          <Typography className="text-center" color="secondary" level="h5">
            {overline}
          </Typography>
        </View>
      )}
      <View className={cn('px-3 pb-3', overline ? '' : 'pt-[10%]')}>
        <Button onPress={onPress}>Continue</Button>
      </View>
    </View>
  )
}
