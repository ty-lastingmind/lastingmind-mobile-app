import { View, TouchableOpacity } from 'react-native'
import { Dialog } from '~/modules/ui/dialog'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { Typography } from '~/modules/ui/typography'

export default function TosDialog({ isOpen = false, onClose }: { isOpen?: boolean; onClose: () => void }) {
  return (
    <Dialog isOpen={isOpen}>
      <View className="items-center px-4 gap-4">
        <TouchableOpacity className="w-full flex-row justify-end" onPress={onClose}>
          <SvgIcon name="close" />
        </TouchableOpacity>
        <SvgIcon name="shield" />
        <Typography brand level="h3" className="text-center">
          Terms of Service
        </Typography>
        <Typography className="text-center">
          Lorem ipsum dolor sit amet consectetur. Netus consectetur odio sed pellentesque cursus enim tortor. Amet
          adipiscing sagittis sem odio amet. Facilisis ornare elit eros ullamcorper venenatis. Non eget feugiat diam
          ultrices nunc aliquet. Ut est duis tempor turpis velit. Nulla varius tortor aenean nulla sed ligula orci
          vulputate nunc. Elementum non in tellus tincidunt ullamcorper mauris sit pulvinar. Et cras sed dictum
          consectetur. Ornare elit fermentum imperdiet ipsum orci. Dignissim pellentesque curabitur risus sed leo
          ridiculus lacus. Curabitur quis nisl at laoreet risus egestas vitae lorem amet.
        </Typography>
        <Typography className="text-center mt-24" level="caption-1">
          By signing up to LastingMind you agree to this Terms of Service
        </Typography>
      </View>
    </Dialog>
  )
}
