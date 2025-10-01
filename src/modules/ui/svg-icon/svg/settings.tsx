import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { SvgProps } from '../index.types'

export const Settings = ({ size, color, ...props }: SvgProps) => (
  <Svg width={size} height={size} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity={0.6}
      strokeWidth={2}
      d="M9.671 4.134a2.34 2.34 0 0 1 4.66 0 2.34 2.34 0 0 0 3.318 1.915 2.34 2.34 0 0 1 2.33 4.033 2.338 2.338 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.83 2.34 2.34 0 0 1 2.33-4.034 2.34 2.34 0 0 0 3.318-1.915"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity={0.6}
      strokeWidth={2}
      d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
    />
  </Svg>
)
