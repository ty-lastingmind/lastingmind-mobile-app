import { View, TouchableOpacity } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import {
  useGetPersonInfoDetailsProfilePageGetPersonalInfoDetailsGet,
  usePullAiAboutProfilePagePullAiAboutPost,
} from '~/services/api/generated'
import { FamilyItem } from '~/services/api/model'
import BadgeList from '~/modules/ui/badge-list'
import { Typography } from '~/modules/ui/typography'
import { TypographyTyping } from '~/modules/ui/typography-typing'
import { SvgIcon } from '~/modules/ui/svg-icon'

export function FamilyInfo() {
  const [selectedBadge, setSelectedBadge] = useState('')
  const [aiAbout, setAiAbout] = useState('')

  const { data } = useGetPersonInfoDetailsProfilePageGetPersonalInfoDetailsGet({
    topic: 'family',
  })

  useEffect(() => {
    if (data?.personal_info_details?.length) {
      const firstName = (data.personal_info_details[0] as FamilyItem).name
      if (firstName) {
        setSelectedBadge(firstName)
      }
    }
  }, [data])

  const aiSummary = usePullAiAboutProfilePagePullAiAboutPost()

  const list = useMemo(
    () =>
      data?.personal_info_details
        ?.map((i) => (i as FamilyItem).name)
        .filter((name): name is string => name !== undefined) || [],
    [data]
  )

  const selectedFamilyMember = useMemo(
    () => data?.personal_info_details?.find((i) => (i as FamilyItem).name === selectedBadge) as FamilyItem | undefined,
    [data, selectedBadge]
  )

  const handleSelectBadge = (value: string) => {
    if (value === '+') {
      // TODO
    } else {
      setSelectedBadge(value)
      setAiAbout('')
    }
  }

  const handleAiAbout = () => {
    aiSummary.mutate(
      {
        data: {
          topic: 'family',
          name: selectedBadge,
          index_of_entry: data?.personal_info_details?.findIndex((i) => (i as FamilyItem).name === selectedBadge) || 0,
        },
      },
      {
        onSuccess: (res) => {
          setAiAbout(res.about)
        },
      }
    )
  }

  return (
    <View className="p-6 bg-bg-secondary rounded-xl gap-4">
      <BadgeList list={['+', ...list]} selectedBadge={selectedBadge} onBadgePress={handleSelectBadge} />
      {selectedFamilyMember && (
        <View className="gap-4 relative">
          {selectedFamilyMember.name && (
            <Typography color="accent" weight="bold">
              Name: <Typography>{selectedFamilyMember.name}</Typography>
            </Typography>
          )}
          {selectedFamilyMember.relationship && (
            <Typography color="accent" weight="bold">
              Relationship: <Typography>{selectedFamilyMember.relationship}</Typography>
            </Typography>
          )}
          {selectedFamilyMember.you_call_them && (
            <Typography color="accent" weight="bold">
              You call {selectedFamilyMember.name}: <Typography>{selectedFamilyMember.you_call_them}</Typography>
            </Typography>
          )}
          {selectedFamilyMember.they_call_you && (
            <Typography color="accent" weight="bold">
              {selectedFamilyMember.name} calls you: <Typography>{selectedFamilyMember.they_call_you}</Typography>
            </Typography>
          )}
          <TouchableOpacity onPress={handleAiAbout}>
            <Typography color="accent" weight="bold">
              About: <SvgIcon name="sparks" size="md" color="accent" />
            </Typography>
          </TouchableOpacity>
          {aiAbout && <TypographyTyping>{aiAbout}</TypographyTyping>}
          <TouchableOpacity className="absolute right-0 top-0" disabled={aiSummary.isPending}>
            <SvgIcon name="editbox" size="lg" color="accent" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}
