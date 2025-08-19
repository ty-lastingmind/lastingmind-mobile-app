import { View } from 'react-native'
import { Typography } from '~/modules/ui/typography'
import { TypographyTyping } from '~/modules/ui/typography-typing'

export function AnimatedTypographyShowcase() {
  return (
    <View className="flex gap-4">
      <Typography level="h2">Animated typography</Typography>
      <View className="flex gap-2">
        <TypographyTyping level="body-lg">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
          industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
          Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum.
        </TypographyTyping>
      </View>
    </View>
  )
}
