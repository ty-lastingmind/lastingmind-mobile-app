import { cssInterop } from 'nativewind'
import { useMemo } from 'react'
import { iconNameToSvg } from '~/modules/ui/svg-icon/index.static'
import { variants } from '../icon/index.styles'

import { SvgIconName, SvgIconProps } from './index.types'

export function SvgIcon({ name, size = 'md', color = 'primary' }: SvgIconProps) {
  const className = useMemo(() => variants({ size, color }), [color, size])

  return <SvgIconInterop className={className} name={name} />
}

interface SvgIconInnerProps {
  className: string
  name: SvgIconName
  size?: number
  color?: string
}

const SvgIconInner = ({ name, color, size }: SvgIconInnerProps) => {
  const Icon = useMemo(() => iconNameToSvg[name], [name])

  if (!Icon) {
    console.warn(`Icon ${name} not found`)
    return null
  }

  return <Icon size={size} color={color} />
}

const SvgIconInterop = cssInterop(SvgIconInner, {
  className: {
    target: false,
    nativeStyleToProp: {
      color: 'color',
      fontSize: 'size',
    },
  },
})
