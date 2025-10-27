import { View } from 'react-native'
import React from 'react'
import { Typography } from '~/modules/ui/typography'
import { assets } from '~/constants/assets'
import { Image } from 'expo-image'
import { Button } from '~/modules/ui/button'
import { Link } from 'expo-router'

const amazonLink =
  'https://www.amazon.com/ZealSound-Microphone-Condenser-Microphones-5-Headphone/dp/B0932BCM2T/ref=sr_1_3_sspa?crid=3TSBM7YZ235M9&dib=eyJ2IjoiMSJ9.kqDm_5moIrh-7pjtU779-QhAUvkpstkMdJCQfN8eExHKo5YZoxHfuG2Xdw6ZrNmwRBMYbPfF3X4mqPR0wFbIauO-nzovd0VBLSh2dboVLRPAnpPQIYL74kjVwM7ETpg7W3WdqzuT20YJdwwzZNp1TSX2htEuW3vDwqvB586iavC_jTPPMLR4FDhCctNb-78JauQvqQxI2Iu1J0e6mAiALlkWRHQwX8jNHkU_WEZ6E2g87k6Ngq0m70z_IKCeUAqtUi4--AHWW8CKRjO7jvWiBixEs94uQ3xQLN5dDHoGkmA.ME9L5Zf96JoRw_YJwYxeHHX3H731LnFEjSb6GC3CTG4&dib_tag=se&keywords=microphone&qid=1759423112&sprefix=microphone%2Caps%2C188&sr=8-3-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1'

export function VoiceCloneRecomendedMic() {
  return (
    <View className="flex-1 p-10">
      <Typography brand level="h3" className="text-center">
        Recommended Microphone
      </Typography>
      <View className="flex-1 items-center justify-center p-8">
        <Image source={assets.recomendedMic} contentFit="contain" style={{ width: '100%', flex: 1 }} />
      </View>
      <Typography level="h5" className="text-center pb-4" weight="light">
        We recommend this microphone. You can easily purchase it on amazon for about $30
      </Typography>
      <Link asChild href={amazonLink} target="_blank">
        <Button>Go to Amazon</Button>
      </Link>
    </View>
  )
}
