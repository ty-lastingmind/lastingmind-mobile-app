import { View } from 'react-native'
import { ActionItem as ActionItemType } from '../../types'
import { ActionItem } from '../action-item'

const actions: ActionItemType[] = [
  {
    title: 'Answer Curated Questions',
    description: 'Questions that are customized based on your interests.',
    href: '/questions/curated-questions',
    icon: 'curated_questions',
  },
  {
    title: 'Guided Interview',
    description: 'Hands-free interview to record with another person.',
    href: '/questions/interview/add/01-select-topic',
    icon: 'interview',
  },
  {
    title: 'Journal Entry',
    description: 'Questions that are customized based on your interests.',
    href: '/questions/journal/add/01-select-topic',
    icon: 'journal',
  },
]

export function ActionList() {
  return (
    <View className="flex-col gap-4">
      {actions.map((action) => (
        <ActionItem key={action.title} action={action} />
      ))}
    </View>
  )
}
