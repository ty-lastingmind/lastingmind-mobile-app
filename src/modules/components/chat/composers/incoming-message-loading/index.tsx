import { ActivityIndicator } from 'react-native'
import { Avatar } from '~/modules/ui/avatar'
import { IncomingMessage as C } from '../..'
import { useChatContext } from '../../parts/container/parts/provider'

export function IncomingMessageLoading() {
  const { meta } = useChatContext()

  return (
    <C.Container>
      <C.HeaderContainer>
        <Avatar source={meta?.avatarSrc} />
        <ActivityIndicator />
      </C.HeaderContainer>
      <C.Text text="Loading..." />
    </C.Container>
  )
}
