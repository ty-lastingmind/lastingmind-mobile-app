import { ChatMessage, IncomingChatMessage, OutgoingChatMessage } from '~/modules/components/chat/index.types'

export function mergeMessageTextData(message: IncomingChatMessage | undefined): string {
  return message?.data.map((data) => data.text ?? '').join('') ?? ''
}

export function isIncomingMessage(message: ChatMessage | null): message is IncomingChatMessage {
  return message?.type === 'incoming'
}

export function isOutgoingMessage(message?: ChatMessage | null): message is OutgoingChatMessage {
  return message?.type === 'outgoing'
}
