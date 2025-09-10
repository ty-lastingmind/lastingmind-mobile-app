import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { SvgProps } from '../index.types'

export const Mic = ({ size, color }: SvgProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 19v3M19 10v2a7 7 0 1 1-14 0v-2"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 5a3 3 0 1 0-6 0v7a3 3 0 1 0 6 0V5Z"
    />
  </Svg>
)
