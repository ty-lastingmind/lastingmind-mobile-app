import clsx, { ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

const twMerge = extendTailwindMerge({
  override: {
    classGroups: {
      'font-size': [
        'text-h1',
        'text-h2',
        'text-h3',
        'text-h4',
        'text-h5',
        'text-h6',
        'text-body-lg',
        'text-body-1',
        'text-body-2',
        'text-label-1',
        'text-label-2',
        'text-caption-1',
        'text-caption-2',
        'text-overline-1',
        'text-overline-2',
        'text-button-sm',
        'text-button-md',
        'text-button-lg',
        'text-badge-sm',
        'text-badge-md',
        'text-badge-lg',
        'text-logo',
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
