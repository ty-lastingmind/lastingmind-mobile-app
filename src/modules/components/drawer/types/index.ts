import { Href } from 'expo-router'
import { SvgIconName } from '~/modules/ui/svg-icon/index.types'

export type DrawerJournalItem = {
  title: string
  icon: SvgIconName
  href?: Href
  subItems?: DrawerJournalItem[]
  avatarSource?: { uri: string | undefined }
}
