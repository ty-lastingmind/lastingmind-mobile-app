import { FlatList, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import Header from '../../parts/past-responses/header'
import { Icon } from '~/modules/ui/icon'
import { Input } from '~/modules/ui/input'
import Dropdown from '~/modules/ui/dropdown'
import { Selector } from '~/modules/ui/selector'
import { Typography } from '~/modules/ui/typography'
import {
  usePullCanChatWithChatPullCanChatWithGet,
  usePullFilteredResponsesViewAnswerPullFilteredAnswersPost,
} from '~/services/api/generated'
import { ScrollView } from 'react-native-gesture-handler'
import { format } from 'date-fns'
import { FilterBadge } from '../../parts/past-responses/filter-badge'

const types = [
  { name: 'Curated Questions', value: 'curated_question' },
  { name: 'Interviews', value: 'interview' },
  { name: 'Journal Entry', value: 'journal_entry' },
  { name: 'Sent Questions', value: 'received_question' },
  { name: 'Personal Survey', value: 'personal_survey' },
  { name: 'Questions from Chat', value: 'question_from_chat' },
]

export function PastResponsesPage() {
  const [selectedPerson, setSelectedPerson] = useState<number>(0)
  const [selectedType, setSelectedType] = useState<number>()

  const responses = usePullFilteredResponsesViewAnswerPullFilteredAnswersPost()
  const { data: people } = usePullCanChatWithChatPullCanChatWithGet()

  const peopleList = useMemo(() => people?.can_chat_with.map((person) => person.chattingWithName), [people])
  const typeList = useMemo(() => types.map((type) => type.name), [types])

  const handleSelectPerson = (value: string) => {
    if (peopleList) {
      const index = peopleList.indexOf(value)
      setSelectedPerson(index)
    }
  }

  const handleSelectType = (value: string) => {
    const index = typeList.indexOf(value)
    setSelectedType(index !== -1 ? index : undefined)
  }

  useEffect(() => {
    if (people?.can_chat_with) {
      responses.mutate({
        data: {
          filters: {
            users: people.can_chat_with[selectedPerson].chattingWithViewId,
            response_type: selectedType !== undefined ? [types[selectedType].value] : undefined,
          },
        },
      })
    }
  }, [selectedPerson, selectedType, people?.can_chat_with])

  return (
    <>
      <Header />
      <ScrollView className="px-8">
        <View className="gap-4 bg-icon-white pb-4">
          <Dropdown title="Filters" titleWeight="normal" className="bg-button-white-bg pt-0 pb-0 px-2">
            <View className="gap-2">
              <Selector
                placeholder="Choose a Person"
                options={peopleList || []}
                onSelect={handleSelectPerson}
                initialIndex={selectedPerson}
              />
              <Selector placeholder="Enter Type" options={typeList} onSelect={handleSelectType} />
              <Selector placeholder="Date Range" options={[]} />
            </View>
          </Dropdown>
          <ScrollView horizontal contentContainerClassName="flex-wrap flex-row gap-2" bounces={false}>
            {people && (
              <FilterBadge
                label={people.can_chat_with[selectedPerson].chattingWithName}
                avatarUrl={people.can_chat_with[selectedPerson].chattingWithImage || undefined}
              />
            )}
            {selectedType !== undefined && <FilterBadge label={types[selectedType].name} />}
          </ScrollView>
          <Input placeholder="Type Your Own..." leftAdornment={<Icon name="search" color="secondary" />} />
        </View>
        <FlatList
          scrollEnabled={false}
          data={responses.data?.questions}
          keyExtractor={(item) => item.responseId.toString()}
          contentContainerClassName=" gap-4"
          renderItem={({ item }) => (
            <TouchableOpacity className="rounded-2xl border border-miscellaneous-topic-stroke px-4 py-2 gap-2">
              <Typography>{item.question_title}</Typography>
              <Typography color="secondary">{format(item.submitted_at, 'mm/dd/yyyy')}</Typography>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </>
  )
}
