import { ScrollView } from 'react-native-gesture-handler'
import UserInfo from '../../parts/user-info'
import UserAudience from '../../parts/user-audience'
import UserSuggestedTopics from '../../parts/user-suggested-topics'
import UserDiscussedTopics from '../../parts/user-discussed-topics'
import UserPersonalInfo from '../../parts/user-personal-info'
import ChatUserProfile from '../../parts/chat-user-profile'
import { DeveloperProfileScreen } from '../../developer-profile-screen'
import { useGetUserTypeUtilsPullUserTypeGet } from '~/services/api/generated'

export function ProfileScreen() {
  const { data: userType } = useGetUserTypeUtilsPullUserTypeGet()
  const isChatUser = userType?.user_type === 'chat_user'

  if (isChatUser) {
    return <ChatUserProfile />
  }

  return (
    <ScrollView contentContainerClassName="py-safe flex px-8 gap-4">
      <UserInfo />
      <UserAudience />
      <UserSuggestedTopics />
      <UserDiscussedTopics />
      <UserPersonalInfo />

      <DeveloperProfileScreen />
    </ScrollView>
  )
}
