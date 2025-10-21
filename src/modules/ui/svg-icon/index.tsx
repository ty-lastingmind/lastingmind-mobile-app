import { useMemo } from 'react'
import { useResolveClassNames } from 'uniwind'
import { iconNameToSvg } from '~/modules/ui/svg-icon/index.static'
import { variants } from '../icon/index.styles'

import { SvgIconProps } from './index.types'

export function SvgIcon({ name, size = 'md', color = 'primary' }: SvgIconProps) {
  const styles = useResolveClassNames(variants({ size, color }))
  const Icon = useMemo(() => iconNameToSvg[name], [name])

  if (!Icon) {
    console.warn(`Icon ${name} not found`)
    return null
  }

  return <Icon color={styles.color?.toString()} size={styles.fontSize} />
}
