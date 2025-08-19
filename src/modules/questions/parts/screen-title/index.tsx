import { Typography } from '~/modules/ui/typography'

interface ScreenTitleProps {
  children: string
}

export function ScreenTitle({ children }: ScreenTitleProps) {
  return (
    <Typography color="accent" brand level="h5" className="text-center">
      {children}
    </Typography>
  )
}
