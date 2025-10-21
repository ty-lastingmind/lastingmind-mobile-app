import { ScrollView } from 'react-native'
import { useGetUserTypeUtilsPullUserTypeGet } from '~/services/api/generated'
import { DeveloperProfileScreen } from '../../developer-profile-screen'
import ChatUserProfile from '../../parts/chat-user-profile'
import UserAudience from '../../parts/user-audience'
import UserDiscussedTopics from '../../parts/user-discussed-topics'
import UserInfo from '../../parts/user-info'
import UserPersonalInfo from '../../parts/user-personal-info'
import UserSuggestedTopics from '../../parts/user-suggested-topics'

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
