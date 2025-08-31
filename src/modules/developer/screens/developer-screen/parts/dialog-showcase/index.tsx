import { View } from 'react-native'
import { useBoolean } from 'usehooks-ts'
import { ConfirmDialog } from '~/components/confirm-dialog'
import { AnswerFormDialog } from '~/modules/chat/screens/chat-screen/parts/answer-form-dialog'
import { OutOfTimeDialog } from '~/modules/interview/screens/04-chat/parts/out-of-time-dialog'
import { TranscriptDialog } from '~/modules/interview/screens/04-chat/parts/transcript-dialog'
import { Button } from '~/modules/ui/button'
import { Typography } from '~/modules/ui/typography'

function OutOfTimeDialogShowcase() {
  const isOpen = useBoolean(false)

  return (
    <>
      <Button onPress={isOpen.setTrue}>Out of time dialog</Button>
      {isOpen.value && <OutOfTimeDialog onStopInterview={isOpen.setFalse} onExtendTime={isOpen.setFalse} />}
    </>
  )
}

function TranscriptDialogShowcase() {
  const isOpen = useBoolean(false)

  return (
    <>
      <Button onPress={isOpen.setTrue}>Transcript dialog</Button>
      {isOpen.value && (
        <TranscriptDialog
          onClose={isOpen.setFalse}
          message={{
            isLoading: false,
            text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            isIncoming: true,
            audioUrl: 'https://www.w3schools.com/html/horse.mp3',
            index: 0,
          }}
          onSaveChanges={isOpen.setFalse}
        />
      )}
    </>
  )
}

export function AnswerFormDialogShowcase() {
  const isOpen = useBoolean(false)

  return (
    <>
      <Button onPress={isOpen.setTrue}>Answer form dialog</Button>
      {isOpen.value && <AnswerFormDialog title="Add answer" onSave={isOpen.setFalse} onClose={isOpen.setFalse} />}
    </>
  )
}

export function ConfirmDialogShowcase() {
  const isOpen = useBoolean(false)

  return (
    <>
      <Button onPress={isOpen.setTrue}>Confirm dialog</Button>
      {isOpen.value && (
        <ConfirmDialog
          onConfirm={isOpen.setFalse}
          onCancel={isOpen.setFalse}
          title="Would you like to add a new answer?"
        />
      )}
    </>
  )
}

export function DialogShowcase() {
  return (
    <View className="flex gap-4">
      <Typography level="h2">Dialog</Typography>
      <View className="flex gap-2">
        <TranscriptDialogShowcase />
        <OutOfTimeDialogShowcase />
        <AnswerFormDialogShowcase />
        <ConfirmDialogShowcase />
      </View>
    </View>
  )
}
