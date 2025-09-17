import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { SvgProps } from '../index.types'

export const WorkOutline = ({ size, color }: SvgProps) => (
  <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <Path
      d="M24 2.6665H8C6.52724 2.6665 5.33334 3.86041 5.33334 5.33317V26.6665C5.33334 28.1393 6.52724 29.3332 8 29.3332H24C25.4728 29.3332 26.6667 28.1393 26.6667 26.6665V5.33317C26.6667 3.86041 25.4728 2.6665 24 2.6665Z"
      stroke={color}
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 29.3333V24H20V29.3333"
      stroke={color}
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M10.6667 8H10.68" stroke={color} strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M21.3333 8H21.3467" stroke={color} strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M16 8H16.0133" stroke={color} strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M16 13.3335H16.0133" stroke={color} strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M16 18.6665H16.0133" stroke={color} strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round" />
    <Path
      d="M21.3333 13.3335H21.3467"
      stroke={color}
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M21.3333 18.6665H21.3467"
      stroke={color}
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10.6667 13.3335H10.68"
      stroke={color}
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10.6667 18.6665H10.68"
      stroke={color}
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)
