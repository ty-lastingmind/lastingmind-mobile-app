import zod from 'zod'
import { alignmentSchema, wsMessageSchema } from './index.validation'

export type WsMessage = zod.infer<typeof wsMessageSchema>
export type MessageAlignment = zod.infer<typeof alignmentSchema>

export interface ChatMessageBaseData {
  text: string
  audioSrc?: string
}

interface ChatBaseData {
  index: number
}

export type ChatMessageType = 'incoming' | 'outgoing'
export type IncomingMessageType = Extract<ChatMessageType, 'incoming'>
export type OutgoingMessageType = Extract<ChatMessageType, 'outgoing'>

export type ChatMessage = IncomingChatMessage | OutgoingChatMessage

export interface IncomingMessageDataItem extends ChatMessageBaseData {
  alignment?: MessageAlignment
}

export type IncomingMessageData = IncomingMessageDataItem[]

export interface IncomingChatMessage extends ChatBaseData {
  type: IncomingMessageType
  data: IncomingMessageData
}

export type OutgoingMessageData = ChatMessageBaseData

export interface OutgoingChatMessage extends ChatBaseData {
  type: OutgoingMessageType
  data: OutgoingMessageData
}
