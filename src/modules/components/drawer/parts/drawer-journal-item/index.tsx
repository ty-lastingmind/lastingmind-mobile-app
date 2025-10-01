import { TouchableOpacity } from 'react-native'
import { Avatar } from '~/modules/ui/avatar'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { Typography } from '~/modules/ui/typography'
import { DrawerJournalItem as DrawerJournalItemType } from '../../types'

type DrawerJournalItemProps = {
  item: DrawerJournalItemType
  showArrow?: boolean
  onPress: () => void
}

export const DrawerJournalItem = ({ item, onPress, showArrow }: DrawerJournalItemProps) => {
  return (
    <TouchableOpacity className="flex-row gap-4 items-center h-[64px]" onPress={onPress}>
      {item.avatarSource ? (
        <Avatar source={item.avatarSource} size="sm" />
      ) : (
        <SvgIcon color="accent" name={item.icon} size="lg" />
      )}
      <Typography color="accent" level="body-lg" brand className="flex-1">
        {item.title}
      </Typography>
      {showArrow && <SvgIcon name="arrow_right" color="secondary" size="lg" />}
    </TouchableOpacity>
  )
}
