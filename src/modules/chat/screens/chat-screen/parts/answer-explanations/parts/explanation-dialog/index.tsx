import { useCallback, useLayoutEffect, useRef } from 'react'
import { FlatList, ListRenderItem, TouchableOpacity, useWindowDimensions, View, ViewToken } from 'react-native'
import { useStep } from 'usehooks-ts'
import { Item } from '~/modules/chat/screens/chat-screen/parts/answer-explanations/parts/explanation-dialog/parts/item/item'
import { Progress } from '~/modules/chat/screens/chat-screen/parts/answer-explanations/parts/explanation-dialog/parts/progress'
import { Dialog, DialogClose } from '~/modules/ui/dialog'
import { Icon } from '~/modules/ui/icon'
import type { ExplanationItem } from '~/services/api/model'

interface ExplanationDialogProps {
  explanations: ExplanationItem[]
  staringIndex: number
  onClose: () => void
}

export function ExplanationDialog({ explanations, staringIndex, onClose }: ExplanationDialogProps) {
  const { height } = useWindowDimensions()
  const modalHeight = (height / 100) * 80
  const flatListRef = useRef<FlatList<ExplanationItem>>(null)
  const [currentStep, helpers] = useStep(explanations.length)
  const currentIndex = currentStep - 1

  useLayoutEffect(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToIndex({
        index: staringIndex,
        animated: true,
      })
    }, 500)
  }, [])

  function handleNext() {
    if (helpers.canGoToNextStep) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      })
    }
  }

  function handlePrev() {
    if (helpers.canGoToPrevStep) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex - 1,
        animated: true,
      })
    }
  }

  const handleViewableItemsChanged = useCallback(
    useCallback(
      ({ viewableItems }: { viewableItems: ViewToken<ExplanationItem>[]; changed: ViewToken<ExplanationItem>[] }) => {
        const item = viewableItems[0]

        if (item?.index !== undefined && item.index !== null) {
          helpers.setStep(item.index + 1)
        }
      },
      [helpers]
    ),
    []
  )

  const renderItem: ListRenderItem<ExplanationItem> = useCallback(({ item }) => {
    return <Item item={item} />
  }, [])

  return (
    <Dialog
      isOpen
      className="w-full flex-1 p-0 relative"
      style={{
        maxHeight: modalHeight,
      }}
    >
      <FlatList
        ref={flatListRef}
        onViewableItemsChanged={handleViewableItemsChanged}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        horizontal
        data={explanations}
        renderItem={renderItem}
      />
      {explanations.length > 1 && (
        <View className="flex flex-row justify-between px-4 pb-4 items-center gap-4">
          <TouchableOpacity onPress={handlePrev}>
            <Icon size="xl" color={helpers.canGoToPrevStep ? 'accent' : 'secondary'} name="chevron-back-outline" />
          </TouchableOpacity>
          <Progress currentIndex={currentIndex} explanationsLength={explanations.length} />
          <TouchableOpacity onPress={handleNext}>
            <Icon size="xl" color={helpers.canGoToNextStep ? 'accent' : 'secondary'} name="chevron-forward-outline" />
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity className="absolute right-0 top-0 p-4">
        <DialogClose onPress={onClose} />
      </TouchableOpacity>
    </Dialog>
  )
}
