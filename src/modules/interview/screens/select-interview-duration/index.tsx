import { View } from 'react-native'
import { useInterviewFormContext } from '~/modules/interview/hooks/use-add-journal-entry-form-context'
import { interviewDurationOptions } from '~/modules/interview/screens/select-interview-duration/index.static'
import { ScreenContainer } from '~/modules/questions/parts/screen-container'
import { ScreenTitle } from '~/modules/questions/parts/screen-title'
import { Button } from '~/modules/ui/button'
import { Typography } from '~/modules/ui/typography'

export function SelectInterviewDurationScreen() {
  const form = useInterviewFormContext()
  const interviewDurationInMinutes = form.watch('interviewDurationInMinutes')

  function handleChangeInterviewDuration(value: number) {
    form.setValue('interviewDurationInMinutes', value)
  }

  return (
    <ScreenContainer>
      <ScreenTitle>How much time do you have right now?</ScreenTitle>
      <View className="gap-4 flex-1">
        {interviewDurationOptions.map((option, index) => (
          <Button
            onPress={() => handleChangeInterviewDuration(option)}
            key={index}
            variant={interviewDurationInMinutes === option ? 'primary' : 'outlinedSecondary'}
          >
            {option} mins
          </Button>
        ))}
      </View>
      <Typography level="body-1" className="text-center" color="secondary">
        Don’t worry, you will be able to stop the interview any time and resume later.
      </Typography>
      <Button
        variant={interviewDurationInMinutes ? 'primary' : 'outlinedSecondary'}
        onPress={() => console.log('Start')}
      >
        Start
      </Button>
    </ScreenContainer>
  )
}
