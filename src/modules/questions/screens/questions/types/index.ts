import { Href } from 'expo-router'
import { SvgIconName } from '~/modules/ui/svg-icon/index.types'

export type ActionItem = {
  title: string
  description: string
  href: Href
  icon: SvgIconName
}
