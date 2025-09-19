import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { SvgProps } from '../index.types'

export const Noteblock = ({ size, color }: SvgProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M13.4 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V12.6"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M2 6H6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M2 10H6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M2 14H6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M2 18H6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path
      d="M21.378 5.62615C21.7764 5.22779 22.0002 4.68751 22.0002 4.12415C22.0002 3.56079 21.7764 3.0205 21.378 2.62215C20.9797 2.22379 20.4394 2 19.876 2C19.3126 2 18.7724 2.22379 18.374 2.62215L13.364 7.63415C13.1263 7.87177 12.9522 8.16548 12.858 8.48815L12.021 11.3581C11.9959 11.4442 11.9944 11.5354 12.0167 11.6222C12.0389 11.7091 12.0841 11.7883 12.1475 11.8517C12.2108 11.9151 12.2901 11.9603 12.3769 11.9825C12.4637 12.0048 12.555 12.0032 12.641 11.9781L15.511 11.1411C15.8337 11.0469 16.1274 10.8729 16.365 10.6351L21.378 5.62615Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)
