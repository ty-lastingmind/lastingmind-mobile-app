import { Ionicons } from '@expo/vector-icons'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import { cssInterop } from 'nativewind'
import { useMemo } from 'react'

import { IconName } from './index.types'

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'

const variants = cva('', {
  variants: {
    size: {
      xs: 'text-icon-xs',
      sm: 'text-icon-sm',
      md: 'text-icon-md',
      lg: 'text-icon-lg',
      xl: 'text-icon-xl',
      '2xl': 'text-icon-2xl',
      '3xl': 'text-icon-3xl',
      '4xl': 'text-icon-4xl',
    },
    color: {
      accent: 'text-icon-accent',
      white: 'text-icon-white',
      primary: 'text-icon-primary',
      secondary: 'text-icon-secondary',
      tertiary: 'text-icon-tertiary',
      brand: 'text-icon-brand',
      red: 'text-icon-red',
      green: 'text-icon-green',
      blue: 'text-icon-blue',
      error: 'text-icon-error',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'primary',
  },
})

type IconVariants = VariantProps<typeof variants>

export interface IconProps extends IconVariants {
  name: IconName
  size?: IconSize
}

export function Icon({ name, size = 'md', color }: IconProps) {
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
