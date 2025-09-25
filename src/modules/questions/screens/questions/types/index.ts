import { Href } from 'expo-router'
import { SvgIconProps } from '~/modules/ui/svg-icon/index.types'

export type ActionItem = {
  title: string
  description: string
  href: Href
  icon: SvgIconProps['name']
}
