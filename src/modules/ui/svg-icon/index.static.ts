import { Reload } from '~/modules/ui/svg-icon/svg/reload'
import { Interview } from '~/modules/ui/svg-icon/svg/interview'
import { Journal } from '~/modules/ui/svg-icon/svg/journal'
import { Chat } from '~/modules/ui/svg-icon/svg/chat'
import { Apple } from '~/modules/ui/svg-icon/svg/apple'
import { Google } from '~/modules/ui/svg-icon/svg/google'
import { Shield } from './svg/shield'
import { Close } from './svg/close'
import { Explanation } from './svg/explanation'
import { Expand } from './svg/expand'
import { Question } from './svg/question'
import { Plus } from './svg/plus'
import { Add } from './svg/add'
import { Edit } from './svg/edit'
import { Family } from './svg/family'
import { Work } from './svg/work'
import { Education } from './svg/education'
import { Home } from './svg/home'
import { CuratedQuestions } from './svg/curated-questions'
import { Mic } from './svg/mic'
import { WriteAnswer } from './svg/write-answer'

export const iconNameToSvg = {
  reload: Reload,
  interview: Interview,
  journal: Journal,
  chat: Chat,
  apple: Apple,
  google: Google,
  shield: Shield,
  close: Close,
  explanation: Explanation,
  expand: Expand,
  question: Question,
  plus: Plus,
  add: Add,
  edit: Edit,
  family: Family,
  work: Work,
  education: Education,
  home: Home,
  curated_questions: CuratedQuestions,
  mic: Mic,
  write_answer: WriteAnswer,
} as const
