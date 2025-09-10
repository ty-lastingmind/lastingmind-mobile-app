import { Button } from '~/modules/ui/button'
import { SvgIcon } from '~/modules/ui/svg-icon'

interface InitialStateProps {
  onRecord: () => void
  onWrite: () => void
  onSaveForLater: () => void
}

export function InitialState({ onRecord, onWrite, onSaveForLater }: InitialStateProps) {
  return (
    <>
      <Button
        onPress={onRecord}
        size="lg"
        btnContainerClassName="bg-accent border-0"
        icon={<SvgIcon name="mic" size="sm" color="white" />}
      >
        Record Answer
      </Button>

      <Button
        variant="outlined"
        onPress={onWrite}
        size="lg"
        icon={<SvgIcon name="write_answer" size="sm" color="accent" />}
      >
        Write Answer
      </Button>

      <Button variant="white" size="lg" onPress={onSaveForLater}>
        Save for Later
      </Button>
    </>
  )
}
