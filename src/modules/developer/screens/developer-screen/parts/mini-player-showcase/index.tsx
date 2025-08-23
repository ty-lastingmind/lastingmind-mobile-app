import React from 'react'
import { View } from 'react-native'
import { Container } from '~/modules/components/chat/messages-list/parts/outgoing-message/parts/container'
import { MiniAudioPlayer } from '~/modules/components/chat/messages-list/parts/outgoing-message/parts/mini-audio-player'
import { Typography } from '~/modules/ui/typography'

export function MiniPlayerShowcase() {
  return (
    <View className="flex gap-4">
      <Typography level="h2">Mini player</Typography>
      <Container>
        <MiniAudioPlayer audioSrc="https://firebasestorage.googleapis.com/v0/b/decisive-talon-457821-g4.firebasestorage.app/o/users%2FTESTUSERID%2Finterview-recordings%2Faudio-recording-2025-08-18T08-35-38-265Z.m4a?alt=media&token=9d14811d-6e2c-480d-99c7-906ce330ff14" />
      </Container>
    </View>
  )
}
