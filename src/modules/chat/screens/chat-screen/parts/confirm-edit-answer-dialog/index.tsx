import { useAtom } from 'jotai'
import { Alert, View } from 'react-native'
import { MessagesList } from '~/modules/components/chat/messages-list'
import { Button } from '~/modules/ui/button'
import { Dialog } from '~/modules/ui/dialog'
import { Typography } from '~/modules/ui/typography'
import { useEditAnswerChatEditAnswerPost } from '~/services/api/generated'
import { confirmEditAnswerAtom } from '../../index.store'
import { ImageSrc } from '~/types/images'

interface ConfirmEditAnswerDialogProps {
  avatarUrl: ImageSrc
  conversationId: string
  chattingWithViewId: string
}

export function ConfirmEditAnswerDialog({
  avatarUrl,
  conversationId,
  chattingWithViewId,
}: ConfirmEditAnswerDialogProps) {
  const [data, setData] = useAtom(confirmEditAnswerAtom)
  const editAnswerMutation = useEditAnswerChatEditAnswerPost()

  function handleSave() {
    if (!data) return

    editAnswerMutation.mutate(
      {
        data: {
          chattingWithViewId,
          newAnswer: data.answer,
          convoId: conversationId,
        },
      },
      {
        onSuccess: () => {
          setData(null)
        },
        onError: () => {
          Alert.alert('Error', 'Failed to save answer')
        },
      }
    )
  }

  function handleClose() {
    setData(null)
  }

  if (!data) return null

  return (
    <Dialog isOpen className="flex-1 max-h-[65vh] gap-6 w-full py-6">
      <Typography level="h5" className="text-center">
        Do you want to remember this answer for next time?
      </Typography>
      <View className="rounded-md border border-bg-secondary flex-1">
        <MessagesList
          contentContainerClassName="p-4"
          avatarUrl={avatarUrl}
          messages={[
            {
              index: 0,
              text: data.question,
              isIncoming: false,
              isLoading: false,
            },
            {
              index: 1,
              text: data.answer,
              isIncoming: true,
              isLoading: false,
            },
          ]}
        />
      </View>
      <View className="flex flex-row gap-2 justify-center">
        <Button disabled={editAnswerMutation.isPending} onPress={handleClose} variant="outlined" size="sm">
          No
        </Button>
        <Button loading={editAnswerMutation.isPending} onPress={handleSave} size="sm">
          Yes
        </Button>
      </View>
      <Typography className="text-center" color="secondary">
        Your LastingMind will reuse this answer whenever this question is asked again.
      </Typography>
    </Dialog>
  )
}
