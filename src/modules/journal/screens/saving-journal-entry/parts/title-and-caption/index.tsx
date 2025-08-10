import { View } from 'react-native'
import { Typography } from '~/modules/ui/typography'

interface TitleAndCaptionProps {
  title: string
  caption: string
}

export function TitleAndCaption({ title, caption }: TitleAndCaptionProps) {
  return (
    <View className="flex items-center justify-center flex-1 gap-8 pb-[85%]">
      <Typography className="text-center" brand level="h1" color="accent">
        {title}
      </Typography>
      <Typography className="text-center" brand level="h5" color="accent">
        {caption}
      </Typography>
    </View>
  )
}
