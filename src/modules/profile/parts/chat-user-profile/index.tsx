import { FlatList, View } from 'react-native'
import { Avatar } from '~/modules/ui/avatar'
import { Typography } from '~/modules/ui/typography'
import {
  usePullCanChatWithChatPullCanChatWithGet,
  usePullSentQuestionsChatOnlyUserPullSentQuestionsGet,
  usePullUserInfoHomePullUserInfoGet,
} from '~/services/api/generated'
import { DeveloperProfileScreen } from '../../developer-profile-screen'

export default function ChatUserProfile() {
  const { data: userInfo, isLoading: isLoadingUserInfo } = usePullUserInfoHomePullUserInfoGet()
  const { data: canChatWith, isLoading: isLoadingCanChatWith } = usePullCanChatWithChatPullCanChatWithGet()
  const { data: sentQuestions, isLoading: isLoadingSentQuestions } =
    usePullSentQuestionsChatOnlyUserPullSentQuestionsGet()

  if (isLoadingUserInfo || isLoadingCanChatWith || isLoadingSentQuestions) {
    return null
  }

  return (
    <View className="py-safe flex px-8 gap-4">
      <FlatList
        data={sentQuestions?.sent_questions}
        ListHeaderComponent={() => (
          <View className="gap-6">
            <View className="items-center justify-center gap-4">
              <Typography brand level="h3" className="text-center">
                {userInfo?.full_user_name}
              </Typography>
              <Avatar source={userInfo?.profile_image} size="lg" />
            </View>
            <View className="gap-4">
              <Typography level="h5" weight="bold">
                Your Narrators
              </Typography>
              <FlatList
                data={canChatWith?.can_chat_with}
                renderItem={({ item }) => (
                  <View className="items-center gap-2">
                    <Avatar source={item.chattingWithImage} size="md" />
                    <Typography brand level="body-1">
                      {item.chattingWithName}
                    </Typography>
                  </View>
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="items-start gap-4"
                keyExtractor={(item) => item.chattingWithViewId}
              />
            </View>
            <Typography level="h5" weight="bold">
              Your Sent Questions
            </Typography>
          </View>
        )}
        ListFooterComponent={() => __DEV__ && <DeveloperProfileScreen />}
        renderItem={({ item }) => (
          <View className="gap-2 bg-bg-secondary p-4 rounded-2xl w-full h-[80px]">
            <Typography level="body-1">{item.question}</Typography>
            <Typography level="body-2" color="secondary">
              {item.when_sent} • {item.narrator_name}
            </Typography>
          </View>
        )}
        contentContainerClassName="gap-4"
        keyExtractor={(item, index) => `${item.question}-${index}`}
      />
    </View>
  )
}
