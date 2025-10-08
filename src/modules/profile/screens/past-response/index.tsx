import { FlatList, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import BackHeader from '../../../ui/back-header'
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
import { useBoolean, useDebounceCallback } from 'usehooks-ts'
import { ResponseDialog } from '../../parts/past-responses/response-dialog'

// TODO: Re-enable date picker filter once backend is fixed
// import { DatePicker } from '~/modules/ui/date-picker'
// import { formatToMMDDYYYY } from '~/utils/date'

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
  // const [dateRange, setDateRange] = useState<{ startDate?: string; endDate?: string }>({
  //   startDate: undefined,
  //   endDate: undefined,
  // })
  const [searchText, setSearchText] = useState<string>('')
  const [selectedResponse, setSelectedResponse] = useState<string>('')
  const { value: isDialogOpen, setTrue, setFalse } = useBoolean(false)

  const responses = usePullFilteredResponsesViewAnswerPullFilteredAnswersPost()
  const { data: people } = usePullCanChatWithChatPullCanChatWithGet()

  const peopleList = useMemo(() => people?.can_chat_with.map((person) => person.chattingWithName), [people])
  const typeList = useMemo(() => types.map((type) => type.name), [types])

  const debouncedSetSearchText = useDebounceCallback((text: string) => {
    setSearchText(text)
  }, 500)

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

  const handleResponse = (responseId: string) => {
    setSelectedResponse(responseId)
    setTrue()
  }

  useEffect(() => {
    if (people?.can_chat_with) {
      responses.mutate({
        data: {
          search: searchText,
          filters: {
            users: people.can_chat_with[selectedPerson].chattingWithViewId,
            response_type: selectedType !== undefined ? [types[selectedType].value] : undefined,
            // date_range:
            //   dateRange.startDate && dateRange.endDate
            //     ? {
            //         start: dateRange.startDate + 'T00:00:00Z',
            //         end: dateRange.endDate + 'T23:59:59Z',
            //       }
            //     : undefined,
          },
        },
      })
    }
  }, [selectedPerson, selectedType, searchText, people?.can_chat_with])

  // const dateFilterBadgeLabel = useMemo(() => {
  //   return dateRange.startDate
  //     ? `${dateRange.endDate ? `${formatToMMDDYYYY(dateRange.startDate)} - ${formatToMMDDYYYY(dateRange.endDate)}` : formatToMMDDYYYY(dateRange.startDate)}`
  //     : ''
  // }, [dateRange.startDate, dateRange.endDate])

  return (
    <>
      <BackHeader title="View Past Responses" />
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
              <Selector
                key={selectedType}
                placeholder="Enter Type"
                options={typeList}
                onSelect={handleSelectType}
                initialIndex={selectedType}
              />
              {/* <DatePicker
                startDateValue={dateRange.startDate}
                endDateValue={dateRange.endDate}
                placeholder="Date Range"
                periodPicking
                onSave={setDateRange}
              /> */}
            </View>
          </Dropdown>
          <ScrollView
            horizontal
            contentContainerClassName="flex-wrap flex-row gap-2"
            bounces={false}
            showsHorizontalScrollIndicator={false}
          >
            {people && (
              <FilterBadge
                label={people.can_chat_with[selectedPerson].chattingWithName}
                avatarUrl={people.can_chat_with[selectedPerson].chattingWithImage || undefined}
              />
            )}
            {selectedType !== undefined && (
              <FilterBadge showCloseIcon label={types[selectedType].name} onPress={() => setSelectedType(undefined)} />
            )}
            {/* {dateRange.startDate && (
              <FilterBadge
                showCloseIcon
                label={dateFilterBadgeLabel}
                onPress={() => setDateRange({ startDate: undefined, endDate: undefined })}
              />
            )} */}
          </ScrollView>
          <Input
            placeholder="Type Your Own..."
            leftAdornment={<Icon name="search" color="secondary" />}
            onChange={(e) => debouncedSetSearchText(e.nativeEvent.text)}
          />
        </View>
        {responses.data?.questions.length === 0 ? (
          <View className="flex-1 items-center justify-center mt-10">
            <Typography brand color="accent" level="h4" weight="light">
              No Matching Responses
            </Typography>
          </View>
        ) : (
          <FlatList
            scrollEnabled={false}
            data={responses.data?.questions}
            keyExtractor={(item) => item.responseId.toString()}
            contentContainerClassName=" gap-4"
            renderItem={({ item }) => (
              <TouchableOpacity
                className="rounded-2xl border border-miscellaneous-topic-stroke px-4 py-2 gap-2"
                onPress={() => handleResponse(item.responseId)}
              >
                <Typography>{item.question_title}</Typography>
                <Typography color="secondary">{format(item.submitted_at, 'mm/dd/yyyy')}</Typography>
              </TouchableOpacity>
            )}
          />
        )}
      </ScrollView>
      {people?.can_chat_with && responses.data && (
        <ResponseDialog
          isOpen={isDialogOpen}
          onClose={setFalse}
          chattingWithViewId={people?.can_chat_with[selectedPerson].chattingWithViewId}
          responseId={selectedResponse}
        />
      )}
    </>
  )
}
