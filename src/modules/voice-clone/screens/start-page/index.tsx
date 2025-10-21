import { FlatList, View } from 'react-native'
import React from 'react'
import { Typography } from '~/modules/ui/typography'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { Button } from '~/modules/ui/button'
import { Link, Redirect } from 'expo-router'
import {
  usePullCloningProgressVoiceClonePullCloningProgressGet,
  usePullCloningStatusVoiceClonePullCloningStatusGet,
} from '~/services/api/generated'
import { Progress } from '~/modules/ui/progress'
import AudioCard from '../../parts/audio-card'

export function VoiceCloneStartPage() {
  const { data } = usePullCloningStatusVoiceClonePullCloningStatusGet()
  const progress = usePullCloningProgressVoiceClonePullCloningProgressGet()

  if (data?.status === 'complete') {
    return <Redirect href="/(protected)/voice-clone/clone-test" />
  }

  if (data?.status === 'not_started') {
    return (
      <View className="p-10 flex-1">
        <View className="gap-4">
          <Typography brand level="h3">
            Clone Your Voice
          </Typography>
          <Typography color="secondary">Create a natural-sounding voice model that sounds just like you</Typography>
        </View>
        <View className="items-center justify-center flex-1 mb-12">
          <SvgIcon name="mic_test" size="logo" color="accent" />
        </View>
        <Link asChild href="/(protected)/voice-clone/how-it-works">
          <Button>Continue</Button>
        </Link>
      </View>
    )
  }

  if (!progress.isPending && data?.status === 'still_recording') {
    return (
      <View className="p-10 flex-1 gap-2">
        <View className="gap-4">
          <Typography brand level="h3">
            Keep it up! Your clone will be active soon.
          </Typography>
        </View>
        <View className="gap-4 pb-4">
          <Typography brand color="accent">
            Progress
          </Typography>
          <View className="flex-row gap-4 bg-bg-secondary p-4 rounded-full items-center">
            <Typography brand>{progress.data?.progress.duration} / 30 mins</Typography>
            <Progress value={Math.min(((progress.data?.progress.duration || 0) / 30) * 100, 100)} color="accent" />
          </View>
          <Typography brand color="accent">
            Questions answered this round
          </Typography>
        </View>
        <FlatList
          data={progress.data?.progress.questions_answered || []}
          keyExtractor={(_, index) => `question-${index}`}
          contentContainerClassName="gap-4"
          renderItem={({ item, index }) => <AudioCard item={item} key={index} />}
        />
        <Link asChild href="/(protected)/voice-clone/mic-setup">
          <Button>Continue</Button>
        </Link>
      </View>
    )
  }

  if (data?.status === 'building_backend') {
    return (
      <View className="p-10 flex-1">
        <View className="gap-4">
          <Typography brand level="h3">
            Your Voice Clone is in Progress
          </Typography>
          <Typography color="secondary">We will notify you when it is ready</Typography>
        </View>
        <View className="items-center justify-center flex-1 mb-12">
          <SvgIcon name="mic_test" size="logo" color="accent" />
        </View>
      </View>
    )
  }

  return (
    <View className="flex-1 items-center justify-center">
      <Typography>Loading...</Typography>
    </View>
  )
}
