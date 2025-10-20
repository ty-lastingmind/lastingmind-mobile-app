import React from 'react'
import Svg, { Path, Rect } from 'react-native-svg'
import { SvgProps } from '../index.types'

export const EmailCard = ({ size, color }: SvgProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {/* Card Background */}
    <Rect x="2" y="4" width="20" height="16" rx="2" ry="2" fill={color} />
    {/* Email Symbol */}
    <Path d="M4 7L12 13L20 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    {/* Card Corner Fold */}
    <Path
      d="M18 4L22 4L22 8"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="white"
    />
  </Svg>
)
