import React from 'react'
import { useAddJournalEntryFormContext } from '~/modules/journal/hooks/use-add-journal-entry-form-context'
import { Button } from '~/modules/ui/button'

interface SubmitButtonProps {
  onSubmit: () => void
}

export function SubmitButton({ onSubmit }: SubmitButtonProps) {
  const form = useAddJournalEntryFormContext()
  const hasText = Boolean(form.watch('text'))

  return (
    <Button disabled={!hasText} onPress={onSubmit} variant={hasText ? 'primary' : 'outlined'}>
      Submit
    </Button>
  )
}
