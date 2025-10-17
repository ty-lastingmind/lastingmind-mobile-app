import { useCallback, useMemo } from 'react'
import { View } from 'react-native'
import { Button } from '~/modules/ui/button'
import { CircularProgress } from '~/modules/ui/circular-progress'
import { Typography } from '~/modules/ui/typography'
import { SentInvitationData, TopContainer } from '~/services/api/model'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { Avatar } from '~/modules/ui/avatar'
import { bannerConfigToData } from '../../constants/banner-config'
import { useRouter } from 'expo-router'

interface BannerProps {
  topContainer: TopContainer | null
  progressPercent: number
}

export const Banner = ({ topContainer, progressPercent }: BannerProps) => {
  const router = useRouter()
  const config = useMemo(() => {
    const containerType = topContainer?.top_container
    return containerType ? bannerConfigToData[containerType] : null
  }, [topContainer?.top_container])

  const sender = useMemo(() => {
    if (config?.icon === 'avatar' && topContainer?.top_container_data) {
      return topContainer.top_container_data as unknown as SentInvitationData
    }
    return null
  }, [config?.icon, topContainer?.top_container_data])

  const bannerText = useMemo(() => {
    if (!config) return ''

    const percent = progressPercent ?? 0
    const senderName = sender?.who_sent_name

    if (config.icon === 'progress') {
      return config.text(percent)
    } else if (config.icon === 'avatar') {
      return senderName ? config.text(senderName) : ''
    } else {
      return config.text
    }
  }, [config, progressPercent, sender?.who_sent_name])

  const iconComponents = useMemo(() => {
    return {
      progress: <CircularProgress value={progressPercent} />,
      todo_list: <SvgIcon name="todo_list" size="4xl" color="white" />,
      avatar: <Avatar source={sender?.profile_image} size="md" />,
      chat_bubble_outline: <SvgIcon name="chat_bubble_outline" size="4xl" color="white" />,
      audience: <SvgIcon name="audience" size="4xl" color="white" />,
      interview_table: <SvgIcon name="interview_table" size="4xl" color="white" />,
      journal: <SvgIcon name="journal" size="4xl" color="white" />,
    }
  }, [progressPercent, sender?.profile_image])

  const handleContinuePress = useCallback(() => {
    const route = config?.route

    if (!route) {
      return
    }

    router.navigate(route)
  }, [config?.route, router])

  return (
    <View className="bg-fill-accent rounded-md p-4 pt-8 gap-8">
      <View className="flex flex-row items-center gap-4 overflow-hidden">
        {config && iconComponents[config.icon]}

        <Typography level="body-lg" weight="bold" className="flex-1" color="white">
          {bannerText}
        </Typography>
      </View>
      <View>
        <Button variant="white" size="lg" onPress={handleContinuePress}>
          {typeof config?.buttonText === 'function'
            ? config.buttonText(sender?.who_sent_name ?? '')
            : config?.buttonText}
        </Button>
      </View>
    </View>
  )
}
