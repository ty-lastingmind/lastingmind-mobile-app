import { ActivityIndicator, View } from 'react-native'
import { font } from '~/constants/fonts'
import { Avatar } from '~/modules/ui/avatar'
import { Button } from '~/modules/ui/button'
import { Dialog } from '~/modules/ui/dialog'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { Typography } from '~/modules/ui/typography'
import type { UIActiveInivteItem } from '~/services/api/model'

interface InvitationModalProps {
  isOpen: boolean
  invitation?: UIActiveInivteItem
  onAccept: () => void
  onDecline: () => void
  isLoading?: boolean
  loadingText?: string
}

export function InvitationModal({
  isOpen,
  invitation,
  onAccept,
  onDecline,
  isLoading,
  loadingText,
}: InvitationModalProps) {
  if (!invitation) return null

  return (
    <Dialog isOpen={isOpen} className="w-full max-w-md gap-8 py-8 px-6 items-center">
      {isLoading ? (
        <View className="flex-1 justify-center items-center bg-bg-primary">
          <ActivityIndicator />
          <Typography level="h4" weight="medium" className="text-accent">
            {loadingText}
          </Typography>
        </View>
      ) : (
        <>
          <View className="items-center w-full">
            <View className="relative w-[219px] h-[221px] items-center justify-center">
              <SvgIcon name="envelope" size="7xl" color="accent" />
              <View className="absolute top-[26%]">
                <Avatar source={invitation.profile_image ? { uri: invitation.profile_image } : undefined} size="md" />
              </View>
            </View>

            <Typography
              level="h2"
              weight="bold"
              className="text-center"
              style={{ fontFamily: font.family.InriaSerif.Regular }}
            >
              {invitation.sender_full_name} Sent{'\n'}You an Invitation!
            </Typography>
          </View>

          <View className="gap-4 w-full">
            <Button
              onPress={onAccept}
              variant="primary"
              size="lg"
              disabled={isLoading}
              btnContainerClassName="rounded-sm"
              textClassName="font-semibold"
            >
              Accept Invitation
            </Button>
            <Button onPress={onDecline} variant="whitesecondary" size="lg" disabled={isLoading}>
              Decline Invitation
            </Button>
          </View>
        </>
      )}
    </Dialog>
  )
}
