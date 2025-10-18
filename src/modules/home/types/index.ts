import { Href } from 'expo-router'

export type BannerIconType =
  | 'progress'
  | 'todo_list'
  | 'avatar'
  | 'chat_bubble_outline'
  | 'audience'
  | 'interview_table'
  | 'journal'
  | 'curated_questions'
  | 'question'

export interface ProgressBannerConfig {
  icon: 'progress'
  text: (percent: number) => string
  buttonText: string
  route?: Href
}

export interface SenderBannerConfig {
  icon: 'avatar'
  text: (senderName: string) => string
  buttonText: (senderName: string) => string
  route?: (chattingWithViewId: string) => Href
}

export interface SimpleBannerConfig {
  icon: Exclude<BannerIconType, 'progress' | 'avatar'>
  text: string
  buttonText: string
  route?: Href
}

export type BannerConfig = ProgressBannerConfig | SenderBannerConfig | SimpleBannerConfig
