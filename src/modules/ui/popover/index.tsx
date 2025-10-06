import { PropsWithChildren } from 'react'
import Animated, { FadeInUp } from 'react-native-reanimated'
import { Measurements } from '~/hooks/use-measure-element'
import { DialogOverlay } from '../dialog'

interface PopoverProps {
  measurements: Measurements
  isOpen: boolean
  onClose?: () => void
  height?: number
  width?: number
}

export function Popover({
  measurements,
  children,
  isOpen,
  height = 182,
  width = 282,
  onClose,
}: PropsWithChildren<PopoverProps>) {
  return (
    <DialogOverlay isOpen={isOpen} onClose={onClose}>
      <Animated.View
        entering={FadeInUp}
        className="bg-bg-primary rounded-md"
        style={{
          position: 'absolute',
          maxHeight: height,
          width: width,
          top: measurements?.pageY + measurements?.height + 16,
          left: measurements?.pageX + measurements?.width / 2 - width / 2,
        }}
      >
        {children}
      </Animated.View>
    </DialogOverlay>
  )
}
