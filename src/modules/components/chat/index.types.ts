export interface ChatMessage {
  index: number
  text: string
  isIncoming: boolean
  audioUrl?: string
  audioSources?: string[]
}
