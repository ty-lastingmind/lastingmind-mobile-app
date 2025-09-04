import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { SvgProps } from '../index.types'

export const Stop = ({ size, color }: SvgProps) => (
  <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <Path
      fill={color}
      d="M12.944 0H2.056C1.196 0 .5.696.5 1.556v10.888c0 .86.696 1.556 1.556 1.556h10.888c.86 0 1.556-.696 1.556-1.556V1.556C14.5.696 13.804 0 12.944 0Z"
    />
  </Svg>
)
