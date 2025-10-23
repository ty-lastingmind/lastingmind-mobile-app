import { useRouter } from 'expo-router'
import { useCallback, useMemo } from 'react'
import { View } from 'react-native'
import { Avatar } from '~/modules/ui/avatar'
import { Button } from '~/modules/ui/button'
import { CircularProgress } from '~/modules/ui/circular-progress'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { Typography } from '~/modules/ui/typography'
import { SentQuestionData, TopContainer, UIActiveInivteItem } from '~/services/api/model'
import { bannerConfigToData, FALLBACK_BANNER_CONFIG } from '../../constants/banner-config'
import { isTopContainerDataAnyOf, isUIActiveInviteItem, isSenderUIActiveInvite } from '../../utils/banner-safe-guards'

interface BannerProps {
  topContainer: TopContainer | null
  progressPercent: number
}

export const Banner = ({ topContainer, progressPercent }: BannerProps) => {
  const router = useRouter()
  const config = useMemo(() => {
    const containerType = topContainer?.top_container
    return containerType ? bannerConfigToData[containerType] : FALLBACK_BANNER_CONFIG
  }, [topContainer?.top_container])

  const sender = useMemo((): UIActiveInivteItem | SentQuestionData | null => {
    if (!topContainer?.top_container_data) return null

    if (isTopContainerDataAnyOf(topContainer?.top_container_data)) {
      const data = Object.values(topContainer?.top_container_data ?? {})
      return data[0] as SentQuestionData
    }

    if (isUIActiveInviteItem(topContainer.top_container_data)) {
      return topContainer?.top_container_data as UIActiveInivteItem
    }

    return null
  }, [topContainer?.top_container_data])

  const bannerText = useMemo(() => {
    if (!config) return ''

    const percent = progressPercent ?? 0

    if (config.icon === 'progress') {
      return config.text(percent)
    } else if (config.icon === 'avatar') {
      const senderName = isSenderUIActiveInvite(sender) ? sender.sender_full_name : sender?.who_sent
      return senderName ? config.text(senderName) : ''
    } else {
      return config.text
    }
  }, [config, progressPercent, sender])

  const iconComponents = useMemo(() => {
    const profileImage = isSenderUIActiveInvite(sender) ? sender.profile_image : undefined
    return {
      progress: <CircularProgress value={progressPercent} />,
      todo_list: <SvgIcon name="todo_list" size="4xl" color="white" />,
      avatar: <Avatar source={profileImage ? { uri: profileImage } : undefined} size="md" />,
      chat_bubble_outline: <SvgIcon name="chat_bubble_outline" size="4xl" color="white" />,
      audience: <SvgIcon name="audience" size="4xl" color="white" />,
      interview_table: <SvgIcon name="interview_table" size="4xl" color="white" />,
      journal: <SvgIcon name="journal" size="4xl" color="white" />,
      curated_questions: <SvgIcon name="curated_questions" size="4xl" color="white" />,
      question: <SvgIcon name="question" size="4xl" color="white" />,
    }
  }, [progressPercent, sender])

  const handleContinuePress = useCallback(() => {
    const route = config?.route

    if (!route) {
      return
    }

    if (typeof route === 'function') {
      const viewId = !isSenderUIActiveInvite(sender) ? (sender?.who_sent_viewingId ?? '') : ''
      router.navigate(route(viewId))
      return
    }

    router.navigate(route)
  }, [config?.route, router, sender])

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
            ? config.buttonText(!isSenderUIActiveInvite(sender) ? (sender?.who_sent ?? '') : '')
            : config?.buttonText}
        </Button>
      </View>
    </View>
  )
}
