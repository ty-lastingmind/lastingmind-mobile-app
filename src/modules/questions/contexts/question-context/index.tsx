import { createContext, useCallback, useContext, useMemo, useState, useEffect } from 'react'
import { useBoolean } from 'usehooks-ts'
import {
  useSaveQuestionCuratedQuestionsAddSavedQuestionPost,
  useGenerateContinuedQuestionsCuratedQuestionsContinueQuestionsPost,
  usePullUserInfoHomePullUserInfoGet,
} from '~/services/api/generated'
import { StarterQuestionsResponseNextQuestionsItem } from '~/services/api/model'

interface QuestionContextValue {
  isSubmittingAnswer: boolean
  isEditingAnswer: boolean
  isWritingAnswer: boolean
  nextQuestions: StarterQuestionsResponseNextQuestionsItem[]
  currentQuestionIndex: number
  questionsProgress: number
  isSavingQuestion: boolean
  isGeneratingQuestions: boolean

  handleQuestionIndexChange: (index: number) => void
  handleViewTranscription: () => void
  handleSaveForLater: () => void
  handleSubmitAnswer: () => void

  closeSubmittingOverlay: () => void
  openEditOverlay: () => void
  openWriteAnswerOverlay: () => void
  closeEditOverlay: () => void
  closeWriteAnswerOverlay: () => void
}

const QuestionContext = createContext<QuestionContextValue>({
  isSubmittingAnswer: false,
  isEditingAnswer: false,
  isWritingAnswer: false,
  nextQuestions: [],
  currentQuestionIndex: 0,
  questionsProgress: 0,
  isSavingQuestion: false,
  isGeneratingQuestions: false,
  handleQuestionIndexChange: () => {},
  handleViewTranscription: () => {},
  handleSaveForLater: () => {},
  handleSubmitAnswer: () => {},
  closeSubmittingOverlay: () => {},
  openEditOverlay: () => {},
  openWriteAnswerOverlay: () => {},
  closeEditOverlay: () => {},
  closeWriteAnswerOverlay: () => {},
})

export const QuestionProvider = ({ children }: { children: React.ReactNode }) => {
  const isSubmittingAnswer = useBoolean(false)
  const isEditingAnswer = useBoolean(false)
  const isWritingAnswer = useBoolean(false)

  const [nextQuestions, setNextQuestions] = useState<StarterQuestionsResponseNextQuestionsItem[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  const user = usePullUserInfoHomePullUserInfoGet()
  const { mutate: saveQuestion, isPending: isSavingQuestion } = useSaveQuestionCuratedQuestionsAddSavedQuestionPost()
  const { mutate: generateContinuedQuestions, isPending: isGeneratingQuestions } =
    useGenerateContinuedQuestionsCuratedQuestionsContinueQuestionsPost()

  const currentQuestion = useMemo(() => {
    const questionItem = nextQuestions[currentQuestionIndex]

    if (!questionItem) {
      return null
    }

    return {
      question: Object.values(questionItem)[0],
      responseId: Object.keys(questionItem)[0],
    }
  }, [currentQuestionIndex, nextQuestions])

  useEffect(() => {
    if (!user.data) return

    generateContinuedQuestions(
      {
        data: {
          userFullName: user.data.full_user_name,
          topic: '',
        },
      },
      {
        onSuccess(data) {
          console.log('dagta', data)
          setNextQuestions(data.next_questions)
        },
        onError(error) {
          console.log('error', error)
        },
      }
    )
  }, [generateContinuedQuestions, user.data])

  const handleViewTranscription = useCallback(() => {
    isSubmittingAnswer.setTrue()
  }, [isSubmittingAnswer])

  const handleSaveForLater = useCallback(() => {
    if (!currentQuestion) {
      return
    }
    saveQuestion({
      data: {
        question_text: currentQuestion.question.question_text,
        responseId: currentQuestion.responseId,
        topic: currentQuestion.question.topic,
      },
    })
  }, [currentQuestion, saveQuestion])

  const handleSubmitAnswer = useCallback(() => {
    // TODO: Implement submit answer functionality
    console.log('Submit answer')
  }, [])

  const closeSubmittingOverlay = useCallback(() => {
    isSubmittingAnswer.setFalse()
  }, [isSubmittingAnswer])

  const openEditOverlay = useCallback(() => {
    isSubmittingAnswer.setFalse()
    isEditingAnswer.setTrue()
  }, [isSubmittingAnswer, isEditingAnswer])

  const openWriteAnswerOverlay = useCallback(() => {
    isWritingAnswer.setTrue()
  }, [isWritingAnswer])

  const closeEditOverlay = useCallback(() => {
    isEditingAnswer.setFalse()
  }, [isEditingAnswer])

  const closeWriteAnswerOverlay = useCallback(() => {
    isWritingAnswer.setFalse()
  }, [isWritingAnswer])

  const questionsProgress = useMemo(() => {
    return nextQuestions.length > 0 ? ((currentQuestionIndex + 1) / nextQuestions.length) * 100 : 0
  }, [currentQuestionIndex, nextQuestions.length])

  const value: QuestionContextValue = useMemo(
    () => ({
      isSubmittingAnswer: isSubmittingAnswer.value,
      isEditingAnswer: isEditingAnswer.value,
      isWritingAnswer: isWritingAnswer.value,
      nextQuestions,
      currentQuestionIndex,
      questionsProgress,
      isSavingQuestion,
      isGeneratingQuestions,
      handleQuestionIndexChange: setCurrentQuestionIndex,
      handleViewTranscription,
      handleSaveForLater,
      handleSubmitAnswer,
      closeSubmittingOverlay,
      openEditOverlay,
      openWriteAnswerOverlay,
      closeEditOverlay,
      closeWriteAnswerOverlay,
    }),
    [
      isSubmittingAnswer.value,
      isEditingAnswer.value,
      isWritingAnswer.value,
      nextQuestions,
      currentQuestionIndex,
      questionsProgress,
      isSavingQuestion,
      isGeneratingQuestions,
      handleViewTranscription,
      handleSaveForLater,
      handleSubmitAnswer,
      closeSubmittingOverlay,
      openEditOverlay,
      openWriteAnswerOverlay,
      closeEditOverlay,
      closeWriteAnswerOverlay,
    ]
  )

  return <QuestionContext.Provider value={value}>{children}</QuestionContext.Provider>
}

export const useQuestionContext = () => useContext(QuestionContext)
