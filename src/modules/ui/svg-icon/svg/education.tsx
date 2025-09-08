import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { SvgProps } from '../index.types'

export const Education = ({ size, color }: SvgProps) => (
  <Svg width={size} height={size} viewBox="0 0 60 60" fill="none">
    <Path
      d="M59.5876 21.2501L30.0001 2.01758L0.412598 21.2501L30.0001 40.4801L50.0001 27.4801V40.0001H55.0001V24.2326L59.5876 21.2501Z"
      fill={color}
    />
    <Path
      d="M12.5 43.7504V34.5879L30 45.9629L47.5 34.5879V43.7504C47.5 47.4254 44.965 50.2879 41.8675 52.0954C38.7075 53.9404 34.505 55.0004 30 55.0004C25.495 55.0004 21.295 53.9404 18.1325 52.0954C15.035 50.2879 12.5 47.4254 12.5 43.7504Z"
      fill={color}
    />
  </Svg>
)
