import {
  ExampleChatData,
  FirstAnswerData,
  LevelUpData,
  MilestoneData,
  NextPageResponseNextPageData,
  NextPageType,
  PercentIncreaseData,
  SavedAnswerData,
} from '~/services/api/model'

export function dataIsLevelUpData(type: NextPageType, data: NextPageResponseNextPageData): data is LevelUpData {
  return type === NextPageType.level_up_page
}

export function dataIsFirstAnswerData(type: NextPageType, data: NextPageResponseNextPageData): data is FirstAnswerData {
  return type === NextPageType.first_answer_page
}

export function dataIsMilestoneData(type: NextPageType, data: NextPageResponseNextPageData): data is MilestoneData {
  return type === NextPageType.milestone_1 || type === NextPageType.milestone_2 || type === NextPageType.milestone_3
}

export function dataIsPercentIncreaseData(
  type: NextPageType,
  data: NextPageResponseNextPageData
): data is PercentIncreaseData {
  return (
    type === NextPageType.percent_increase_1 ||
    type === NextPageType.percent_increase_2 ||
    type === NextPageType.percent_increase_3
  )
}

export function dataIsExampleChatData(type: NextPageType, data: NextPageResponseNextPageData): data is ExampleChatData {
  return (
    type === NextPageType.example_chat_1 || type === NextPageType.example_chat_2 || type === NextPageType.example_chat_3
  )
}

export function dataIsSavedAnswerData(type: NextPageType, data: NextPageResponseNextPageData): data is SavedAnswerData {
  return type === NextPageType.saved_answer
}
