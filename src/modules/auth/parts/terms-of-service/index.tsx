import React, { useState } from 'react'
import { View } from 'react-native'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { Typography } from '~/modules/ui/typography'
import TosDialog from '../tos-dialog'

export default function TermsOfService() {
  const [open, setOpen] = useState(false)

  return (
    <View className="items-center py-8 gap-4">
      <SvgIcon name="shield" />
      <Typography level="label-1" className="text-center" color="secondary">
        By creating an account with LastingMind you agree to our terms and conditions.{' '}
        <Typography
          color="accent"
          onPress={() => {
            setOpen(true)
          }}
        >
          Learn More
        </Typography>
      </Typography>
      <TosDialog isOpen={open} onClose={() => setOpen(false)} />
    </View>
  )
}
