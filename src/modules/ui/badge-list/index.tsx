import { TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native'
import { Badge } from '../badge'
import { Typography } from '../typography'
import { useBoolean } from 'usehooks-ts'
import { cn } from '~/utils/cn'

interface BadgeListProps {
  list: string[]
  selectedBadge?: string
  onBadgePress?: (label: string) => void
  size?: 'sm' | 'md' | 'lg'
  badgeContainerClassName?: string
  badgeTextClassName?: string
}

export default function BadgeList({
  list,
  selectedBadge,
  onBadgePress,
  size = 'md',
  badgeContainerClassName,
  badgeTextClassName,
}: BadgeListProps) {
  const { value: isExpanded, toggle: toggleExpanded } = useBoolean(false)

  const containerClassName = cn('rounded-full', badgeContainerClassName)
  const textClassName = cn('', badgeTextClassName)

  return (
    <View>
      <FlatList
        horizontal={!isExpanded}
        scrollEnabled={!isExpanded}
        data={list}
        keyExtractor={(item) => item}
        renderItem={({ item: label }) => (
          <TouchableOpacity onPress={() => onBadgePress?.(label)}>
            <Badge
              variant={selectedBadge === label ? 'primary' : 'outlined'}
              label={label}
              size={size}
              containerClassName={containerClassName}
              textClassName={textClassName}
            />
          </TouchableOpacity>
        )}
        contentContainerClassName="gap-2 flex-row flex-wrap"
        showsHorizontalScrollIndicator={false}
      />
      {list.length > 5 && (
        <TouchableOpacity className="pt-4" onPress={toggleExpanded}>
          <Typography color="secondary">{isExpanded ? 'View Less' : 'View All'}</Typography>
        </TouchableOpacity>
      )}
    </View>
  )
}
