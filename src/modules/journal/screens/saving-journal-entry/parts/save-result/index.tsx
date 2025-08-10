import { NextPageType } from '~/services/api/model'
import { ExampleChat } from './parts/example-chat'
import { FirstAnswer } from './parts/first-answer'
import { LevelIncrease } from './parts/level-increase'
import { Milestone } from './parts/milestone'
import { PercentIncrease } from './parts/percent-increase'
import { SavedAnswer } from './parts/saved-answer'

interface SaveResultProps {
  type: NextPageType
}

export function SaveResult({ type }: SaveResultProps) {
  switch (type) {
    case NextPageType.example_chat_1:
    case NextPageType.example_chat_2:
    case NextPageType.example_chat_3:
      return <ExampleChat />
    case NextPageType.first_answer_page:
      return <FirstAnswer />
    case NextPageType.level_up_page:
      return <LevelIncrease />
    case NextPageType.milestone_1:
    case NextPageType.milestone_2:
    case NextPageType.milestone_3:
      return <Milestone />
    case NextPageType.percent_increase_1:
    case NextPageType.percent_increase_2:
    case NextPageType.percent_increase_3:
      return <PercentIncrease />
    case NextPageType.saved_answer:
      return <SavedAnswer />
    default:
      return null
  }
}
