import { ConfirmDialog } from '~/components/confirm-dialog'
import { addAnswerAtom, confirmAddAnswerAtom } from '../../index.store'
import { useAtom, useSetAtom } from 'jotai'

export function ConfirmAddAnswerDialog() {
  const [confirmAddAnswer, setConfirmAddAnswer] = useAtom(confirmAddAnswerAtom)
  const setAddAnswer = useSetAtom(addAnswerAtom)

  if (!confirmAddAnswer) return null

  return (
    <ConfirmDialog
      title="Would you like to add a new answer?"
      onConfirm={() => {
        setAddAnswer(confirmAddAnswer)
        setConfirmAddAnswer(null)
      }}
      onCancel={() => {
        setConfirmAddAnswer(null)
      }}
    />
  )
}
