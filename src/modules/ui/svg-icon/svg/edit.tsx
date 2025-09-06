import React from 'react'
import Svg, { G, Circle, Path, Defs, ClipPath, Rect } from 'react-native-svg'
import { SvgProps } from '../index.types'

export const Edit = ({ size, color }: SvgProps) => (
  <Svg width={size} height={size} viewBox="0 0 50 50" fill="none">
    <G clipPath="url(#clip0_2258_12683)">
      <Circle cx="25" cy="25" r="24.5" fill={color} stroke="white" />
      <Path
        d="M33.71 20.0401C34.1 19.6501 34.1 19.0001 33.71 18.6301L31.37 16.2901C31 15.9001 30.35 15.9001 29.96 16.2901L28.12 18.1201L31.87 21.8701M16 30.2501V34.0001H19.75L30.81 22.9301L27.06 19.1801L16 30.2501Z"
        fill="white"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_2258_12683">
        <Rect width="50" height="50" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
)
