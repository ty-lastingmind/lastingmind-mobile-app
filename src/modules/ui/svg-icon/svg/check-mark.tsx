import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { SvgProps } from '../index.types'

export const CheckMark = ({ size, color }: SvgProps) => (
  <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <Path stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m17.5 1-11 11-5-5" />
  </Svg>
)
