import React from 'react'
import Svg, { Path } from 'react-native-svg'

export const Close = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 8.58275e-07C5.37258 2.78888e-07 -2.18624e-06 5.37258 -2.76562e-06 12C-3.34501e-06 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12C24 5.37259 18.6274 1.43766e-06 12 8.58275e-07Z"
      fill="#F2F2F7"
    />
    <Path d="M15 9L9 15" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <Path d="M9 9L15 15" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </Svg>
)
