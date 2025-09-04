import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { SvgProps } from '../index.types'

export const Play = ({ size, color }: SvgProps) => (
  <Svg width={size} height={size} fill="none" viewBox="0 0 24 24">
    <Path fill={color} d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19V5Z" />
  </Svg>
)
