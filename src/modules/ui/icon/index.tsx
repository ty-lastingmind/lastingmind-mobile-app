import { Ionicons } from '@expo/vector-icons'
import { cssInterop } from 'nativewind'
import { useMemo } from 'react'
import { variants } from '~/modules/ui/icon/index.styles'

import { IconName, IconVariants } from './index.types'

export interface IconProps extends IconVariants {
  name: IconName
}

export function Icon({ name, size, color }: IconProps) {
  const className = useMemo(() => variants({ size, color }), [color, size])

  return <Ionicons name={name} className={className} />
}

cssInterop(Ionicons, {
  className: {
    target: false,
    nativeStyleToProp: {
      color: 'color',
      fontSize: 'size',
    },
  },
})
