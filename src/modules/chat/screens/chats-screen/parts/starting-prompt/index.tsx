import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { Typography } from '~/modules/ui/typography'

interface StartingPromptProps extends TouchableOpacityProps {
  prompt: string
}

export function StartingPrompt({ prompt, ...props }: StartingPromptProps) {
  return (
    <TouchableOpacity
      {...props}
      className="bg-bg-secondary rounded-md min-h-[66px] p-4 flex items-center justify-center"
      activeOpacity={0.6}
    >
      <Typography level="body-lg">{prompt}</Typography>
    </TouchableOpacity>
  )
}
