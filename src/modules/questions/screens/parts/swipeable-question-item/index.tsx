import React, { useState, useCallback } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, useSharedValue, withSpring, interpolate } from 'react-native-reanimated'
import { Typography } from '~/modules/ui/typography'
import { Button } from '~/modules/ui/button'
import { Dialog, DialogContent, DialogFooter } from '~/modules/ui/dialog'
import { SavedQuestionsOutputSavedQuestionsAnyOfItem } from '~/services/api/model'
import { SvgIcon } from '~/modules/ui/svg-icon'

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

const SWIPE_THRESHOLD = -100

interface SwipeableQuestionItemProps {
  question: SavedQuestionsOutputSavedQuestionsAnyOfItem
  onDelete: (responseId: string) => void
}

export function SwipeableQuestionItem({ question: questionItem, onDelete }: SwipeableQuestionItemProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const question = Object.values(questionItem)[0]
  const responseId = Object.keys(questionItem)[0]

  const translateX = useSharedValue(0)
  const deleteButtonOpacity = useSharedValue(0)

  const panGesture = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .failOffsetY([-10, 10])
    .onUpdate((event) => {
      console.log('Pan gesture triggered:', event.translationX)
      if (event.translationX < 0) {
        translateX.value = event.translationX
        deleteButtonOpacity.value = interpolate(event.translationX, [SWIPE_THRESHOLD, 0], [1, 0], 'clamp')
        console.log('Delete button opacity:', deleteButtonOpacity.value)
      }
    })
    .onEnd((event) => {
      if (event.translationX < SWIPE_THRESHOLD) {
        translateX.value = withSpring(SWIPE_THRESHOLD)
        deleteButtonOpacity.value = withSpring(1)
      } else {
        translateX.value = withSpring(0)
        deleteButtonOpacity.value = withSpring(0)
      }
    })

  const animatedCardStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    }
  })

  const animatedDeleteButtonStyle = useAnimatedStyle(() => {
    return {
      opacity: deleteButtonOpacity.value,
      transform: [
        {
          scale: interpolate(deleteButtonOpacity.value, [0, 1], [0.8, 1], 'clamp'),
        },
      ],
    }
  })

  const handleDeletePress = useCallback(() => {
    setShowDeleteDialog(true)
  }, [])

  const handleConfirmDelete = useCallback(() => {
    setShowDeleteDialog(false)
    onDelete(responseId)
  }, [onDelete, responseId])

  const handleCancelDelete = useCallback(() => {
    setShowDeleteDialog(false)
    translateX.value = withSpring(0)
    deleteButtonOpacity.value = withSpring(0)
  }, [translateX, deleteButtonOpacity])

  return (
    <>
      <View className="relative overflow-hidden">
        <AnimatedTouchableOpacity
          onPress={handleDeletePress}
          className="bg-red-alpha-20 h-[80px] w-[80px] items-center justify-center rounded-full absolute right-2 top-2 z-10"
          style={animatedDeleteButtonStyle}
        >
          <SvgIcon name="trash" size="2xl" color="red" />
        </AnimatedTouchableOpacity>
        <GestureDetector gesture={panGesture}>
          <Animated.View style={animatedCardStyle}>
            <View className="w-full h-[98px] bg-bg-secondary py-4 px-4 rounded-2xl">
              <Typography level="body-1" color="accent">
                {question.question_text}
              </Typography>
            </View>
          </Animated.View>
        </GestureDetector>
      </View>

      <Dialog isOpen={showDeleteDialog}>
        <DialogContent>
          <Typography level="body-lg" color="primary" className="text-center">
            Are you sure you want to delete this question?
          </Typography>
          <DialogFooter className="flex-row gap-3 mt-4">
            <Button variant="primary" onPress={handleCancelDelete} className="flex-1 bg-accent rounded-full py-2 px-4">
              Cancel
            </Button>
            <Button onPress={handleConfirmDelete} className="flex-1 bg-red rounded-full py-2 px-4">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
