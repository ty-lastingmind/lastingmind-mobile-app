import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { SvgProps } from '../index.types'

export const Plus = ({ size, color }: SvgProps) => (
  <Svg width={size} height={size} fill="none" viewBox="0 0 24 24">
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10ZM8 12h8m-4-4v8"
    />
  </Svg>
)
