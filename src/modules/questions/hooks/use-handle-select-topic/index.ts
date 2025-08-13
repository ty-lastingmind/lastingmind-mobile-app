import { Path, PathValue, UseFormReturn } from 'react-hook-form'

export function useHandleSelectTopic<T extends { topicName: string; customTopicName?: string }>(
  form: UseFormReturn<T>
): {
  selectedTopic: string
  hasTopic: boolean
  handleTopicChange: (topic: string) => void
  customTopicName?: string
} {
  const selectedTopic = form.watch('topicName' as Path<T>)
  const customTopicName = form.watch('customTopicName' as Path<T>)
  const hasTopic = Boolean(selectedTopic || customTopicName)

  function handleTopicChange(topic: string) {
    if (topic === selectedTopic) {
      form.setValue('topicName' as Path<T>, '' as PathValue<T, Path<T>>)
    } else {
      form.setValue('customTopicName' as Path<T>, '' as PathValue<T, Path<T>>)
      form.setValue('topicName' as Path<T>, topic as PathValue<T, Path<T>>)
    }
  }

  return {
    hasTopic,
    customTopicName,
    selectedTopic: selectedTopic ?? '',
    handleTopicChange,
  }
}
