import { useCallback, useEffect, useRef } from 'react'
import { useBoolean } from 'usehooks-ts'

export function useInterviewTimer(interviewDurationInMinutes: number) {
  const timerRef = useRef<number | NodeJS.Timeout | null>(null)
  const isOutOfTime = useBoolean(false)

  useEffect(() => {
    startTimer(interviewDurationInMinutes)

    return () => {
      clearTimer()
    }
  }, [])

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
  }, [])

  const startTimer = useCallback(
    (durationInMinutes: number) => {
      clearTimer()

      timerRef.current = setTimeout(
        () => {
          isOutOfTime.setTrue()
        },
        durationInMinutes * 60 * 1000
      )
    },
    [clearTimer, isOutOfTime]
  )

  const extendTime = useCallback(
    (extendedMinutes: number) => {
      isOutOfTime.setFalse()
      startTimer(extendedMinutes)
    },
    [isOutOfTime, startTimer]
  )

  return {
    isOutOfTime: isOutOfTime.value,
    extendTime,
  }
}
