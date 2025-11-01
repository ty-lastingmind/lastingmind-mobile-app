import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { router } from 'expo-router'
import { useCallback } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useBoolean } from 'usehooks-ts'
import { Logo } from '~/modules/components/logo'
import { Avatar } from '~/modules/ui/avatar'
import { Typography } from '~/modules/ui/typography'
import { ImageSrc } from '~/types/images'
import { ConfirmDialog } from '../confirm-dialog'

type NavigationWithDrawer = NativeStackHeaderProps['navigation'] & {
  openDrawer?: () => void
}

type Props = Omit<NativeStackHeaderProps, 'navigation'> & {
  navigation: NavigationWithDrawer
  userAvatar: ImageSrc
  warningOnLeave?: boolean
}

export function BottomTabHeader({ navigation, userAvatar, options, warningOnLeave }: Props) {
  const { value: confirmDialogVisible, setTrue: showConfirmDialog, setFalse: closeConfirmDialog } = useBoolean(false)

  const handleOpenDrawer = useCallback(() => {
    if (navigation.openDrawer) {
      navigation.openDrawer()
    }
  }, [navigation])

  const handleLogo = () => {
    if (warningOnLeave) {
      showConfirmDialog()
      return
    }

    router.navigate('/(protected)/(tabs)/home')
  }

  const handleLeave = () => {
    router.navigate('/(protected)/(tabs)/home')
    closeConfirmDialog()
  }

  return (
    <>
      <SafeAreaView edges={['top']}>
        <View className="h-[56px] relative flex-row items-center justify-between px-8">
          <TouchableOpacity onPress={handleOpenDrawer}>
            <Avatar source={userAvatar} />
          </TouchableOpacity>
          <View className="absolute left-0 top-0 items-center justify-center right-0 bottom-0">
            <Typography level="h5" brand color="accent">
              {String(options.headerTitle || options.title)}
            </Typography>
          </View>
          <TouchableOpacity onPress={handleLogo}>
            <Logo />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {confirmDialogVisible && (
        <ConfirmDialog
          onCancel={handleLeave}
          onConfirm={closeConfirmDialog}
          title="Are you sure you want to leave this page? Your response has not yet been saved."
          yesLabel="Stay"
          noLabel="Leave"
        />
      )}
    </>
  )
}
