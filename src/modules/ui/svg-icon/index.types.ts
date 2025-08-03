import { iconNameToSvg } from './index.static'

export interface SvgIconProps {
  name: keyof typeof iconNameToSvg
  size?: number
  color?: string
}

export type SvgProps = Omit<SvgIconProps, 'name'>
