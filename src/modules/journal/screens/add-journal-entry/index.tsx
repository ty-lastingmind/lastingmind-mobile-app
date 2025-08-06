import { TextInput, View } from 'react-native'
import { AudioRecorder } from '~/modules/journal/screens/add-journal-entry/parts/audio-recorder'
import { Button } from '~/modules/ui/button'
import { Typography } from '~/modules/ui/typography'

export function AddJournalEntryScreen() {
  return (
    <View className="px-4 pt-6 flex-1 pb-safe gap-5">
      <View className="gap-2">
        <Typography color="accent" level="h5" brand>
          Add Journal Entry
        </Typography>
        <Typography level="body-1" color="secondary">
          Add Journal Entry
        </Typography>
      </View>
      <View className="border-2 border-miscellaneous-topic-stroke flex-1 rounded-md">
        <View className="flex-1">
          <TextInput
            multiline
            placeholder="Enter Answer..."
            scrollEnabled
            className="text-body-1 text-typography-primary p-6"
            placeholderTextColor="text-label-secondary"
          />
        </View>
        <View className="border-t-2 border-miscellaneous-topic-stroke p-3">
          <AudioRecorder />
        </View>
      </View>
      <View className="px-4">
        <Button>Submit</Button>
      </View>
    </View>
  )
}
