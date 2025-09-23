import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { SvgProps } from '../index.types'

export const People = ({ size, color, ...props }: SvgProps) => (
  <Svg width={size} height={size} fill="none" viewBox="0 0 20 20" {...props}>
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.667}
      d="M13.333 17.5v-1.667A3.333 3.333 0 0 0 10 12.5H5a3.333 3.333 0 0 0-3.333 3.333V17.5M13.333 2.605a3.334 3.334 0 0 1 0 6.454M18.333 17.501v-1.667a3.334 3.334 0 0 0-2.5-3.225M7.5 9.167a3.333 3.333 0 1 0 0-6.667 3.333 3.333 0 0 0 0 6.667Z"
    />
  </Svg>
)
