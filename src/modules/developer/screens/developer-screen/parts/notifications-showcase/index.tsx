import { useQuery } from '@tanstack/react-query'
import { View } from 'react-native'
import { Typography } from '~/modules/ui/typography'
import { Notifications } from '~/services'

export function NotificationsShowcase() {
  const notificationTokenQuery = useQuery({
    queryKey: ['notificationToken'],
    queryFn: () => Notifications.getToken(),
  })

  return (
    <View className="flex gap-4">
      <Typography level="h2">Notifications</Typography>

      <View className="flex gap-2">
        <Typography level="h3">Notification token</Typography>
        <Typography selectable level="body-1">
          {notificationTokenQuery.data ?? 'No token'}
          {notificationTokenQuery.error && (
            <Typography level="body-1">
              {notificationTokenQuery.error.name}
              {'\n'}
              {notificationTokenQuery.error.message}
            </Typography>
          )}
        </Typography>
      </View>
    </View>
  )
}
