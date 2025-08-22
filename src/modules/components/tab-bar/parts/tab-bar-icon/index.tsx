import { Icon } from '~/modules/ui/icon'
import { IconName } from '~/modules/ui/icon/index.types'

interface TabBarIconProps {
  name: IconName
  focused: boolean
}

export function TabBarIcon({ name, focused }: TabBarIconProps) {
  return <Icon size="lg" name={name} color={focused ? 'accent' : 'secondary'} />
}
