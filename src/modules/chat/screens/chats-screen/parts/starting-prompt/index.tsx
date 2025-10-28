import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { Typography } from '~/modules/ui/typography'
import { cn } from '~/utils/cn'

interface StartingPromptProps extends TouchableOpacityProps {
  prompt: string
  disabled?: boolean
}

export function StartingPrompt({ prompt, disabled = false, ...props }: StartingPromptProps) {
  return (
    <TouchableOpacity
      {...props}
      disabled={disabled}
      className={cn(
        'bg-bg-secondary rounded-md min-h-[66px] p-4 flex items-center justify-center',
        disabled && 'opacity-50'
      )}
      activeOpacity={disabled ? 1 : 0.6}
    >
      <Typography level="body-lg" className={cn(disabled && 'opacity-50')}>
        {prompt}
      </Typography>
    </TouchableOpacity>
  )
}
