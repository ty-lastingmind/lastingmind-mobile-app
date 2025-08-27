import { cva, VariantProps } from 'class-variance-authority'
import { useMemo } from 'react'
import { View } from 'react-native'
import Svg, { Circle } from 'react-native-svg'
import { Typography } from '../typography'

const variants = {
  container: cva('relative', {
    variants: {
      size: {
        sm: 'w-16 h-16',
        md: 'w-20 h-20',
        lg: 'w-24 h-24',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }),
}

type CircularProgressVariants = VariantProps<typeof variants.container>

interface CircularProgressProps extends CircularProgressVariants {
  value: number
  strokeWidth?: number
  showPercentage?: boolean
}

export function CircularProgress({
  value,
  size = 'md',
  strokeWidth = 10,
  showPercentage = true,
}: CircularProgressProps) {
  const sizeValue = size === 'sm' ? 64 : size === 'md' ? 80 : 96
  const radius = (sizeValue - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const progress = Math.min(Math.max(value, 0), 100)
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (progress / 100) * circumference

  const classNames = useMemo(() => {
    return {
      container: variants.container({ size }),
    }
  }, [size])

  const typographyLevel = size === 'sm' ? 'caption-1' : size === 'md' ? 'label-1' : 'h5'

  return (
    <View className={classNames.container}>
      <Svg width={sizeValue} height={sizeValue} className="absolute">
        <Circle
          cx={sizeValue / 2}
          cy={sizeValue / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.4)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <Circle
          cx={sizeValue / 2}
          cy={sizeValue / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 1)"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(90 ${sizeValue / 2} ${sizeValue / 2})`}
        />
      </Svg>
      {showPercentage && (
        <View className="absolute inset-0 justify-center items-center">
          <Typography level={typographyLevel} weight="semibold" color="white">
            {Math.round(progress)}%
          </Typography>
        </View>
      )}
    </View>
  )
}
