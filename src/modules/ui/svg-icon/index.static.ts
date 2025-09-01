import { Chat } from './svg/chat'
import { Interview } from './svg/interview'
import { Journal } from './svg/journal'
import { Plus } from './svg/plus'
import { Question } from './svg/question'
import { Reload } from './svg/reload'

export const iconNameToSvg = {
  reload: Reload,
  interview: Interview,
  journal: Journal,
  chat: Chat,
  question: Question,
  plus: Plus,
} as const
