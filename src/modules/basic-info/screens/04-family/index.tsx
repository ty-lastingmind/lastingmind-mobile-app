import { View } from 'react-native'
import React from 'react'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { Typography } from '~/modules/ui/typography'
import { InputGroup } from '~/modules/ui/input-group'
import { Button } from '~/modules/ui/button'
import { useFamilyInfoForm, FamilyInfoData, familyOptions } from '../../hooks/use-family-info-form'
import { Form } from '~/modules/ui/form'
import InputResult from '../../parts/input-result'
import { Link } from 'expo-router'
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
    placeholder: 'Name',
  },
]

export function FamilySurveyPage() {
  const [familyMembers, setFamilyMembers] = React.useState<FamilyInfoData[]>([])
  const [showForm, setShowForm] = React.useState(true)
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

  return (
    <Transition title="Response Saved!" subtitle="Last Question!">
      <View className="gap-4 px-8 py-safe flex flex-1">
        <View className="pt-28 gap-2">
          <SvgIcon name="family" size="3xl" color="accent" />
          <Typography brand level="h3">
            Who are your close family members?
          </Typography>
          <Typography>Add as many as you&apos;d like!</Typography>
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
        <Link asChild href="/">
          <Button>Next</Button>
        </Link>
      </View>
    </Transition>
  )
}
