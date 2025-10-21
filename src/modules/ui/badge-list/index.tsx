import React from 'react'
import { FlatList, ScrollView, TouchableOpacity, View } from 'react-native'
import { useBoolean } from 'usehooks-ts'
import { cn } from '~/utils/cn'
import { Badge } from '../badge'
import { Typography } from '../typography'

interface BadgeListProps {
  list: string[]
  selectedBadge?: number
  onBadgePress?: (index: number) => void
  size?: 'sm' | 'md' | 'lg'
  badgeContainerClassName?: string
  badgeTextClassName?: string
  rows?: number
}

export default function BadgeList({
  list,
  selectedBadge,
  onBadgePress,
  size = 'md',
  badgeContainerClassName,
  badgeTextClassName,
  rows = 1,
}: BadgeListProps) {
  const { value: isExpanded, toggle: toggleExpanded } = useBoolean(false)

  const containerClassName = cn('rounded-full', !isExpanded && rows > 1 && 'mr-2', badgeContainerClassName)
  const flatListRows = Math.ceil(list.length / rows)

  return (
    <View>
      {isExpanded || rows <= 1 ? (
        <View>
          <FlatList
            horizontal={!isExpanded}
            scrollEnabled={!isExpanded}
            data={list}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item: label, index }) => (
              <TouchableOpacity onPress={() => onBadgePress?.(index)}>
                <Badge
                  variant={selectedBadge === index ? 'primary' : 'outlined'}
                  label={label}
                  size={size}
                  containerClassName={containerClassName}
                  textClassName={selectedBadge === index ? '' : badgeTextClassName}
                />
              </TouchableOpacity>
            )}
            contentContainerClassName="gap-2 flex-row flex-wrap"
            showsHorizontalScrollIndicator={false}
          />
        </View>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <FlatList
            scrollEnabled={false}
            contentContainerClassName="gap-2"
            numColumns={flatListRows <= 1 ? 2 : flatListRows}
            data={list}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item: label, index }) => (
              <TouchableOpacity onPress={() => onBadgePress?.(index)}>
                <Badge
                  variant={selectedBadge === index ? 'primary' : 'outlined'}
                  label={label}
                  size={size}
                  containerClassName={containerClassName}
                  textClassName={badgeTextClassName}
                />
              </TouchableOpacity>
            )}
          />
        </ScrollView>
      )}

      {list.length > 5 && (
        <TouchableOpacity className="pt-4" onPress={toggleExpanded}>
          <Typography color="secondary">{isExpanded ? 'View Less' : 'View All'}</Typography>
        </TouchableOpacity>
      )}
    </View>
  )
}
