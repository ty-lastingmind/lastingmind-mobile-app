import React, { PropsWithChildren } from 'react'
import { Modal, TouchableOpacity, TouchableOpacityProps, View, ViewProps } from 'react-native'
import { Icon } from '~/modules/ui/icon'
import { cn } from '~/utils/cn'
import { Typography } from '../typography'

export function DialogContent({
  children,
  className,
  style,
}: PropsWithChildren<{ className?: string; style?: ViewProps['style'] }>) {
  return (
    <View style={style} className={cn('bg-bg-primary rounded-md p-4 gap-4', className)}>
      {children}
    </View>
  )
}

export function DialogHeader({ children }: PropsWithChildren) {
  return <View>{children}</View>
}

export function DialogFooter({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <View className={className}>{children}</View>
}

export function DialogTitle({ children }: { children: string }) {
  return (
    <Typography color="accent" brand level="h5">
      {children}
    </Typography>
  )
}

export function DialogClose(props: TouchableOpacityProps) {
  return (
    <TouchableOpacity {...props}>
      <Icon name="close-circle-outline" size="lg" />
    </TouchableOpacity>
  )
}

export function DialogOverlay({ children, isOpen }: PropsWithChildren<{ isOpen: boolean }>) {
  return (
    <Modal animationType="fade" transparent visible={isOpen}>
      <View className="h-full w-full bg-bg-vibrant-primary flex items-center justify-center p-4">{children}</View>
    </Modal>
  )
}

export interface DialogProps {
  isOpen: boolean
  className?: string
  style?: ViewProps['style']
}

export function Dialog({ children, isOpen, className, style }: PropsWithChildren<DialogProps>) {
  return (
    <DialogOverlay isOpen={isOpen}>
      <DialogContent style={style} className={className}>
        {children}
      </DialogContent>
    </DialogOverlay>
  )
}
