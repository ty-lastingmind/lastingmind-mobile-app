import { TouchableOpacity, View } from 'react-native'
import React, { useMemo, useState } from 'react'
import { Dialog } from '../dialog'
import { Calendar } from 'react-native-calendars'
import { useTailwindColors } from '~/providers/tailwind-colors-provider'
import { Button } from '../button'
import { MarkingProps } from 'react-native-calendars/src/calendar/day/marking'
import { Typography } from '../typography'
import { cn } from '~/utils/cn'
import { Icon } from '../icon'
import { formatToMMDDYYYY } from '~/utils/date'

interface DatePickerDialogProps {
  isOpen: boolean
  periodPicking?: boolean
  startDateValue?: string
  endDateValue?: string
  onClose: () => void
  onSave?: (params: { startDate?: string; endDate?: string }) => void
}

export function DatePickerDialog({
  isOpen,
  onClose,
  periodPicking,
  onSave,
  startDateValue,
  endDateValue,
}: DatePickerDialogProps) {
  const colors = useTailwindColors()
  const [startDate, setStartDate] = useState<string | undefined>(startDateValue ? startDateValue : undefined)
  const [endDate, setEndDate] = useState<string | undefined>(endDateValue ? endDateValue : undefined)

  function getMarkedDates(startDate: string | undefined, endDate: string | undefined) {
    if (!startDate) return undefined

    const currentDate = new Date(startDate)

    if (!endDate || !periodPicking || startDate === endDate) {
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
      setEndDate(undefined)
    } else if (startDate && !endDate) {
      if (new Date(day.dateString) < new Date(startDate)) {
        setStartDate(day.dateString)
      } else {
        setEndDate(day.dateString)
      }
    }
  }

  const handleClose = () => {
    onClose()
    setStartDate(startDateValue)
    setEndDate(endDateValue)
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
          markingType={endDate || startDate === endDate ? 'period' : 'dot'}
          markedDates={markedDates}
          onDayPress={handleDayPress}
        />
        <View className="gap-2">
          <Button variant="outlined" onPress={handleClose}>
            Cancel
          </Button>
          <Button onPress={handleSave}>Save</Button>
        </View>
      </View>
    </Dialog>
  )
}

interface DatePickerProps {
  placeholder?: string
  periodPicking?: boolean
  startDateValue?: string
  endDateValue?: string
  className?: string
  isError?: boolean
  onSave?: (params: { startDate?: string; endDate?: string }) => void
}

export function DatePicker({
  startDateValue,
  endDateValue,
  onSave,
  placeholder = '',
  periodPicking,
  className,
  isError,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)

  const containerClassName = cn(
    'gap-2 rounded-md px-3.5 min-h-md py-2 flex flex-row items-center justify-between bg-bg-secondary',
    isError && 'border-input-border--error',
    className
  )

  const textClassName = cn(
    'flex-1 text-primary',
    !startDateValue && !endDateValue && placeholder && 'text-input-placeholder',
    isError && 'text-input-placeholder--error'
  )

  const text = startDateValue
    ? `${formatToMMDDYYYY(startDateValue)}${endDateValue ? ' - ' + formatToMMDDYYYY(endDateValue) : ''}`
    : placeholder

  return (
    <>
      <TouchableOpacity onPress={() => setIsOpen(true)}>
        <View className={containerClassName}>
          <Typography className={textClassName}>{text}</Typography>
          <Icon name="chevron-forward" color={isError ? 'red' : 'primary'} />
        </View>
      </TouchableOpacity>
      <DatePickerDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        periodPicking={periodPicking}
        startDateValue={startDateValue}
        endDateValue={endDateValue}
        onSave={onSave}
      />
    </>
  )
}
