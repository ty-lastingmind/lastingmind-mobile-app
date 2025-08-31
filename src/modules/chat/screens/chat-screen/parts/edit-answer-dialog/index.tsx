import { useAtom } from 'jotai'
import { AnswerFormDialog } from '~/modules/chat/screens/chat-screen/parts/answer-form-dialog'
import { confirmEditAnswerAtom, editMessageAtom } from '../../index.store'
import { AnswerFormData } from '../answer-form-dialog/hooks/use-answer-form'

export function EditAnswerDialog() {
  const [editAnswer, setEditAnswer] = useAtom(editMessageAtom)
  const [, setConfirmEditAnswer] = useAtom(confirmEditAnswerAtom)

  function handleSave(data: AnswerFormData) {
    setEditAnswer(null)
    setConfirmEditAnswer(data)
  }

  if (!editAnswer) return null

  return (
    <AnswerFormDialog
      defaultValues={{ question: editAnswer.question.text, answer: editAnswer.answer.text }}
      title="Edit answer"
      onSave={handleSave}
      onClose={() => setEditAnswer(null)}
    />
  )
}
