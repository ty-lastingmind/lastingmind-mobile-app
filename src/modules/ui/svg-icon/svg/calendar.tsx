import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { SvgProps } from '../index.types'

export const Calendar = ({ size, color }: SvgProps) => (
  <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <Path
      d="M14.6667 18.6665H16V23.9998"
      stroke={color}
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M21.3333 2.6665V7.99984"
      stroke={color}
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M4 13.3335H28" stroke={color} strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round" />
    <Path
      d="M10.6667 2.6665V7.99984"
      stroke={color}
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M25.3333 5.3335H6.66667C5.19391 5.3335 4 6.5274 4 8.00016V26.6668C4 28.1396 5.19391 29.3335 6.66667 29.3335H25.3333C26.8061 29.3335 28 28.1396 28 26.6668V8.00016C28 6.5274 26.8061 5.3335 25.3333 5.3335Z"
      stroke={color}
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)
