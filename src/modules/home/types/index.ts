export type BannerIconType =
  | 'progress'
  | 'todo_list'
  | 'avatar'
  | 'chat_bubbles'
  | 'audience'
  | 'interview_table'
  | 'journal'

export interface ProgressBannerConfig {
  icon: 'progress'
  text: (percent: number) => string
}

export interface SenderBannerConfig {
  icon: 'avatar'
  text: (senderName: string) => string
}

export interface SimpleBannerConfig {
  icon: Exclude<BannerIconType, 'progress' | 'avatar'>
  text: string
}

export type BannerConfig = ProgressBannerConfig | SenderBannerConfig | SimpleBannerConfig
