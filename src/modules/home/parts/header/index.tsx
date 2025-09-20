import { View } from 'react-native'
import { Typography } from '~/modules/ui/typography'
import { TopContainer } from '~/services/api/model'
import { Banner } from '../banner'

interface HomeHeaderProps {
  topContainer: TopContainer | null
  progressPercent: number
}

export function HomeHeader({ topContainer, progressPercent }: HomeHeaderProps) {
  return (
    <View className="gap-6 mb-6">
      <Banner topContainer={topContainer} progressPercent={progressPercent} />

      <Typography level="h4" weight="normal" color="primary" brand>
        Quick Actions
      </Typography>
    </View>
  )
}
