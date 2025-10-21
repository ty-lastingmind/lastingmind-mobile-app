import * as React from 'react'
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg'
import { SvgProps } from '../index.types'

export const ViewMore = ({ size, color }: SvgProps) => (
  <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <G fill={color} clipPath="url(#a)">
      <Path d="M14.612.5H5.386A4.892 4.892 0 0 0 .5 5.387v9.226A4.892 4.892 0 0 0 5.387 19.5h9.226a4.892 4.892 0 0 0 4.887-4.887V5.387A4.892 4.892 0 0 0 14.613.5Zm3.044 14.113a3.047 3.047 0 0 1-3.043 3.044H5.386a3.047 3.047 0 0 1-3.043-3.045V5.387a3.046 3.046 0 0 1 3.043-3.043h9.226a3.047 3.047 0 0 1 3.043 3.043v9.225l.001.001Z" />
      <Path d="M10.922 4.617H9.078v4.46h-4.46v1.843h4.46v4.461h1.844v-4.46h4.46V9.076h-4.46v-4.46Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill={color} d="M0 0h20v20H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
