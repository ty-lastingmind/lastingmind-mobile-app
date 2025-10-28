import { UseFormReturn } from 'react-hook-form'
import { View } from 'react-native'
import Animated, { FadeInDown, FadeOut } from 'react-native-reanimated'
import { StartingPrompt } from '~/modules/chat/screens/chats-screen/parts/starting-prompt'

interface StartingPromptsProps {
  prompts: string[]
  onPromptPress: (prompt: string) => void
  form: UseFormReturn<{ question: string }>
  disabled?: boolean
}

export function StartingPrompts({ prompts, onPromptPress, form, disabled = false }: StartingPromptsProps) {
  const question = form.watch('question')

  if (question) return null

  return (
    <View className="flex gap-4 px-10">
      {prompts.map((prompt, index) => (
        <Animated.View key={`${prompt}-${index}`} exiting={FadeOut} entering={FadeInDown.delay(index * 100)}>
          <StartingPrompt onPress={() => onPromptPress(prompt)} prompt={prompt} disabled={disabled} />
        </Animated.View>
      ))}
    </View>
  )
}
