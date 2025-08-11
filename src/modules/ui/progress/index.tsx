import { View } from 'react-native'

interface ProgressProps {
  value: number
}

export function Progress({ value }: ProgressProps) {
  return (
    <View className="bg-bg-secondary h-[15px] w-full relative rounded-full">
      <View
        className="bg-accent h-full absolute rounded-full"
        style={{
          width: `${value}%`,
        }}
      />
    </View>
  )
}
