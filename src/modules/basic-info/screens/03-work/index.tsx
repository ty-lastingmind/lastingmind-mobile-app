import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Alert, KeyboardAvoidingView, ScrollView, View } from 'react-native'
import { useBoolean } from 'usehooks-ts'
import { useSafeAreaStyles } from '~/hooks/use-safe-area-styles'
import { Button } from '~/modules/ui/button'
import { Form } from '~/modules/ui/form'
import { InputGroup } from '~/modules/ui/input-group'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { Typography } from '~/modules/ui/typography'
import { useSubmitSurveyAnswerPersonalSurveySubmitSurveyAnswerPost } from '~/services/api/generated'
import { useWorkInfoForm, WorkInfoData } from '../../hooks/use-work-info-form'
import InputResult from '../../parts/input-result'
import Transition from '../../parts/transition'

const inputList = [
  {
    name: 'company',
    label: 'Company',
    placeholder: 'Goldman Sachs',
  },
  {
    name: 'position',
    label: 'Position',
    placeholder: 'Analyst',
  },
  {
    name: 'startAge',
    label: 'Start Age',
    placeholder: '18',
  },
  {
    name: 'endAge',
    label: 'End Age',
    placeholder: 'Now',
  },
]

export function WorkSurveyPage() {
  const [works, setWorks] = useState<WorkInfoData[]>([])
  const { value: showForm, setTrue: openForm, setFalse: closeForm } = useBoolean(true)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const router = useRouter()
  const safeStyles = useSafeAreaStyles()

  const { mutateAsync, isPending } = useSubmitSurveyAnswerPersonalSurveySubmitSurveyAnswerPost()

  const form = useWorkInfoForm()

  const handleFormSave = (data: WorkInfoData) => {
    if (editingIndex !== null) {
      setWorks((prev) => prev.map((item, index) => (index === editingIndex ? data : item)))
    } else {
      setWorks((prev) => [...prev, data])
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
    const work = works[index]
    form.reset(work)
    setEditingIndex(index)
    closeForm()
  }

  const handleAddAnother = () => {
    form.reset({ company: '', position: '', startAge: '', endAge: '' })
    setEditingIndex(null)
    openForm()
  }

  const handleSave = async () => {
    if (works.length) {
      await mutateAsync(
        {
          data: {
            topic: 'career',
            answers: works.map((work) => ({
              company: work.company,
              position: work.position,
              start_age: Number(work.startAge),
              end_age: Number(work.endAge),
            })),
          },
        },
        {
          onSuccess() {
            router.navigate('/(protected)/basic-info/04-family')
          },
          onError() {
            Alert.alert('An error has ocurred')
          },
        }
      )
    } else {
      router.navigate('/(protected)/basic-info/04-family')
    }
  }

  const handleSkip = async () => {
    await mutateAsync(
      {
        data: {
          topic: 'career',
          answers: [],
        },
      },
      {
        onSuccess() {
          router.navigate('/(protected)/basic-info/04-family')
        },
        onError() {
          Alert.alert('An error has ocurred')
        },
      }
    )
  }

  return (
    <Transition title="Response Saved!" subtitle="Only 2 Questions Left!">
      <View className="flex-1 px-8" style={safeStyles}>
        <KeyboardAvoidingView behavior="padding" className="flex-1">
          <ScrollView contentContainerClassName="gap-4 pb-8" bounces={false} showsVerticalScrollIndicator={false}>
            <View className="pt-28 gap-2">
              <SvgIcon name="work" size="3xl" color="accent" />
              <Typography brand level="h3">
                What is your work history?
              </Typography>
              <Typography>If you haven&apos;t worked, feel free to skip.</Typography>
            </View>
            <Form {...form}>
              {works.map((work, index) => (
                <InputResult
                  key={index}
                  label={work.company}
                  icon="work"
                  onPress={() => handleEdit(index)}
                  isExpanded={editingIndex === index}
                  renderExpandedComponent={
                    <FormControls
                      form={form}
                      works={works}
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
                    works={works}
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
          <View className="gap-4">
            <Button variant="white" onPress={handleSkip} loading={isPending}>
              Skp
            </Button>
            <Button onPress={handleSave} loading={isPending}>
              Save
            </Button>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Transition>
  )
}

interface FormControlsProps {
  form: ReturnType<typeof useWorkInfoForm>
  works: WorkInfoData[]
  handleFormCancel: () => void
  handleFormSave: (data: WorkInfoData) => void
}

function FormControls({ form, works, handleFormCancel, handleFormSave }: FormControlsProps): React.ReactNode {
  return (
    <>
      <InputGroup<WorkInfoData> inputList={inputList} form={form} />
      <View className="flex-row justify-around">
        {!!works.length && (
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
