import { View } from 'react-native'

import { Typography } from '~/modules/ui/typography'

export function TypographyShowcase() {
  return (
    <View className="flex gap-4">
      <Typography level="h2">Typography</Typography>

      <View className="flex gap-2">
        <Typography level="h3">Typography levels</Typography>
        <Typography level="h1">Heading 1</Typography>
        <Typography level="h2">Heading 2</Typography>
        <Typography level="h3">Heading 3</Typography>
        <Typography level="h4">Heading 4</Typography>
        <Typography level="h5">Heading 5</Typography>
        <Typography level="h6">Heading 6</Typography>
        <Typography level="body-1">Body 1 text</Typography>
        <Typography level="body-2">Body 2 text</Typography>
        <Typography level="label-1">Label 1</Typography>
        <Typography level="label-2">Label 2</Typography>
        <Typography level="caption-1">Caption 1</Typography>
        <Typography level="caption-2">Caption 2</Typography>
        <Typography level="overline-1">OVERLINE 1</Typography>
        <Typography level="overline-2">OVERLINE 2</Typography>
      </View>
      <View>
        <Typography level="h3">Typography brand</Typography>
        <Typography level="h1" brand>
          Typography brand
        </Typography>
      </View>

      <View className="flex gap-2">
        <Typography level="h3">Typography weights</Typography>
        <Typography level="body-1" weight="light">
          Light weight text
        </Typography>
        <Typography level="body-1" weight="normal">
          Normal weight text
        </Typography>
        <Typography level="body-1" weight="medium">
          Medium weight text
        </Typography>
        <Typography level="body-1" weight="semibold">
          Semibold weight text
        </Typography>
        <Typography level="body-1" weight="bold">
          Bold weight text
        </Typography>
      </View>

      <View className="flex gap-2">
        <Typography level="h3">Typography colors</Typography>
        <Typography level="body-1" color="primary">
          Primary color text
        </Typography>
        <Typography level="body-1" color="secondary">
          Secondary color text
        </Typography>
        <Typography level="body-1" color="tertiary">
          Tertiary color text
        </Typography>
      </View>
    </View>
  )
}
