import { TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native'
import { Badge } from '../badge'
import { Typography } from '../typography'
import { useBoolean } from 'usehooks-ts'

interface BadgeListProps {
  list: string[]
  selectedBadge?: string
  onBadgePress?: (label: string) => void
  size?: 'sm' | 'md' | 'lg'
}

export default function BadgeList({ list, selectedBadge, onBadgePress, size = 'md' }: BadgeListProps) {
  const { value: isExpanded, toggle: toggleExpanded } = useBoolean(false)

  return (
    <View>
      <FlatList
        horizontal={!isExpanded}
        data={list}
        keyExtractor={(item) => item}
        renderItem={({ item: label }) => (
          <TouchableOpacity onPress={() => onBadgePress?.(label)}>
            <Badge
              variant={selectedBadge === label ? 'primary' : 'outlined'}
              label={label}
              size={size}
              containerClassName="rounded-full"
            />
          </TouchableOpacity>
        )}
        contentContainerClassName="gap-2 flex-row flex-wrap"
        showsHorizontalScrollIndicator={false}
      />
      {list.length > 5 && (
        <TouchableOpacity className="py-4" onPress={toggleExpanded}>
          <Typography color="secondary">View All</Typography>
        </TouchableOpacity>
      )}
    </View>
  )
}
