import { Link } from 'expo-router'
import { View } from 'react-native'
import { Typography } from '~/modules/ui/typography'

export default function Questions() {
  return (
    <View className="pt-safe">
      <Typography>Questions</Typography>
      <Link href="/questions/journal/add/01-select-topic">
        <Typography>Journal</Typography>
      </Link>
      <Link href="/questions/interview/add/01-select-topic">
        <Typography>Interview</Typography>
      </Link>
    </View>
  )
}
