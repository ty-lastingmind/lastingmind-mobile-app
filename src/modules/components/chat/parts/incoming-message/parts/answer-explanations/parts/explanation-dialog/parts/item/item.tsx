import { ScrollView, useWindowDimensions, View } from 'react-native'
import { useChatContext } from '~/modules/components/chat/parts/container/parts/provider'
import { Player } from '~/modules/components/chat/parts/incoming-message/parts/answer-explanations/parts/explanation-dialog/parts/item/parts/player'
import { Typography } from '~/modules/ui/typography'
import { usePullQuestionInfoChatPullQuestionInfoGet } from '~/services/api/generated'
import { ExplanationItem } from '~/services/api/model'
import { formatDate } from '~/utils/date'

interface ItemProps {
  item: ExplanationItem
}

export function Item({ item }: ItemProps) {
  const { width } = useWindowDimensions()
  const {
    meta: { chattingWithViewId },
  } = useChatContext()
  const explanationDetail = usePullQuestionInfoChatPullQuestionInfoGet({
    chattingWithViewId,
    responseId: `${item.question_info?.questionId}`,
  })
  const firstAudio = explanationDetail.data?.question_details.audio_files?.at(0)

  return (
    <View
      className="gap-2 pt-8 px-4"
      style={{
        width: width - 32,
      }}
    >
      <Typography brand level="h5" color="accent">
        {item.headline}
      </Typography>
      <ScrollView contentContainerClassName="pb-2" showsVerticalScrollIndicator={false} className="gap-4">
        <View className="gap-4 flex-1">
          {item.question_info && (
            <Typography color="secondary" level="label-1">
              {formatDate(item.question_info.submitted_at)}
            </Typography>
          )}
          <View className="gap-1">
            <Typography color="secondary" weight="bold" level="caption-1">
              Question
            </Typography>
            <Typography>{explanationDetail.data?.question_details.question_title}</Typography>
          </View>
          <View className="gap-1">
            <Typography color="secondary" weight="bold" level="caption-1">
              Answer
            </Typography>
            <Typography>{explanationDetail.data?.question_details.response}</Typography>
          </View>
        </View>
      </ScrollView>
      {firstAudio && <Player audioUrl={firstAudio} />}
    </View>
  )
}
