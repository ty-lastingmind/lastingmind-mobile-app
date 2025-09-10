import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { SvgProps } from '../index.types'

export const Trash = ({ size, color }: SvgProps) => (
  <Svg width={size} height={size} fill="none" viewBox="0 0 32 32">
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.667}
      d="M13.334 14.667v8M18.666 14.667v8M25.333 8v18.667a2.667 2.667 0 0 1-2.666 2.666H9.332a2.667 2.667 0 0 1-2.667-2.666V8M4 8h24M10.666 8V5.334a2.667 2.667 0 0 1 2.667-2.667h5.333a2.667 2.667 0 0 1 2.667 2.667V8"
    />
  </Svg>
)
