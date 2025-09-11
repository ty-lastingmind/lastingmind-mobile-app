import { Alert, View } from 'react-native'
import React from 'react'
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
  const [familyMembers, setFamilyMembers] = React.useState<FamilyInfoData[]>([])
  const [showForm, setShowForm] = React.useState(true)
  const router = useRouter()

  const { mutateAsync, isPending } = useSubmitSurveyAnswerPersonalSurveySubmitSurveyAnswerPost()

  const form = useFamilyInfoForm()

  const handleSave = (data: FamilyInfoData) => {
    setFamilyMembers((prev) => [...prev, data])
    setShowForm(false)
    form.reset()
  }

  const handleCancel = () => {
    setShowForm(false)
    form.reset()
  }

  const handleSubmitAll = async () => {
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
      <View className="gap-4 px-8 py-safe flex flex-1">
        <View className="pt-28 gap-2">
          <SvgIcon name="family" size="3xl" color="accent" />
          <Typography brand level="h3">
            Tell us about your family
          </Typography>
          <Typography>Add as many family members as you like.</Typography>
        </View>
        {familyMembers.map((member, index) => (
          <InputResult key={index} label={member.name} icon="family" />
        ))}
        <Form {...form}>
          <View className="flex-1 gap-4">
            {showForm ? (
              <>
                <InputGroup<FamilyInfoData> inputList={inputList} form={form} />
                <View className="flex-row justify-around">
                  {!!familyMembers.length && (
                    <Button variant="white" size="sm" onPress={handleCancel}>
                      Cancel
                    </Button>
                  )}
                  <Button
                    variant="white"
                    size="sm"
                    disabled={!form.formState.isValid || !form.formState.isDirty}
                    onPress={form.handleSubmit(handleSave)}
                  >
                    Save
                  </Button>
                </View>
              </>
            ) : (
              <Button variant="white" size="sm" onPress={() => setShowForm(true)}>
                Add another
              </Button>
            )}
          </View>
        </Form>
        <Button onPress={handleSubmitAll} loading={isPending}>
          Save
        </Button>
      </View>
    </Transition>
  )
}
