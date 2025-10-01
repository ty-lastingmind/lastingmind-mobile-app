import { format } from 'date-fns'

export function formatDate(date: Date | string) {
  return format(date, 'MMMM d, yyyy')
}

export const formatToMMDDYYYY = (date: string) => {
  const [year, month, day] = date.split('-')
  return format(new Date(Number(year), Number(month) - 1, Number(day)), 'MM/dd/yyyy')
}
