import { Typography, TypographyProps } from '~/modules/ui/typography'

export function Logo({ level = 'h2' }: TypographyProps) {
  return (
    <Typography level={level} brand color="accent">
      LM
    </Typography>
  )
}
