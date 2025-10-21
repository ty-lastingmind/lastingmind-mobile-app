import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { SvgProps } from '../index.types'

export const ArrowRight = ({ size, color }: SvgProps) => (
  <Svg width={size} height={size} fill="none" viewBox="0 0 24 24">
    <Path stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m9 18 6-6-6-6" />
  </Svg>
)
