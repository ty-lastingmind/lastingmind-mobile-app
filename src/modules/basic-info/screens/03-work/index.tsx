import { Alert, View } from 'react-native'
import React from 'react'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { Typography } from '~/modules/ui/typography'
import { InputGroup } from '~/modules/ui/input-group'
import { Button } from '~/modules/ui/button'
import { useWorkInfoForm, WorkInfoData } from '../../hooks/use-work-info-form'
import { Form } from '~/modules/ui/form'
import InputResult from '../../parts/input-result'
import { useRouter } from 'expo-router'
import Transition from '../../parts/transition'
import { useSubmitSurveyAnswerPersonalSurveySubmitSurveyAnswerPost } from '~/services/api/generated'

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
    placeholder: '22',
  },
  {
    name: 'description',
    label: 'Description',
    placeholder: 'Describe your roles and responsibilities',
  },
]

export function WorkSurveyPage() {
  const [works, setWorks] = React.useState<WorkInfoData[]>([])
  const [showForm, setShowForm] = React.useState(true)
  const router = useRouter()

  const { mutateAsync, isPending } = useSubmitSurveyAnswerPersonalSurveySubmitSurveyAnswerPost()

  const form = useWorkInfoForm()

  const handleSave = (data: WorkInfoData) => {
    setWorks((prev) => [...prev, data])
    setShowForm(false)
    form.reset()
  }

  const handleCancel = () => {
    setShowForm(false)
    form.reset()
  }

  const handleSubmitAll = async () => {
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
              description: work.description,
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

  return (
    <Transition title="Response Saved!" subtitle="Only 2 Questions Left!">
      <View className="gap-4 px-8 py-safe flex flex-1">
        <View className="pt-28 gap-2">
          <SvgIcon name="work" size="3xl" color="accent" />
          <Typography brand level="h3">
            What is your work history?
          </Typography>
          <Typography>If you haven&apos;t worked, feel free to skip.</Typography>
        </View>
        {works.map((work, index) => (
          <InputResult key={index} label={work.company} icon="work" />
        ))}
        <Form {...form}>
          <View className="flex-1 gap-4">
            {showForm ? (
              <>
                <InputGroup<WorkInfoData> inputList={inputList} form={form} />
                <View className="flex-row justify-around">
                  {!!works.length && (
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
