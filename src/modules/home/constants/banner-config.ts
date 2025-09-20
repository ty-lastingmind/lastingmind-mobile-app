import { TopContainerTopContainer } from '~/services/api/model'
import { BannerConfig } from '../types'

export const bannerConfigToData: Record<TopContainerTopContainer, BannerConfig> = {
  // Progress ring banners
  [TopContainerTopContainer.continue_questions_1]: {
    icon: 'progress',
    text: (percent) => `Pick up where you left off! You're already ${percent}% towards Platinum.`,
    buttonText: 'Continue',
    route: '/questions/curated-questions',
  },
  [TopContainerTopContainer.continue_questions_2]: {
    icon: 'progress',
    text: () => 'Keep going! Every response improves your LastingMind!',
    buttonText: 'Continue',
    route: '/questions/curated-questions',
  },
  [TopContainerTopContainer.continue_questions_3]: {
    icon: 'progress',
    text: (percent) => `You are ${percent}% complete with the Basic Level. Keep adding info!`,
    buttonText: 'Continue',
    route: '/questions/curated-questions',
  },
  [TopContainerTopContainer.continue_questions_4]: {
    icon: 'progress',
    text: () => 'Keep going! Every response improves your LastingMind!',
    buttonText: 'Continue',
    route: '/questions/curated-questions',
  },
  [TopContainerTopContainer.start_questions_1]: {
    icon: 'progress',
    text: () => 'Start building your LastingMind by answering Curated Questions!',
    buttonText: 'Continue',
    route: '/questions/curated-questions',
  },

  // Todo list banners
  [TopContainerTopContainer.start_survey_1]: {
    icon: 'todo_list',
    text: 'Get started by completing a quick survey on your basic personal information!',
    buttonText: 'Get Started',
  },
  [TopContainerTopContainer.continue_survey_1]: {
    icon: 'todo_list',
    text: "You're close to finishing your basic personal survey! Keep going!",
    buttonText: 'Continue',
  },

  // Avatar banners
  [TopContainerTopContainer.sent_question_1]: {
    icon: 'avatar',
    text: (senderName) => `${senderName} sent you a question! Go answer it now!`,
    buttonText: () => 'Answer',
  },
  [TopContainerTopContainer.sent_invite_1]: {
    icon: 'avatar',
    text: (senderName) => `${senderName} has invited you to join her audience! Try chatting with ${senderName}!`,
    buttonText: (senderName) => `Chat with ${senderName}`,
  },

  // Feature banners
  [TopContainerTopContainer.chat_self_page_1]: {
    icon: 'chat_bubble_outline',
    text: 'Your LastingMind continues to get better! Go try it out!',
    buttonText: 'Continue',
  },
  [TopContainerTopContainer.invite_audience_1]: {
    icon: 'audience',
    text: "It's time to invite your family or friends to talk with your LastingMind!",
    buttonText: 'Invite Your Audience',
  },
  [TopContainerTopContainer.interview_1]: {
    icon: 'interview_table',
    text: 'People are loving the interview feature! Try it out!',
    buttonText: 'Record an Interview',
  },
  [TopContainerTopContainer.journal_1]: {
    icon: 'journal',
    text: 'The journaling feature is very popular right now! Try it out!',
    buttonText: 'Record a Journal Entry',
  },
}
