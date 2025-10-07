import { ActivityIndicator } from 'react-native'
import { OutgoingMessage as C } from '../..'

export function OutgoingMessageLoading() {
  return (
    <C.RightAlignedContainer>
      <C.Container>
        <ActivityIndicator size={24} />
      </C.Container>
    </C.RightAlignedContainer>
  )
}
