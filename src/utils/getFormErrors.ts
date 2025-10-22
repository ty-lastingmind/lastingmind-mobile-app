import { FieldErrors, FieldValues } from 'react-hook-form'

export const getFormErrors = <T extends FieldValues>(errors: FieldErrors<T>): string => {
  const errorMessages: string[] = []

  Object.keys(errors).forEach((key) => {
    const error = errors[key as keyof typeof errors]
    if (error?.message) {
      errorMessages.push(error.message as string)
    }
  })

  return errorMessages.join(', ')
}
