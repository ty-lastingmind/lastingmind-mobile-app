import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import type { SvgProps } from '../index.types'

export const Reload = ({ size, color }: SvgProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      fill={color}
      stroke="#16006E"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M8 20h16M8 11h24"
    />
  </Svg>
)
