import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { SvgProps } from '../index.types'

export const EducationOutline = ({ size, color }: SvgProps) => (
  <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <Path
      d="M28.5602 14.5625C28.7989 14.4572 29.0015 14.2842 29.1428 14.0649C29.2841 13.8456 29.358 13.5897 29.3553 13.3288C29.3526 13.0679 29.2735 12.8136 29.1276 12.5973C28.9818 12.381 28.7757 12.2122 28.5349 12.1118L17.1069 6.90649C16.7595 6.74802 16.3821 6.66602 16.0002 6.66602C15.6184 6.66602 15.241 6.74802 14.8936 6.90649L3.46689 12.1065C3.22951 12.2105 3.02757 12.3813 2.88577 12.5982C2.74397 12.8152 2.66846 13.0687 2.66846 13.3278C2.66846 13.587 2.74397 13.8405 2.88577 14.0574C3.02757 14.2743 3.22951 14.4452 3.46689 14.5492L14.8936 19.7598C15.241 19.9183 15.6184 20.0003 16.0002 20.0003C16.3821 20.0003 16.7595 19.9183 17.1069 19.7598L28.5602 14.5625Z"
      stroke={color}
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M29.3335 13.3335V21.3335"
      stroke={color}
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8 16.6665V21.3332C8 22.394 8.84286 23.4115 10.3431 24.1616C11.8434 24.9117 13.8783 25.3332 16 25.3332C18.1217 25.3332 20.1566 24.9117 21.6569 24.1616C23.1571 23.4115 24 22.394 24 21.3332V16.6665"
      stroke={color}
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)
