import { Apple } from '~/modules/ui/svg-icon/svg/apple'
import { Chat } from '~/modules/ui/svg-icon/svg/chat'
import { Google } from '~/modules/ui/svg-icon/svg/google'
import { Interview } from '~/modules/ui/svg-icon/svg/interview'
import { Journal } from '~/modules/ui/svg-icon/svg/journal'
import { Reload } from '~/modules/ui/svg-icon/svg/reload'
import { Add } from './svg/add'
import { AddPeople } from './svg/add_people'
import { ArrowRight } from './svg/arrow-right'
import { Audience } from './svg/audience'
import { AudioWave } from './svg/audio-wave'
import { Calendar } from './svg/calendar'
import { ChatBubble } from './svg/chat-bubble'
import { ChatBubbleOutline } from './svg/chat-bubble-outline'
import { ChatText } from './svg/chat-text'
import { ChatBubbles } from './svg/chatbubbles'
import { CheckMark } from './svg/check-mark'
import { Close } from './svg/close'
import { CuratedQuestions } from './svg/curated-questions'
import { Edit } from './svg/edit'
import { EditBox } from './svg/editbox'
import { Education } from './svg/education'
import { EducationOutline } from './svg/education-outline'
import { Envelope } from './svg/envelope'
import { Expand } from './svg/expand'
import { Explanation } from './svg/explanation'
import { Family } from './svg/family'
import { Home } from './svg/home'
import { HomeOutline } from './svg/home-outline'
import { InterviewTable } from './svg/interview-table'
import { Mic } from './svg/mic'
import { MicFilled } from './svg/mic-filled'
import { Noteblock } from './svg/noteblock'
import { Pause } from './svg/pause'
import { People } from './svg/people'
import { Person } from './svg/person'
import { Play } from './svg/play'
import { Plus } from './svg/plus'
import { Question } from './svg/question'
import { Refresh } from './svg/refresh'
import { Send } from './svg/send'
import { Settings } from './svg/settings'
import { MicTest } from './svg/mic-test'
import { Headphones } from './svg/headphones'
import { Playback } from './svg/playback'
import { PersonSpeaking } from './svg/person-speaking'
import { MicSpeaking } from './svg/mic-speaking'
import { Listening } from './svg/listening'
import { Speaking } from './svg/speaking'
import { Relax } from './svg/relax'
import { Rewind } from './svg/rewind'
import { Shield } from './svg/shield'
import { Sparks } from './svg/sparks'
import { Stop } from './svg/stop'
import { Time } from './svg/time'
import { TodoList } from './svg/todo-list'
import { Trash } from './svg/trash'
import { Trophy } from './svg/trophy'
import { TrophyFilled } from './svg/trophy-filled'
import { Upload } from './svg/upload'
import { ViewMore } from './svg/view-more'
import { Work } from './svg/work'
import { WorkOutline } from './svg/work-outline'
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
  trophy: Trophy,
  chatbubbles: ChatBubbles,
  time: Time,
  noteblock: Noteblock,
  editbox: EditBox,
  sparks: Sparks,
  person: Person,
  calendar: Calendar,
  'home-outline': HomeOutline,
  'education-outline': EducationOutline,
  'work-outline': WorkOutline,
  curated_questions: CuratedQuestions,
  mic: Mic,
  write_answer: WriteAnswer,
  stop: Stop,
  pause: Pause,
  check_mark: CheckMark,
  refresh: Refresh,
  play: Play,
  arrow_right: ArrowRight,
  audio_wave: AudioWave,
  trash: Trash,
  todo_list: TodoList,
  chat_bubbles: ChatBubbles,
  audience: Audience,
  interview_table: InterviewTable,
  mic_filled: MicFilled,
  chat_text: ChatText,
  chat_bubble_outline: ChatBubbleOutline,
  trophy_filled: TrophyFilled,
  chat_bubble: ChatBubble,
  view_more: ViewMore,
  upload: Upload,
  people: People,
  add_people: AddPeople,
  settings: Settings,
  mic_test: MicTest,
  headphones: Headphones,
  person_speaking: PersonSpeaking,
  playback: Playback,
  mic_speaking: MicSpeaking,
  listening: Listening,
  speaking: Speaking,
  relax: Relax,
  rewind: Rewind,
  send: Send,
  envelope: Envelope,
} as const
