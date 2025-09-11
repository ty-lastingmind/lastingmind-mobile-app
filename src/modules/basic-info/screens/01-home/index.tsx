import { Alert, View, ScrollView, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { Typography } from '~/modules/ui/typography'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { Button } from '~/modules/ui/button'
import { useRouter } from 'expo-router'
import { InputGroup } from '~/modules/ui/input-group'
import InputResult from '../../parts/input-result'
import { HomeInfoData, useHomeInfoForm } from '../../hooks/use-home-info-form'
import { Form } from '~/modules/ui/form'
import { useSubmitSurveyAnswerPersonalSurveySubmitSurveyAnswerPost } from '~/services/api/generated'
import { useBoolean } from 'usehooks-ts'

const inputList = [
  {
    name: 'location',
    label: 'Location',
    placeholder: 'San Francisco CA.',
  },
  {
    name: 'startAge',
    label: 'Start Age',
    placeholder: '0',
  },
  {
    name: 'endAge',
    label: 'End Age',
    placeholder: '18',
  },
]

export function HomeSurveyScreen() {
  const [locations, setLocations] = useState<HomeInfoData[]>([])
  const { value: showForm, setTrue: openForm, setFalse: closeForm } = useBoolean(true)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const router = useRouter()

  const { mutateAsync, isPending } = useSubmitSurveyAnswerPersonalSurveySubmitSurveyAnswerPost()

  const form = useHomeInfoForm()

  const handleFormSave = (data: HomeInfoData) => {
    if (editingIndex !== null) {
      setLocations((prev) => prev.map((item, index) => (index === editingIndex ? data : item)))
    } else {
      setLocations((prev) => [...prev, data])
    }
    closeForm()
    setEditingIndex(null)
    form.reset()
  }

  const handleFormCancel = () => {
    form.reset()
    setEditingIndex(null)
    closeForm()
  }

  const handleEdit = (index: number) => {
    const location = locations[index]
    form.reset(location)
    setEditingIndex(index)
    closeForm()
  }

  const handleAddAnother = () => {
    form.reset({ location: '', startAge: '', endAge: '' })
    setEditingIndex(null)
    openForm()
  }

  const handleSave = async () => {
    if (locations.length) {
      await mutateAsync(
        {
          data: {
            topic: 'cities_lived',
            answers: locations.map((location) => ({
              location: location.location,
              start_age: Number(location.startAge),
              end_age: Number(location.endAge),
            })),
          },
        },
        {
          onSuccess() {
            router.navigate('/(protected)/basic-info/02-education')
          },
          onError() {
            Alert.alert('An error has ocurred')
          },
        }
      )
    } else {
      router.navigate('/(protected)/basic-info/02-education')
    }
  }

  return (
    <View className="flex-1 px-8 py-safe">
      <KeyboardAvoidingView behavior="padding" className="flex-1">
        <ScrollView contentContainerClassName="gap-4 pb-8" bounces={false} showsVerticalScrollIndicator={false}>
          <View className="pt-28 gap-2">
            <SvgIcon name="home" size="3xl" color="accent" />
            <Typography brand level="h3">
              Where have you lived throughout your life?
            </Typography>
            <Typography>Add as many as necessary.</Typography>
          </View>
          <Form {...form}>
            {locations.map((location, index) => (
              <InputResult
                key={index}
                label={location.location}
                icon="home"
                onPress={() => handleEdit(index)}
                isExpanded={editingIndex === index}
                renderExpandedComponent={
                  <FormControls
                    form={form}
                    locations={locations}
                    handleFormCancel={handleFormCancel}
                    handleFormSave={handleFormSave}
                  />
                }
              />
            ))}
            <View className="flex-1 gap-4">
              {showForm ? (
                <FormControls
                  form={form}
                  locations={locations}
                  handleFormCancel={handleFormCancel}
                  handleFormSave={handleFormSave}
                />
              ) : (
                <Button variant="white" size="sm" onPress={handleAddAnother}>
                  Add another
                </Button>
              )}
            </View>
          </Form>
        </ScrollView>
        <Button onPress={handleSave} loading={isPending}>
          Save
        </Button>
      </KeyboardAvoidingView>
    </View>
  )
}

interface FormControlsProps {
  form: ReturnType<typeof useHomeInfoForm>
  locations: HomeInfoData[]
  handleFormCancel: () => void
  handleFormSave: (data: HomeInfoData) => void
}

function FormControls({ form, locations, handleFormCancel, handleFormSave }: FormControlsProps): React.ReactNode {
  return (
    <>
      <InputGroup<HomeInfoData> inputList={inputList} form={form} />
      <View className="flex-row justify-around">
        {!!locations.length && (
          <Button variant="white" size="sm" onPress={handleFormCancel}>
            Cancel
          </Button>
        )}
        <Button
          variant="white"
          size="sm"
          disabled={!form.formState.isValid || !form.formState.isDirty}
          onPress={form.handleSubmit(handleFormSave)}
        >
          Save
        </Button>
      </View>
    </>
  )
}
