import Ionicons from '@expo/vector-icons/Ionicons'
import { useResolveClassNames } from 'uniwind'
import { variants } from '~/modules/ui/icon/index.styles'

import { IconName, IconVariants } from './index.types'

export interface IconProps extends IconVariants {
  name: IconName
}

export function Icon({ name, size, color }: IconProps) {
  const styles = useResolveClassNames(variants({ size, color }))

  return <Ionicons name={name} color={styles.color} size={styles.fontSize} />
}
