import { View } from 'react-native'
import React from 'react'
import { Typography } from '~/modules/ui/typography'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { Button } from '~/modules/ui/button'
import { InputGroup } from '~/modules/ui/input-group'
import { Link } from 'expo-router'
import { EducationInfoData, levelOptions, useEducationInfoForm } from '../../hooks/use-education-info-form'
import { Form } from '~/modules/ui/form'
import InputResult from '../../parts/input-result'
import Transition from '../../parts/transition'

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
    placeholder: 'University of Alabama',
  },
]

export function EducationSurveyScreen() {
  const [educations, setEducations] = React.useState<EducationInfoData[]>([])
  const [showForm, setShowForm] = React.useState(true)
  const form = useEducationInfoForm()

  const handleSave = (data: EducationInfoData) => {
    setEducations((prev) => [...prev, data])
    setShowForm(false)
    form.reset()
  }

  const handleCancel = () => {
    setShowForm(false)
    form.reset()
  }

  return (
    <Transition title="Response Saved!" subtitle="Only 3 Questions Left!">
      <View className="gap-4 px-8 py-safe flex flex-1">
        <View className="pt-28 gap-2">
          <SvgIcon name="education" size="3xl" color="accent" />
          <Typography brand level="h3">
            What is your educational background?
          </Typography>
          <Typography>Select at many as necessary.</Typography>
        </View>
        {educations.map((education, index) => (
          <InputResult key={index} label={education.school} icon="education" />
        ))}
        <Form {...form}>
          <View className="flex-1 gap-4">
            {showForm ? (
              <>
                <InputGroup<EducationInfoData> inputList={inputList} form={form} />
                <View className="flex-row justify-around">
                  {!!educations.length && (
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
        <Link asChild href="/(protected)/basic-info/03-work">
          <Button>Next</Button>
        </Link>
      </View>
    </Transition>
  )
}
