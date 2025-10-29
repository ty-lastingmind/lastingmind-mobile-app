import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Alert, View } from 'react-native'
import { useBoolean } from 'usehooks-ts'
import { useSafeAreaStyles } from '~/hooks/use-safe-area-styles'
import { Button } from '~/modules/ui/button'
import { Form } from '~/modules/ui/form'
import { InputGroup } from '~/modules/ui/input-group'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { Typography } from '~/modules/ui/typography'
import { useSubmitSurveyAnswerPersonalSurveySubmitSurveyAnswerPost } from '~/services/api/generated'
import { EducationInfoData, levelOptions, useEducationInfoForm } from '../../hooks/use-education-info-form'
import InputResult from '../../parts/input-result'
import Transition from '../../parts/transition'
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller'
import Toast from 'react-native-toast-message'

const inputList = [
  {
    name: 'level',
    label: 'Level',
    placeholder: "Bachelor's",
    options: levelOptions,
  },
  {
    name: 'school',
    label: 'School',
    placeholder: 'MIT',
  },
]

export function EducationSurveyScreen() {
  const [educations, setEducations] = useState<EducationInfoData[]>([])
  const { value: showForm, setTrue: openForm, setFalse: closeForm } = useBoolean(true)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const router = useRouter()
  const safeStyles = useSafeAreaStyles()

  const { mutateAsync, isPending } = useSubmitSurveyAnswerPersonalSurveySubmitSurveyAnswerPost()

  const form = useEducationInfoForm()
  const { isDirty } = form.formState

  const handleFormSave = (data: EducationInfoData) => {
    if (editingIndex !== null) {
      setEducations((prev) => prev.map((item, index) => (index === editingIndex ? data : item)))
    } else {
      setEducations((prev) => [...prev, data])
    }
    closeForm()
    setEditingIndex(null)
    handleAddAnother()
  }

  const handleFormCancel = () => {
    form.reset()
    setEditingIndex(null)
    closeForm()
  }

  const handleEdit = (index: number) => {
    const education = educations[index]
    form.reset(education)
    setEditingIndex(index)
    closeForm()
  }

  const handleAddAnother = () => {
    form.reset({ level: '', school: '' })
    setEditingIndex(null)
    openForm()
  }

  const handleSave = async () => {
    const finalEducations = [...educations]

    const isValid = await form.trigger()
    if (isDirty) {
      if (!isValid) {
        Toast.show({
          type: 'error',
          text1: 'All Fields are Required',
        })
        return
      }
      const values = form.getValues()

      finalEducations.push(values)
    }

    if (finalEducations.length) {
      await mutateAsync(
        {
          data: {
            topic: 'education',
            answers: finalEducations.map((education) => ({
              level: education.level,
              school: education.school,
            })),
          },
        },
        {
          onSuccess() {
            router.navigate('/(protected)/basic-info/03-work')
          },
          onError() {
            Alert.alert('An error has ocurred')
          },
        }
      )
    } else {
      handleSkip()
    }
  }

  const handleSkip = async () => {
    await mutateAsync(
      {
        data: {
          topic: 'education',
          answers: [],
        },
      },
      {
        onSuccess() {
          router.navigate('/(protected)/basic-info/03-work')
        },
        onError() {
          Alert.alert('An error has ocurred')
        },
      }
    )
  }

  return (
    <Transition title="Response Saved!" subtitle="Only 3 Questions Left!">
      <View className="flex-1 px-8" style={safeStyles}>
        <KeyboardAwareScrollView
          contentContainerClassName="gap-4 pb-8"
          showsHorizontalScrollIndicator={false}
          bottomOffset={100}
        >
          <View className="pt-28 gap-2">
            <SvgIcon name="education" size="3xl" color="accent" />
            <Typography brand level="h3">
              What is your educational background?
            </Typography>
            <Typography>Select as many as necessary.</Typography>
          </View>
          <Form {...form}>
            {educations.map((education, index) => (
              <InputResult
                key={index}
                label={`${education.school}, ${education.level}`}
                icon="education"
                onPress={() => handleEdit(index)}
                isExpanded={editingIndex === index}
                renderExpandedComponent={
                  <FormControls
                    form={form}
                    educations={educations}
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
                  educations={educations}
                  handleFormCancel={handleFormCancel}
                  handleFormSave={handleFormSave}
                  saveLabel="Add another"
                />
              ) : (
                <Button
                  variant="white"
                  size="sm"
                  onPress={handleAddAnother}
                  className={editingIndex !== null ? 'hidden' : ''}
                >
                  Add another
                </Button>
              )}
            </View>
          </Form>
        </KeyboardAwareScrollView>
        <View className="gap-4">
          <Button variant="white" onPress={handleSkip} loading={isPending}>
            Skp
          </Button>
          <Button onPress={handleSave} loading={isPending}>
            Save
          </Button>
        </View>
      </View>
    </Transition>
  )
}

interface FormControlsProps {
  form: ReturnType<typeof useEducationInfoForm>
  educations: EducationInfoData[]
  handleFormCancel: () => void
  handleFormSave: (data: EducationInfoData) => void
  saveLabel?: string
}

function FormControls({
  form,
  educations,
  handleFormCancel,
  handleFormSave,
  saveLabel = 'Save',
}: FormControlsProps): React.ReactNode {
  return (
    <>
      <InputGroup<EducationInfoData> inputList={inputList} form={form} />
      <View className="flex-row justify-around">
        {!!educations.length && (
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
          {saveLabel}
        </Button>
      </View>
    </>
  )
}
