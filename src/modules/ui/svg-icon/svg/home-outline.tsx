import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { SvgProps } from '../index.types'

export const HomeOutline = ({ size, color }: SvgProps) => (
  <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <Path
      d="M20 28V17.3333C20 16.9797 19.8595 16.6406 19.6095 16.3905C19.3594 16.1405 19.0203 16 18.6667 16H13.3333C12.9797 16 12.6406 16.1405 12.3905 16.3905C12.1405 16.6406 12 16.9797 12 17.3333V28"
      stroke={color}
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4 13.3335C3.99991 12.9455 4.08445 12.5623 4.24772 12.2104C4.41099 11.8585 4.64906 11.5465 4.94533 11.2961L14.2787 3.29745C14.76 2.89067 15.3698 2.66748 16 2.66748C16.6302 2.66748 17.24 2.89067 17.7213 3.29745L27.0547 11.2961C27.3509 11.5465 27.589 11.8585 27.7523 12.2104C27.9156 12.5623 28.0001 12.9455 28 13.3335V25.3335C28 26.0407 27.719 26.719 27.219 27.2191C26.7189 27.7192 26.0406 28.0001 25.3333 28.0001H6.66667C5.95942 28.0001 5.28115 27.7192 4.78105 27.2191C4.28095 26.719 4 26.0407 4 25.3335V13.3335Z"
      stroke={color}
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)
