import { View } from 'react-native'
import { Typography } from '~/modules/ui/typography'
import { useSettings } from '../../contexts/settings-context'

export function UserCurrentField() {
  const { currentValues } = useSettings()

  return (
    <View className="flex flex-row items-center justify-between bg-bg-secondary h-[52px] px-[24px] gap-[12px] rounded-[20px]">
      <Typography brand level="h5" weight="bold" color="accent">
        Current
      </Typography>
      <Typography level="body-1" color="primary" className="text-right flex-1 ml-4">
        {currentValues.displayName}
      </Typography>
    </View>
  )
}
