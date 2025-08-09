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
    case NextPageType.example_chat:
      return <ExampleChat />
    case NextPageType.first_answer_page:
      return <FirstAnswer />
    case NextPageType.level_up_page:
      return <LevelIncrease />
    case NextPageType.journal_milestone:
      return <Milestone />
    case NextPageType.percent_increase:
      return <PercentIncrease />
    case NextPageType.saved_answer:
      return <SavedAnswer />
    default:
      return <SavedAnswer />
  }
}
