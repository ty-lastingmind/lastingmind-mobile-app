import Advanced_Trophy from './assets/Advanced_Trophy.json'
import Basic_Trophy from './assets/Basic_Trophy.json'
import Check_Mark from './assets/Check_Mark.json'
import Check_Mark_2 from './assets/Check_Mark_2.json'
import Expert_Trophy from './assets/Expert_Trophy.json'
import increase from './assets/increase.json'
import Intermediate_Trophy from './assets/Intermediate_Trophy.json'
import LM1_Trophy from './assets/LM1_Trophy.json'
import Rocket_Ship from './assets/Rocket_Ship.json'
import Thumbs_Up from './assets/Thumbs_Up.json'
import Writing_Lotti from './assets/Writing_Lotti.json'

export const animations = {
  advancedTrophy: Advanced_Trophy,
  basicTrophy: Basic_Trophy,
  checkMark: Check_Mark,
  checkMark2: Check_Mark_2,
  expertTrophy: Expert_Trophy,
  increase: increase,
  intermediateTrophy: Intermediate_Trophy,
  lm1Trophy: LM1_Trophy,
  rocketShip: Rocket_Ship,
  thumbsUp: Thumbs_Up,
  writingLotti: Writing_Lotti,
}

export type Animation = keyof typeof animations

export const levelToData: Record<string, { title: string; animation: Animation }> = {
  Basic: {
    title: 'You reached the Basic Level!',
    animation: 'basicTrophy',
  },
  Intermediate: {
    title: 'You reached the Intermediate Level!',
    animation: 'intermediateTrophy',
  },
  Advanced: {
    title: 'You reached the Advanced Level!',
    animation: 'expertTrophy',
  },
  Expert: {
    title: 'You reached the Expert Level!',
    animation: 'expertTrophy',
  },
  LM1: {
    title: 'You reached the Level 1 Milestone!',
    animation: 'lm1Trophy',
  },
}

export const milestoneToData: Record<
  string,
  { title: string; caption: (milestone: number) => string; animation: Animation }
> = {
  milestone_1: {
    title: 'Congrats!',
    caption: (milestone) => `You hit ${milestone} journal entries!`,
    animation: 'checkMark',
  },
  milestone_2: {
    title: 'You Did It!',
    caption: (milestone) => `You’ve submitted ${milestone} entries!`,
    animation: 'checkMark2',
  },
  milestone_3: {
    title: 'You’re Killing It!',
    caption: (milestone) => `You reached ${milestone} entries!`,
    animation: 'rocketShip',
  },
}

export const percentIncreaseToData: Record<string, { title: string; animation: Animation }> = {
  percent_increase_1: {
    title: 'Great Job',
    animation: 'thumbsUp',
  },
  percent_increase_2: {
    title: 'Keep Going',
    animation: 'increase',
  },
  percent_increase_3: {
    title: 'Keep Going',
    animation: 'writingLotti',
  },
}

export const exampleChatToData: Record<string, { title: string }> = {
  example_chat_1: {
    title: 'Great Work!',
  },
  example_chat_2: {
    title: 'Response Saved',
  },
  example_chat_3: {
    title: 'Great Response!',
  },
}
