import { TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { Typography } from '~/modules/ui/typography'
import { SvgIconName } from '~/modules/ui/svg-icon/index.types'
import { cn } from '~/utils/cn'

interface InfoCardProps extends React.ComponentProps<typeof View> {
  title: string
  subtitle: string
  iconName: SvgIconName
}

export default function InfoCard({ title, subtitle, iconName, className }: InfoCardProps) {
  const containerClassName = cn(`flex-row items-center gap-4 bg-bg-secondary p-4 rounded-xl`, className)

  return (
    <TouchableOpacity className={containerClassName}>
      <SvgIcon name={iconName} size="lg" color="accent" />
      <View className="flex-1">
        <Typography brand color="accent" level="h5">
          {title}
        </Typography>
        <Typography level="caption-1" color="secondary">
          {subtitle}
        </Typography>
      </View>
    </TouchableOpacity>
  )
}
