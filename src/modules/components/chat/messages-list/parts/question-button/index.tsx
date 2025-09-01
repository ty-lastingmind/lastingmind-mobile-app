import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { SvgIconName } from '~/modules/ui/svg-icon/index.types'
import { Typography } from '~/modules/ui/typography'

interface QuestionButtonProps extends TouchableOpacityProps {
  text: string
  icon: SvgIconName
}

export function QuestionButton({ text, icon, ...props }: QuestionButtonProps) {
  return (
    <TouchableOpacity
      className="flex flex-row items-center h-[40px] gap-2 border border-miscellaneous-topic-stroke px-3 rounded-full"
      {...props}
    >
      <SvgIcon name={icon} size="md" color="primary" />
      <Typography level="label-1">{text}</Typography>
    </TouchableOpacity>
  )
}
