import { atom } from 'jotai'
import { AnswerFormData } from '~/modules/chat/screens/chat-screen/parts/answer-form-dialog/hooks/use-answer-form'
import { ChatMessage } from '~/modules/components/chat/hooks/use-messages'

export const editMessageAtom = atom<{
  question: ChatMessage
  answer: ChatMessage
} | null>(null)

export const confirmEditAnswerAtom = atom<AnswerFormData | null>(null)
