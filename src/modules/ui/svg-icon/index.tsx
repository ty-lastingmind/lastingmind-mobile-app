import { useMemo } from 'react'
import { iconNameToSvg } from '~/modules/ui/svg-icon/index.static'

import { SvgIconProps } from './index.types'

export function SvgIcon({ name, size, color }: SvgIconProps) {
  const Icon = useMemo(() => iconNameToSvg[name], [name])

  if (!Icon) {
    console.warn(`Icon ${name} not found`)
    return null
  }

  return <Icon size={size} color={color} />
}
