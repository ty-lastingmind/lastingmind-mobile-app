import { Button } from '~/modules/ui/button'
import { SvgIconProps } from '~/modules/ui/svg-icon/index.types'

const ICON_COLOR = '#000000'
const ICON_SIZE = 48

interface QuickActionItemProps {
  title: string
  icon: SvgIconProps['name']
  onPress: () => void
}

export const QuickActionItem = ({ title, icon, onPress }: QuickActionItemProps) => {
  return (
    <Button
      btnContainerClassName="w-36 h-36 flex flex-col rounded-[20px] justify-center"
      textClassName="text-label-1 text-typography-primary"
      variant="secondary"
      icon={{
        name: icon,
        size: ICON_SIZE,
        color: ICON_COLOR,
      }}
      onPress={onPress}
    >
      {title}
    </Button>
  )
}
