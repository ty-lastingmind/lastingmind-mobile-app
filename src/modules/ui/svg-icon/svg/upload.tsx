import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { SvgProps } from '../index.types'
export const Upload = ({ size, color, ...props }: SvgProps) => (
  <Svg width={size} height={size} fill="none" viewBox="0 0 20 20" {...props}>
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.667}
      d="M10 10.832v6.667M3.333 12.418a5.833 5.833 0 1 1 9.759-5.75h1.492a3.75 3.75 0 0 1 2.083 6.869"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.667}
      d="M6.667 14.165 10 10.832l3.333 3.333"
    />
  </Svg>
)
