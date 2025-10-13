import React from 'react'
import { View } from 'react-native'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { Typography } from '~/modules/ui/typography'
import TosDialog from '../tos-dialog'
import { useBoolean } from 'usehooks-ts'

interface TermsOfServiceProps {
  isChatUser?: boolean
}

export default function TermsOfService({ isChatUser = false }: TermsOfServiceProps) {
  const { value: open, setTrue, setFalse } = useBoolean(false)

  return (
    <View className="items-center py-8 gap-4">
      {isChatUser ? (
        <Typography level="h5" className="text-center" color="accent" brand>
          Chat User
        </Typography>
      ) : null}
      <SvgIcon name="shield" size="xl" />
      <Typography level="label-1" className="text-center" color="secondary">
        By creating an account with LastingMind you agree to our terms and conditions.{' '}
        <Typography color="accent" onPress={setTrue}>
          Learn More
        </Typography>
      </Typography>
      <TosDialog isOpen={open} onClose={setFalse} />
    </View>
  )
}
