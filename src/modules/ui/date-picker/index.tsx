import { View } from 'react-native'
import React, { useMemo, useState } from 'react'
import { Dialog } from '../dialog'
import { Calendar } from 'react-native-calendars'
import { useTailwindColors } from '~/providers/tailwind-colors-provider'
import { Button } from '../button'
import { MarkingProps } from 'react-native-calendars/src/calendar/day/marking'

interface DatePickerDialogProps {
  isOpen: boolean
  periodPicking?: boolean
  initialStartDate?: string | null
  initialEndDate?: string | null
  onClose: () => void
  onSave?: (params: { startDate: string | null; endDate: string | null }) => void
}

export function DatePickerDialog({
  isOpen,
  onClose,
  periodPicking,
  onSave,
  initialStartDate,
  initialEndDate,
}: DatePickerDialogProps) {
  const colors = useTailwindColors()
  const [startDate, setStartDate] = useState<string | null>(initialStartDate ? initialStartDate : null)
  const [endDate, setEndDate] = useState<string | null>(initialEndDate ? initialEndDate : null)

  function getMarkedDates(startDate: string | null, endDate: string | null) {
    if (!startDate) return undefined

    const currentDate = new Date(startDate)

    if (!endDate || !periodPicking) {
      return {
        [currentDate.toISOString().split('T')[0]]: {
          selected: true,
          selectedColor: colors.accent,
          textColor: colors['bg-primary'],
        },
      }
    }

    const markedDates: Record<string, MarkingProps> = {}
    const end = endDate ? new Date(endDate) : currentDate

    while (currentDate <= end) {
      const dateString = currentDate.toISOString().split('T')[0]
      if (dateString === startDate) {
        markedDates[dateString] = { startingDay: true, color: colors.accent, textColor: colors['bg-primary'] }
      } else if (dateString === endDate) {
        markedDates[dateString] = { endingDay: true, color: colors.accent, textColor: colors['bg-primary'] }
      } else {
        markedDates[dateString] = { color: colors.accent, textColor: colors['bg-primary'] }
      }
      currentDate.setDate(currentDate.getDate() + 1)
    }

    return markedDates
  }

  const markedDates = useMemo(() => getMarkedDates(startDate, endDate), [startDate, endDate, colors])

  const handleDayPress = (day: { dateString: string }) => {
    if (!periodPicking || !startDate || (startDate && endDate)) {
      setStartDate(day.dateString)
      setEndDate(null)
    } else if (startDate && !endDate) {
      if (new Date(day.dateString) < new Date(startDate)) {
        setStartDate(day.dateString)
      } else {
        setEndDate(day.dateString)
      }
    }
  }

  const handleSave = () => {
    if (onSave) {
      onSave({ startDate, endDate })
    }
    onClose()
  }

  return (
    <Dialog isOpen={isOpen} className="w-[90%]">
      <View>
        <Calendar
          theme={{
            arrowColor: colors.accent,
            todayTextColor: colors.accent,
          }}
          markingType={endDate ? 'period' : 'dot'}
          markedDates={markedDates}
          onDayPress={handleDayPress}
        />
        <View className="gap-2">
          <Button variant="outlined" onPress={onClose}>
            Cancel
          </Button>
          <Button onPress={handleSave}>Save</Button>
        </View>
      </View>
    </Dialog>
  )
}
