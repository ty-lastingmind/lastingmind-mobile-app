import { Ionicons } from '@expo/vector-icons'
import type { VariantProps } from 'class-variance-authority'
import { variants } from '~/modules/ui/icon/index.styles'

export type IconVariants = VariantProps<typeof variants>
export type IconName = keyof typeof Ionicons.glyphMap
export type IconSize = IconVariants['size']
