import { VariantProps } from 'class-variance-authority'
import { ActivityIndicator, TouchableOpacity } from 'react-native'
import { Typography, variants } from '~/modules/ui/typography'

interface ScreenButtonProps {
  onPress: () => void
  label: string
  variant?: VariantProps<typeof variants>['color']
  level?: VariantProps<typeof variants>['level']
  buttonStyle?: string
  labelStyle?: string
  loading?: boolean
  loadingLabel?: string
  disabled?: boolean
}

export function ScreenButton({
  onPress,
  label,
  variant = 'primary',
  level = 'body-lg',
  buttonStyle = 'items-center',
  labelStyle = '',
  loading = false,
  loadingLabel = 'Saving...',
  disabled,
}: ScreenButtonProps) {
  if (disabled) variant = 'secondary'

  const getIndicatorColor = () => {
    if (!loading) return undefined
    switch (variant) {
      case 'accent':
        return '#16006E'
      case 'primary':
        return '#000000'
      case 'secondary':
        return '#3C3C43'
      case 'tertiary':
        return '#000000'
      case 'white':
        return '#FFFFFF'
      case 'red':
        return '#FF0000'
      default:
        return '#16006E'
    }
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`flex flex-row items-center justify-center ${buttonStyle}`}
    >
      {loading ? <ActivityIndicator size="small" color={getIndicatorColor()} className="mr-2" /> : null}
      <Typography level={level} color={variant} className={`text-center ${labelStyle}`}>
        {loading ? loadingLabel : label}
      </Typography>
    </TouchableOpacity>
  )
}
