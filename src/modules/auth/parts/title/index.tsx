import { PropsWithChildren } from 'react'

import { Typography } from '~/modules/ui/typography'

export function Title({ children }: PropsWithChildren) {
  return (
    <Typography brand className="text-center" level="h3" color="primary">
      {children}
    </Typography>
  )
}
