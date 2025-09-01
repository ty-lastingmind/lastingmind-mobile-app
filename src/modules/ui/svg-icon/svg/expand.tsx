import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { SvgProps } from '../index.types'

export const Expand = ({ size, color }: SvgProps) => (
  <Svg width={size} height={size} fill="none">
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 1.5h6m0 0v6m0-6-7 7m-11 11 7-7m-7 7h6m-6 0v-6"
    />
  </Svg>
)
