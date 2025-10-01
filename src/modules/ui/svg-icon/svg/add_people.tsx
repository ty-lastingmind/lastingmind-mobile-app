import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { SvgProps } from '../index.types'

export const AddPeople = ({ size, color, ...props }: SvgProps) => (
  <Svg width={size} height={size} fill="none" viewBox="0 0 20 20" {...props}>
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.667}
      d="M1.667 17.5a6.667 6.667 0 0 1 11.076-5"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.667}
      d="M8.333 10.833a4.167 4.167 0 1 0 0-8.333 4.167 4.167 0 0 0 0 8.333ZM15.833 13.332v5M18.333 15.832h-5"
    />
  </Svg>
)
