import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { SvgProps } from '../index.types'
export const AudioWave = ({ size, color }: SvgProps) => (
  <Svg width={size} height={size} fill="none" viewBox="0 0 24 24">
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2 10v3M6 6v11M10 3v18M14 8v7M18 5v13M22 10v3"
    />
  </Svg>
)
