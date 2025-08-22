import { useCallback, useState } from 'react'
import { Text } from 'react-native'

export interface Measurements {
  x: number
  y: number
  width: number
  height: number
  pageX: number
  pageY: number
}

export function useMeasureElement() {
  const [measurements, setMeasurements] = useState<Measurements | null>(null)

  const measureElement = useCallback(
    (ref: Text | null) => {
      if (measurements || !ref) return

      ref.measure((x, y, width, height, pageX, pageY) => {
        setMeasurements({
          x,
          y,
          width,
          height,
          pageX,
          pageY,
        })
      })
    },
    [measurements]
  )

  return {
    measurements,
    measureElement,
  }
}
