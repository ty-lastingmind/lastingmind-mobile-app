import { useMemo, useState } from 'react'
import { useGetPersonInfoDetailsProfilePageGetPersonalInfoDetailsGet } from '~/services/api/generated'
import { PersonalInfoDetailsPersonalInfoDetailsAnyOfItem, TopicEnum } from '~/services/api/model'

interface UseProfileInfoProps {
  topic: TopicEnum
  listKey: string
}

export const useProfileInfo = <T extends PersonalInfoDetailsPersonalInfoDetailsAnyOfItem>({
  topic,
  listKey,
}: UseProfileInfoProps) => {
  const [selectedBadge, setSelectedBadge] = useState(1)
  const { data, isPending, refetch } = useGetPersonInfoDetailsProfilePageGetPersonalInfoDetailsGet({
    topic,
  })

  const list = useMemo(
    () =>
      data?.personal_info_details
        ?.map((i) => (i as Record<string, string>)[listKey])
        .filter((item): item is string => item !== undefined) || [],
    [data, listKey]
  )

  const selectedBadgeValue = useMemo(
    () => data?.personal_info_details?.[selectedBadge - 1] as T | undefined,
    [data, selectedBadge, listKey]
  )

  return { selectedBadge: selectedBadge - 1, setSelectedBadge, selectedBadgeValue, list, isPending, refetch }
}
