import { View } from 'react-native'
import { Typography } from '~/modules/ui/typography'

export function SavingJournalEntry() {
  return (
    <View className="flex items-center justify-center flex-1 gap-8 pb-[85%]">
      <Typography brand level="h1" color="accent">
        LastingMind
      </Typography>
      <Typography brand level="h5" color="accent">
        Saving Journal Entry...
      </Typography>
    </View>
  )
}
