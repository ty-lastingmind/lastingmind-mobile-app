import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Button } from '~/modules/ui/button'
import { Dialog, DialogFooter } from '~/modules/ui/dialog'
import { Typography } from '~/modules/ui/typography'

interface OutOfTimeDialogProps {
  onStopInterview: () => void
  onExtendTime: (minutes: number) => void
}

const TIME_OPTIONS = [
  [5, 10],
  [15, 30],
  [45, 60],
]

export function OutOfTimeDialog({ onStopInterview, onExtendTime }: OutOfTimeDialogProps) {
  return (
    <Dialog isOpen>
      <View className="py-4">
        <Typography brand level="h5" weight="semibold" color="primary" className="text-center mb-8">
          Looks like we&#39;re out of time! Would you like to continue?
        </Typography>

        <View className="gap-2">
          {TIME_OPTIONS.map((options, rowIndex) => (
            <View key={rowIndex} className="flex flex-row gap-2">
              {options.map((minutes) => (
                <Button
                  key={minutes}
                  onPress={() => onExtendTime(minutes)}
                  variant="secondary"
                  size="md"
                  btnContainerClassName="flex-1"
                >
                  {minutes} mins
                </Button>
              ))}
            </View>
          ))}
        </View>
      </View>

      <DialogFooter>
        <TouchableOpacity onPress={onStopInterview}>
          <Typography color="red" level="h5" brand className="text-center">
            Stop Interview
          </Typography>
        </TouchableOpacity>
      </DialogFooter>
    </Dialog>
  )
}
