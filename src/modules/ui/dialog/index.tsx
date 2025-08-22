import React, { PropsWithChildren } from 'react'
import { Modal, View } from 'react-native'
import { cn } from '~/utils/cn'

export function DialogContent({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <View className={cn('bg-bg-primary rounded-md max-h-[60vh] p-4 gap-4', className)}>{children}</View>
}

export function DialogHeader({ children }: PropsWithChildren) {
  return <View>{children}</View>
}

export function DialogFooter({ children }: PropsWithChildren) {
  return <View>{children}</View>
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
}

export function Dialog({ children, isOpen }: PropsWithChildren<DialogProps>) {
  return (
    <DialogOverlay isOpen={isOpen}>
      <DialogContent>{children}</DialogContent>
    </DialogOverlay>
  )
}
