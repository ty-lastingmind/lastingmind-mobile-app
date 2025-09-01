import { Chat } from './svg/chat'
import { Interview } from './svg/interview'
import { Journal } from './svg/journal'
import { Reload } from './svg/reload'
import { Explanation } from './svg/explanation'
import { Expand } from './svg/expand'
import { Question } from './svg/question'
import { Plus } from './svg/plus'

export const iconNameToSvg = {
  reload: Reload,
  interview: Interview,
  journal: Journal,
  chat: Chat,
  explanation: Explanation,
  expand: Expand,
  question: Question,
  plus: Plus,
} as const
