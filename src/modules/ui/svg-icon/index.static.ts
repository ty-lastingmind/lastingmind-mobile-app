import { Chat } from './svg/chat'
import { Interview } from './svg/interview'
import { Journal } from './svg/journal'
import { Reload } from './svg/reload'
import { Explanation } from './svg/explanation'
import { Expand } from './svg/expand'
import { Question } from './svg/question'
import { Plus } from './svg/plus'
import { CuratedQuestions } from './svg/curated-questions'
import { Mic } from './svg/mic'
import { WriteAnswer } from './svg/write-answer'

export const iconNameToSvg = {
  reload: Reload,
  interview: Interview,
  journal: Journal,
  chat: Chat,
  explanation: Explanation,
  expand: Expand,
  question: Question,
  plus: Plus,
  curated_questions: CuratedQuestions,
  mic: Mic,
  write_answer: WriteAnswer,
} as const
