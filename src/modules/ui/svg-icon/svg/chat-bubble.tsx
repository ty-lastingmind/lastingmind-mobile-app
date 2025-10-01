import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { SvgProps } from '../index.types'

export const ChatBubble = ({ size, color }: SvgProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.667}
      d="M18.333 14.167a1.667 1.667 0 0 1-1.666 1.666H5.69c-.442 0-.866.176-1.178.489l-1.835 1.835a.593.593 0 0 1-1.01-.419V4.167A1.667 1.667 0 0 1 3.333 2.5h13.334a1.667 1.667 0 0 1 1.666 1.667v10Z"
    />
  </Svg>
)
