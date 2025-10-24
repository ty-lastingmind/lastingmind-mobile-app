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
import { FamilyInfoData, familyOptions, useFamilyInfoForm } from '../../hooks/use-family-info-form'
import InputResult from '../../parts/input-result'
import Transition from '../../parts/transition'

const inputList = [
  {
    name: 'relationship',
    label: 'Relationship',
    placeholder: 'Select relationship',
    options: familyOptions,
    type: 'select',
  },
  {
    name: 'name',
    label: 'Name',
    placeholder: 'Full name',
  },
]

export function FamilySurveyPage() {
  const [familyMembers, setFamilyMembers] = useState<FamilyInfoData[]>([])
  const { value: showForm, setTrue: openForm, setFalse: closeForm } = useBoolean(true)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const router = useRouter()
  const safeStyles = useSafeAreaStyles()

  const { mutateAsync, isPending } = useSubmitSurveyAnswerPersonalSurveySubmitSurveyAnswerPost()

  const form = useFamilyInfoForm()

  const handleFormSave = (data: FamilyInfoData) => {
    if (editingIndex !== null) {
      setFamilyMembers((prev) => prev.map((item, index) => (index === editingIndex ? data : item)))
    } else {
      setFamilyMembers((prev) => [...prev, data])
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
    const member = familyMembers[index]
    form.reset(member)
    setEditingIndex(index)
    closeForm()
  }

  const handleAddAnother = () => {
    form.reset({ relationship: '', name: '' })
    setEditingIndex(null)
    openForm()
  }

  const handleSave = async () => {
    if (familyMembers.length) {
      await mutateAsync(
        {
          data: {
            topic: 'family',
            answers: familyMembers.map((member) => ({
              relationship: member.relationship,
              name: member.name,
            })),
          },
        },
        {
          onSuccess() {
            router.navigate('/(protected)/basic-info/05-congrats')
          },
          onError() {
            Alert.alert('An error has ocurred')
          },
        }
      )
    } else {
      router.navigate('/(protected)/basic-info/05-congrats')
    }
  }

  const handleSkip = async () => {
    await mutateAsync(
      {
        data: {
          topic: 'family',
          answers: [],
        },
      },
      {
        onSuccess() {
          router.navigate('/(protected)/basic-info/05-congrats')
        },
        onError() {
          Alert.alert('An error has ocurred')
        },
      }
    )
  }

  return (
    <Transition title="Response Saved!" subtitle="Last Question!">
      <View className="flex-1 px-8" style={safeStyles}>
        <KeyboardAvoidingView behavior="padding" className="flex-1">
          <ScrollView contentContainerClassName="gap-4 pb-8" bounces={false} showsVerticalScrollIndicator={false}>
            <View className="pt-28 gap-2">
              <SvgIcon name="family" size="3xl" color="accent" />
              <Typography brand level="h3">
                Tell us about your family
              </Typography>
              <Typography>Add as many family members as you like.</Typography>
            </View>
            <Form {...form}>
              {familyMembers.map((member, index) => (
                <InputResult
                  key={index}
                  label={`${member.name}, ${member.relationship}`}
                  icon="family"
                  onPress={() => handleEdit(index)}
                  isExpanded={editingIndex === index}
                  renderExpandedComponent={
                    <FormControls
                      form={form}
                      familyMembers={familyMembers}
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
                    familyMembers={familyMembers}
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
  form: ReturnType<typeof useFamilyInfoForm>
  familyMembers: FamilyInfoData[]
  handleFormCancel: () => void
  handleFormSave: (data: FamilyInfoData) => void
}

function FormControls({ form, familyMembers, handleFormCancel, handleFormSave }: FormControlsProps): React.ReactNode {
  return (
    <>
      <InputGroup<FamilyInfoData> inputList={inputList} form={form} />
      <View className="flex-row justify-around">
        {!!familyMembers.length && (
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
