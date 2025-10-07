import { useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { useBoolean } from 'usehooks-ts'
import { ExplanationDialog } from '~/modules/components/chat/parts/container/parts/answer-explanations/parts/explanation-dialog'
import { Icon } from '~/modules/ui/icon'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { Typography } from '~/modules/ui/typography'
import type { ExplanationItem } from '~/services/api/model'
import { formatDate } from '~/utils/date'

interface AnswerExplanationsProps {
  explanations: ExplanationItem[]
}

export function AnswerExplanations({ explanations }: AnswerExplanationsProps) {
  const isCollapsed = useBoolean()
  const [staringIndex, setStaringIndex] = useState<number | null>(null)

  return (
    <>
      <View className="bg-bg-secondary rounded-md px-4 py-2.5 gap-2.5 w-full">
        <TouchableOpacity onPress={isCollapsed.toggle} className="flex flex-row justify-between">
          <View className="flex flex-row gap-2 items-center">
            <SvgIcon name="explanation" />
            <Typography>Explain answer</Typography>
          </View>
          <Icon name={isCollapsed.value ? 'chevron-up-outline' : 'chevron-down-outline'} color="secondary" />
        </TouchableOpacity>
        {isCollapsed.value &&
          explanations.map((explanation, index) => (
            <TouchableOpacity
              onPress={() => setStaringIndex(index)}
              key={explanation.headline}
              className="bg-bg-primary rounded-sm p-4 flex flex-row justify-between items-start gap-2"
            >
              <View className="gap-2 flex-1">
                <Typography>{explanation.headline}</Typography>
                {explanation.question_info && (
                  <Typography color="secondary">
                    {[formatDate(explanation.question_info.submitted_at)].join(' - ')}
                  </Typography>
                )}
              </View>
              <View className="bg-bg-secondary rounded-full p-1">
                <Icon name="expand" />
              </View>
            </TouchableOpacity>
          ))}
      </View>
      {staringIndex !== null && (
        <ExplanationDialog
          onClose={() => setStaringIndex(null)}
          staringIndex={staringIndex}
          explanations={explanations}
        />
      )}
    </>
  )
}
