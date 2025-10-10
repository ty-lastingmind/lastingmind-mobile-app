import { cva } from 'class-variance-authority'

export const variants = cva('', {
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
      '5xl': 'text-icon-5xl',
      '6xl': 'text-icon-6xl',
      '7xl': 'text-icon-7xl',
    },
    color: {
      accent: 'text-icon-accent',
      white: 'text-icon-white',
      primary: 'text-icon-primary',
      secondary: 'text-icon-secondary',
      tertiary: 'text-icon-tertiary',
      logo: 'text-icon-logo',
      miscellaneous: 'text-icon-miscellaneous',
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
