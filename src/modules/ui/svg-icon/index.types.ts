import { IconVariants } from '~/modules/ui/icon/index.types'
import { iconNameToSvg } from './index.static'

export type SvgIconName = keyof typeof iconNameToSvg
export interface SvgIconProps extends IconVariants {
  name: SvgIconName
}

export type SvgProps = Omit<SvgIconProps, 'name' | 'size' | 'color'> & {
  size?: number
  color?: string
}
