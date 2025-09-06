import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import { forwardRef, PropsWithChildren, useMemo } from 'react'
import { Text, TextProps } from 'react-native'

import { font } from '~/constants/fonts'
import { cn } from '~/utils/cn'

const variants = cva(undefined, {
  variants: {
    level: {
      h1: 'text-h1',
      h2: 'text-h2',
      h3: 'text-h3',
      h4: 'text-h4',
      h5: 'text-h5',
      h6: 'text-h6',
      'body-lg': 'text-body-lg',
      'body-1': 'text-body-1',
      'body-2': 'text-body-2',
      'label-1': 'text-label-1',
      'label-2': 'text-label-2',
      'caption-1': 'text-caption-1',
      'caption-2': 'text-caption-2',
      'overline-1': 'text-overline-1',
      'overline-2': 'text-overline-2',
      logo: 'text-logo',
    },
    weight: {
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    color: {
      red: 'text-typography-red',
      accent: 'text-typography-accent',
      primary: 'text-typography-primary',
      secondary: 'text-typography-secondary',
      tertiary: 'text-typography-tertiary',
      white: 'text-typography-white',
    },
  },
})

type TypographyVariants = VariantProps<typeof variants>
export interface TypographyProps extends PropsWithChildren<TextProps>, TypographyVariants {
  brand?: boolean
}

export const Typography = forwardRef<Text, TypographyProps>(function Typography(
  { level = 'body-1', weight = 'normal', color = 'primary', className, brand = false, ...props },
  ref
) {
  const textClassName = useMemo(() => {
    const variantsClassName = variants({ level, weight, color })
    return cn(variantsClassName, className)
  }, [level, weight, color, className])

  return (
    <Text
      ref={ref}
      style={{
        fontFamily: brand ? font.family.InriaSerif.Bold : undefined,
      }}
      className={textClassName}
      {...props}
    />
  )
})
