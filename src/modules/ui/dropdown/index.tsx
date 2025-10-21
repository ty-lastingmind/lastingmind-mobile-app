import React from 'react'
import { TouchableOpacity } from 'react-native'
import Animated, { FadeInUp } from 'react-native-reanimated'
import { useBoolean } from 'usehooks-ts'
import { cn } from '~/utils/cn'
import { Icon } from '../icon'
import { SvgIcon } from '../svg-icon'
import { SvgIconName } from '../svg-icon/index.types'
import { Typography } from '../typography'

interface DropdownProps extends React.ComponentProps<typeof TouchableOpacity> {
  iconName?: SvgIconName
  titleWeight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold'
  title: string
}

export default function Dropdown({ iconName, title, children, className, titleWeight = 'bold' }: DropdownProps) {
  const { value: isOpen, toggle: toggleOpen } = useBoolean(false)

  const containerClassName = cn('flex-row gap-4 p-6 bg-bg-secondary rounded-xl items-center', className)

  return (
    <>
      <TouchableOpacity className={containerClassName} onPress={toggleOpen}>
        {iconName && <SvgIcon name={iconName} size="xl" color="accent" />}
        <Typography level="h5" className="flex-1" weight={titleWeight}>
          {title}
        </Typography>
        {!isOpen ? <Icon name="chevron-forward" color="secondary" /> : <Icon name="chevron-down" color="secondary" />}
      </TouchableOpacity>
      {isOpen && <Animated.View entering={FadeInUp.duration(200)}>{children}</Animated.View>}
    </>
  )
}
