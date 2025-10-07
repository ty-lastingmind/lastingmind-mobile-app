import zod from 'zod'
import { messageSchema } from './index.validation'

export type MessageSchema = zod.infer<typeof messageSchema>

export interface UseChatWsConnectionProps {
  onMessage: (message: MessageSchema) => void
  onConnected: () => void
}
