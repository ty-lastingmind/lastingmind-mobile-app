import { View } from 'react-native'
import React from 'react'
import { SvgIconName } from '~/modules/ui/svg-icon/index.types'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { Typography } from '~/modules/ui/typography'

export type ListType = { title: string; description: string; icon: SvgIconName }[]

interface InfoListProps {
  list: ListType
}

export default function InfoList({ list }: InfoListProps) {
  return (
    <>
      {list.map((step, index) => (
        <View key={index} className="flex-row items-center">
          <SvgIcon name={step.icon as SvgIconName} size="4xl" color="accent" />
          <View className="pl-2 pr-12">
            <Typography brand weight="bold" level="h4">
              {step.title}
            </Typography>
            <Typography color="secondary">{step.description}</Typography>
          </View>
        </View>
      ))}
    </>
  )
}
