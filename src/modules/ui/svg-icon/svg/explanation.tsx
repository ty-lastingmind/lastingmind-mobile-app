import * as React from 'react'
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg'
import { SvgProps } from '../index.types'

export const Explanation = ({ size, color }: SvgProps) => (
  <Svg width={size} height={size} fill="none">
    <G stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.667} clipPath="url(#a)">
      <Path d="M17.507 13.618c-.122.31-.15.648-.078.973l.888 2.742a.833.833 0 0 1-1.03.973l-2.845-.832a1.667 1.667 0 0 0-.915.077 8.333 8.333 0 1 1 3.98-3.933Z" />
      <Path d="M7.575 7.5a2.5 2.5 0 0 1 4.858.833c0 1.666-2.5 2.5-2.5 2.5M10 14.167h.008" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill={color} d="M0 0h20v20H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
