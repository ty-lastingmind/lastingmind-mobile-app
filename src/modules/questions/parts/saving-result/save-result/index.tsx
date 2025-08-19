import { useRouter } from 'expo-router'
import {
  dataIsExampleChatData,
  dataIsFirstAnswerData,
  dataIsLevelUpData,
  dataIsMilestoneData,
  dataIsPercentIncreaseData,
  dataIsSavedAnswerData,
} from '~/modules/questions/parts/saving-result/save-result/index.utils'
import { NextPageResponseNextPageData, NextPageType } from '~/services/api/model'
import { ExampleChat } from './parts/example-chat'
import { LevelIncrease } from './parts/level-increase'
import { Milestone } from './parts/milestone'
import { PercentIncrease } from './parts/percent-increase'
import { SavedAnswer } from './parts/saved-answer'
import { exampleChatToData, levelToData, milestoneToData, percentIncreaseToData } from './index.static'

interface SaveResultProps {
  type: NextPageType
  data: NextPageResponseNextPageData
}

export function SaveResult({ data, type }: SaveResultProps) {
  const router = useRouter()

  if (dataIsLevelUpData(type, data)) {
    const componentData = levelToData[data.level_name] ?? { title: data.level_name, animation: 'lm1Trophy' }

    return (
      <LevelIncrease
        title={componentData.title}
        topics={data.topics_discussed}
        onTryChatPress={() => {
          // todo - open chat
        }}
        onContinuePress={() => {
          router.replace('/questions/journal/add/01-select-topic')
        }}
        animation={componentData.animation}
      />
    )
  }
  if (dataIsFirstAnswerData(type, data)) {
    return (
      <ExampleChat
        title="Great job on your first journal entry!"
        caption="Your answers power your LastingMind Chat!"
        message={data.question}
        overline="Note: Your chat may take a day to update"
        answer={data.answer}
        avatarUrl="" // todo - add avatar
        onPress={() => {
          router.replace('/questions/journal/add/01-select-topic')
        }}
      />
    )
  }
  if (dataIsMilestoneData(type, data)) {
    const componentData = milestoneToData[type]

    return (
      <Milestone
        title={componentData.title}
        caption={componentData.caption(data.milestone)}
        text="Your LastingMind is getting so much better!"
        animation={componentData.animation}
        onPress={() => {
          router.replace('/questions/journal/add/01-select-topic')
        }}
      />
    )
  }
  if (dataIsPercentIncreaseData(type, data)) {
    const componentData = percentIncreaseToData[type]

    return (
      <PercentIncrease
        title={componentData.title}
        animation={componentData.animation}
        progress={100 - data.percent_to_next_stage}
        nextLevel={data.next_stage}
        description={`You just got ${data.percent_increase}% closer to finishing the ${data.next_stage}. Keep going to improve your LastingMind Chat!`}
        percentToNextLevel={data.percent_to_next_stage}
        onPress={() => {
          router.replace('/questions/journal/add/01-select-topic')
        }}
      />
    )
  }
  if (dataIsExampleChatData(type, data)) {
    const componentData = exampleChatToData[type]

    return (
      <ExampleChat
        title={componentData.title}
        caption="Check out this example conversation with your LastingMind"
        message={data.question}
        answer={data.answer}
        avatarUrl="" // todo - add avatar
        onPress={() => {
          router.replace('/questions/journal/add/01-select-topic')
        }}
      />
    )
  }
  if (dataIsSavedAnswerData(type, data)) {
    return <SavedAnswer title="Entry Saved!" caption="Keep adding more responses to improve your LastingMind!" />
  }

  return null
}
