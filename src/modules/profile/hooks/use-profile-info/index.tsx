import { useEffect, useMemo, useState } from 'react'
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
  const [selectedBadge, setSelectedBadge] = useState('')
  const { data, isPending, refetch } = useGetPersonInfoDetailsProfilePageGetPersonalInfoDetailsGet({
    topic,
  })

  useEffect(() => {
    if (data?.personal_info_details?.length) {
      const defaultValue = (data.personal_info_details[0] as Record<string, string>)[listKey]
      if (defaultValue) {
        setSelectedBadge(defaultValue)
      }
    }
  }, [data, listKey])

  const list = useMemo(
    () =>
      data?.personal_info_details
        ?.map((i) => (i as Record<string, string>)[listKey])
        .filter((item): item is string => item !== undefined) || [],
    [data, listKey]
  )

  const selectedBadgeValue = useMemo(
    () =>
      data?.personal_info_details?.find((i) => (i as Record<string, string | number>)[listKey] === selectedBadge) as
        | T
        | undefined,
    [data, selectedBadge, listKey]
  )

  const selectedBadgeIndex = useMemo(
    () =>
      data?.personal_info_details?.findIndex(
        (i) => (i as Record<string, string | number>)[listKey] === selectedBadge
      ) || 0,
    [data, selectedBadge]
  )

  return { selectedBadge, setSelectedBadge, selectedBadgeValue, list, selectedBadgeIndex, isPending, refetch }
}
