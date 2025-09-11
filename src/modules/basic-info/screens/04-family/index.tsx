import { Alert, View, ScrollView, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { Typography } from '~/modules/ui/typography'
import { InputGroup } from '~/modules/ui/input-group'
import { Button } from '~/modules/ui/button'
import { useFamilyInfoForm, FamilyInfoData, familyOptions } from '../../hooks/use-family-info-form'
import { Form } from '~/modules/ui/form'
import InputResult from '../../parts/input-result'
import { useRouter } from 'expo-router'
import { useSubmitSurveyAnswerPersonalSurveySubmitSurveyAnswerPost } from '~/services/api/generated'
import Transition from '../../parts/transition'
import { useBoolean } from 'usehooks-ts'

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

  return (
    <Transition title="Response Saved!" subtitle="Last Question!">
      <View className="flex-1 px-8 py-safe">
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
                  label={member.name}
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
          <Button onPress={handleSave} loading={isPending}>
            Save
          </Button>
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
