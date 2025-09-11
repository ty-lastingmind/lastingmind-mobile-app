import { View } from 'react-native'
import React from 'react'
import { Typography } from '~/modules/ui/typography'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { Button } from '~/modules/ui/button'
import { Link } from 'expo-router'
import { InputGroup } from '~/modules/ui/input-group'
import InputResult from '../../parts/input-result'
import { HomeInfoData, useHomeInfoForm } from '../../hooks/use-home-info-form'
import { Form } from '~/modules/ui/form'

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
  const [locations, setLocations] = React.useState<HomeInfoData[]>([])
  const [showForm, setShowForm] = React.useState(true)

  const form = useHomeInfoForm()

  const handleSave = (data: HomeInfoData) => {
    setLocations((prev) => [...prev, data])
    setShowForm(false)
    form.reset()
  }

  const handleCancel = () => {
    setShowForm(false)
    form.reset()
  }

  return (
    <View className="gap-4 px-8 py-safe flex flex-1">
      <View className="pt-28 gap-2">
        <SvgIcon name="home" size="3xl" color="accent" />
        <Typography brand level="h3">
          Where have you lived throughout your life?
        </Typography>
        <Typography>Select at many as necessary.</Typography>
      </View>
      {locations.map((location, index) => (
        <InputResult key={index} label={location.location} icon="home" />
      ))}
      <Form {...form}>
        <View className="flex-1 gap-4">
          {showForm ? (
            <>
              <InputGroup<HomeInfoData> inputList={inputList} form={form} />
              <View className="flex-row justify-around">
                {!!locations.length && (
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
      <Link asChild href="/(protected)/basic-info/02-education">
        <Button>Save</Button>
      </Link>
    </View>
  )
}
