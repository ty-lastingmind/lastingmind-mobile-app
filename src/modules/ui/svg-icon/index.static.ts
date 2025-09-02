import { Reload } from '~/modules/ui/svg-icon/svg/reload'
import { Interview } from '~/modules/ui/svg-icon/svg/interview'
import { Journal } from '~/modules/ui/svg-icon/svg/journal'
import { Chat } from '~/modules/ui/svg-icon/svg/chat'
import { Apple } from '~/modules/ui/svg-icon/svg/apple'
import { Google } from '~/modules/ui/svg-icon/svg/google'
import { Shield } from './svg/shield'
import { Close } from './svg/close'

export const iconNameToSvg = {
  reload: Reload,
  interview: Interview,
  journal: Journal,
  chat: Chat,
  apple: Apple,
  google: Google,
  shield: Shield,
  close: Close,
} as const
