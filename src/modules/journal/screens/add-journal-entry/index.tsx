import { TextInput, View } from 'react-native'
import { AudioRecorder } from '~/modules/journal/screens/add-journal-entry/parts/audio-recorder'
import { AudioTracksList } from '~/modules/journal/screens/add-journal-entry/parts/audio-tracks-list'
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
            value="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            placeholder="Enter Answer..."
            scrollEnabled
            className="text-body-1 text-typography-primary p-6"
            placeholderTextColor="text-label-secondary"
          />
        </View>
        <View className="border-t-2 border-miscellaneous-topic-stroke">
          <AudioTracksList />
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
