import { View } from 'react-native'
import { Progress } from '~/modules/ui/progress'
import { Typography } from '~/modules/ui/typography'
import { Stats } from '~/services/api/model'

interface TrophyModalProps {
  stats?: Stats
}

export function TrophyModal({ stats = {} as Stats }: TrophyModalProps) {
  const { progress_percent = 0, num_questions_answered = 0, mins_of_interview = 0, num_journals = 0 } = stats

  return (
    <View className="shadow-md">
      <View className="w-full bg-bg-primary">
        <View className="pb-10 mx-4 mt-8">
          <View className="gap-4 mb-6">
            <View className="flex-row items-center gap-3">
              <Progress value={progress_percent} size="md" color="accent" />
              <Typography level="h5" weight="semibold" color="accent" brand>
                {progress_percent}%
              </Typography>
            </View>

            <View className="gap-1">
              <Typography level="body-lg" color="secondary">
                You are {progress_percent}% of the way to
              </Typography>
              <Typography level="body-lg" color="secondary">
                Intermediate
              </Typography>
            </View>
          </View>

          <View className="gap-4">
            <View className="flex-row items-center gap-2">
              <Typography level="h5" weight="semibold" color="accent" brand>
                {num_questions_answered}
              </Typography>
              <Typography level="body-1" color="secondary">
                Questions Answered
              </Typography>
            </View>

            <View className="flex-row items-center gap-2">
              <Typography level="h5" weight="semibold" color="accent" brand>
                {mins_of_interview}
              </Typography>
              <Typography level="body-1" color="secondary">
                Minutes of Interviews
              </Typography>
            </View>

            <View className="flex-row items-center gap-2">
              <Typography level="h5" weight="semibold" color="accent" brand>
                {num_journals}
              </Typography>
              <Typography level="body-1" color="secondary">
                Journal Entries
              </Typography>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}
