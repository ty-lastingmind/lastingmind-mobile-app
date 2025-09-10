import { Button } from '~/modules/ui/button'
import { Dialog } from '~/modules/ui/dialog'
import { Typography } from '~/modules/ui/typography'

interface SkippedAllQuestionsOverlayProps {
  isOpen: boolean
  onNewTopic: () => void
  onGenerateNewQuestions: () => void
}

export function SkippedAllQuestionsOverlay({
  isOpen,
  onNewTopic,
  onGenerateNewQuestions,
}: SkippedAllQuestionsOverlayProps) {
  return (
    <Dialog isOpen={isOpen} className="w-full gap-6 py-8 px-8">
      <Typography level="h4" weight="normal" color="primary" className="text-center">
        You skipped all the curated questions would you like to move onto a new topic or generate new ones?
      </Typography>

      <Button onPress={onNewTopic}>New Topic</Button>

      <Button onPress={onGenerateNewQuestions} variant="outlined">
        Generate New Questions
      </Button>
    </Dialog>
  )
}
