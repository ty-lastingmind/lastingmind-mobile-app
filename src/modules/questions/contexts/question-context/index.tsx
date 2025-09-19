import { createContext, useCallback, useContext, useMemo, useState, useEffect } from 'react'
import { Alert } from 'react-native'
import {
  useSaveQuestionCuratedQuestionsAddSavedQuestionPost,
  useGenerateContinuedQuestionsCuratedQuestionsContinueQuestionsPost,
  usePullUserInfoHomePullUserInfoGet,
  useSubmitAnswerCuratedQuestionsSubmitAnswerPost,
} from '~/services/api/generated'
import { StarterQuestionsResponseNextQuestionsItem, SubmitQuestionInput } from '~/services/api/model'

const SUCCESS_SCREEN_DURATION = 3000

interface CurrentQuestion {
  question: {
    question_text: string
    topic: string
  }
  responseId: string
}

interface QuestionState {
  isSubmittingAnswer: boolean
  isEditingAnswer: boolean
  isWritingAnswer: boolean
  isSavingAnswer: boolean
  isAnswerSaved: boolean
  isSavingQuestion: boolean
  isGeneratingQuestions: boolean
  isTopicPickerOpen: boolean
  showSuccessScreen: boolean
  hasSkippedAllQuestions: boolean
  hasError: boolean
  errorMessage: string | null
}

interface QuestionData {
  nextQuestions: StarterQuestionsResponseNextQuestionsItem[]
  currentQuestionIndex: number
  questionsProgress: number
  currentQuestion: CurrentQuestion | null
}

interface QuestionActions {
  handleSkippedAllQuestions: (value: boolean) => void
  handleQuestionIndexChange: (index: number) => void
  handleViewTranscription: () => void
  handleSaveForLater: () => void
  handleSubmitAnswer: (data: Omit<SubmitQuestionInput, 'userFullName'>) => void
  handleNewTopicPress: () => void
  handleGenerateNewQuestionsPress: () => void
  handleCloseSubmittingOverlay: () => void
  handleOpenEditOverlay: () => void
  handleOpenWriteAnswerOverlay: () => void
  handleCloseEditOverlay: () => void
  handleCloseWriteAnswerOverlay: () => void
  handleCloseTopicPicker: () => void
  handleSaveNewTopic: (topic: string) => void
}

interface QuestionContextValue extends QuestionState, QuestionData, QuestionActions {}

const QuestionContext = createContext<QuestionContextValue>({
  isSubmittingAnswer: false,
  isEditingAnswer: false,
  isWritingAnswer: false,
  isAnswerSaved: false,
  isTopicPickerOpen: false,
  showSuccessScreen: false,
  nextQuestions: [],
  currentQuestionIndex: 0,
  questionsProgress: 0,
  isSavingQuestion: false,
  isGeneratingQuestions: false,
  isSavingAnswer: false,
  hasSkippedAllQuestions: false,
  currentQuestion: null,
  hasError: false,
  errorMessage: null,
  handleSkippedAllQuestions: () => {},
  handleQuestionIndexChange: () => {},
  handleViewTranscription: () => {},
  handleSaveForLater: () => {},
  handleSubmitAnswer: () => {},
  handleNewTopicPress: () => {},
  handleGenerateNewQuestionsPress: () => {},
  handleCloseSubmittingOverlay: () => {},
  handleOpenEditOverlay: () => {},
  handleOpenWriteAnswerOverlay: () => {},
  handleCloseEditOverlay: () => {},
  handleCloseWriteAnswerOverlay: () => {},
  handleSaveNewTopic: () => {},
  handleCloseTopicPicker: () => {},
})

export const QuestionProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<QuestionState>({
    isSubmittingAnswer: false,
    isEditingAnswer: false,
    isWritingAnswer: false,
    isSavingAnswer: false,
    isAnswerSaved: false,
    isSavingQuestion: false,
    isGeneratingQuestions: false,
    isTopicPickerOpen: false,
    showSuccessScreen: false,
    hasSkippedAllQuestions: false,
    hasError: false,
    errorMessage: null,
  })

  const [nextQuestions, setNextQuestions] = useState<StarterQuestionsResponseNextQuestionsItem[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedTopic, setSelectedTopic] = useState('')

  const user = usePullUserInfoHomePullUserInfoGet()
  const { mutate: saveQuestion, isPending: isSavingQuestion } = useSaveQuestionCuratedQuestionsAddSavedQuestionPost()
  const {
    mutate: submitAnswer,
    isPending: isSavingAnswer,
    isSuccess: isAnswerSaved,
  } = useSubmitAnswerCuratedQuestionsSubmitAnswerPost()
  const { mutate: generateContinuedQuestions, isPending: isGeneratingQuestions } =
    useGenerateContinuedQuestionsCuratedQuestionsContinueQuestionsPost()

  const currentQuestion = useMemo((): CurrentQuestion | null => {
    const questionItem = nextQuestions[currentQuestionIndex]

    if (!questionItem) {
      return null
    }

    const responseId = Object.keys(questionItem)[0]
    const question = questionItem[responseId]

    return {
      question: {
        question_text: question.question_text,
        topic: question.topic,
      },
      responseId,
    }
  }, [currentQuestionIndex, nextQuestions])

  const questionsProgress = useMemo(() => {
    return nextQuestions.length > 0 ? ((currentQuestionIndex + 1) / nextQuestions.length) * 100 : 0
  }, [currentQuestionIndex, nextQuestions.length])

  const handleError = useCallback((error: unknown, context: string) => {
    console.error(`Error in ${context}:`, error)
    setState((prev) => ({
      ...prev,
      hasError: true,
      errorMessage: error instanceof Error ? error.message : 'An unexpected error occurred',
    }))
  }, [])

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, hasError: false, errorMessage: null }))
  }, [])

  const generateQuestions = useCallback(
    (topic: string, onSuccess?: () => void) => {
      if (!user.data) return

      clearError()

      generateContinuedQuestions(
        {
          data: {
            userFullName: user.data.full_user_name,
            topic,
          },
        },
        {
          onSuccess(data) {
            setNextQuestions(data.next_questions)
            onSuccess?.()
          },
          onError(error) {
            handleError(error, 'generating questions')
          },
        }
      )
    },
    [clearError, generateContinuedQuestions, handleError, user.data]
  )

  useEffect(() => {
    if (!user.data) return
    generateQuestions(selectedTopic)
  }, [generateQuestions, user.data, selectedTopic])

  useEffect(() => {
    if (state.hasError && state.errorMessage) {
      Alert.alert('Error', state.errorMessage, [{ text: 'OK', onPress: clearError }])
    }
  }, [state.hasError, state.errorMessage, clearError])

  const handleViewTranscription = useCallback(() => {
    setState((prev) => ({ ...prev, isSubmittingAnswer: true }))
  }, [])

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

  const handleShowSuccessScreen = useCallback(() => {
    setState((prev) => ({ ...prev, showSuccessScreen: true }))
    setTimeout(() => {
      setState((prev) => ({ ...prev, showSuccessScreen: false }))
    }, SUCCESS_SCREEN_DURATION)
  }, [])

  const handleSubmitAnswer = useCallback(
    (data: Omit<SubmitQuestionInput, 'userFullName'>) => {
      if (!user.data) {
        return
      }
      submitAnswer(
        {
          data: {
            ...data,
            userFullName: user.data.full_user_name,
          },
        },
        {
          onSuccess: handleShowSuccessScreen,
        }
      )
    },
    [submitAnswer, handleShowSuccessScreen, user.data]
  )

  const handleCloseSubmittingOverlay = useCallback(() => {
    setState((prev) => ({ ...prev, isSubmittingAnswer: false }))
  }, [])

  const handleOpenEditOverlay = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isSubmittingAnswer: false,
      isEditingAnswer: true,
      isWritingAnswer: false,
      isTopicPickerOpen: false,
      showSuccessScreen: false,
    }))
  }, [])

  const handleOpenWriteAnswerOverlay = useCallback(() => {
    setState((prev) => ({ ...prev, isWritingAnswer: true }))
  }, [])

  const handleCloseEditOverlay = useCallback(() => {
    setState((prev) => ({ ...prev, isEditingAnswer: false }))
  }, [])

  const handleCloseWriteAnswerOverlay = useCallback(() => {
    setState((prev) => ({ ...prev, isWritingAnswer: false }))
  }, [])

  const handleSkippedAllQuestions = useCallback((value: boolean) => {
    setState((prev) => ({ ...prev, hasSkippedAllQuestions: value }))
  }, [])

  const handleNewTopicPress = useCallback(() => {
    setState((prev) => ({
      ...prev,
      hasSkippedAllQuestions: false,
      isTopicPickerOpen: true,
    }))
  }, [])

  const handleSaveNewTopic = useCallback((topic: string) => {
    setSelectedTopic(topic)
    setState((prev) => ({ ...prev, isTopicPickerOpen: false }))
  }, [])

  const handleGenerateNewQuestionsPress = useCallback(() => {
    generateQuestions(selectedTopic, () => {
      setState((prev) => ({ ...prev, hasSkippedAllQuestions: false }))
    })
  }, [generateQuestions, selectedTopic])

  const stateValues = useMemo(
    () => ({
      isSubmittingAnswer: state.isSubmittingAnswer,
      isEditingAnswer: state.isEditingAnswer,
      isWritingAnswer: state.isWritingAnswer,
      isTopicPickerOpen: state.isTopicPickerOpen,
      showSuccessScreen: state.showSuccessScreen,
      hasSkippedAllQuestions: state.hasSkippedAllQuestions,
      hasError: state.hasError,
      errorMessage: state.errorMessage,
    }),
    [state]
  )

  const dataValues = useMemo(
    () => ({
      nextQuestions,
      currentQuestionIndex,
      questionsProgress,
      currentQuestion,
    }),
    [nextQuestions, currentQuestionIndex, questionsProgress, currentQuestion]
  )

  const apiStates = useMemo(
    () => ({
      isAnswerSaved,
      isSavingAnswer,
      isSavingQuestion,
      isGeneratingQuestions,
    }),
    [isAnswerSaved, isSavingAnswer, isSavingQuestion, isGeneratingQuestions]
  )

  const actions = useMemo(
    () => ({
      handleSkippedAllQuestions,
      handleQuestionIndexChange: setCurrentQuestionIndex,
      handleViewTranscription,
      handleNewTopicPress,
      handleGenerateNewQuestionsPress,
      handleSaveForLater,
      handleSubmitAnswer,
      handleCloseSubmittingOverlay,
      handleOpenEditOverlay,
      handleOpenWriteAnswerOverlay,
      handleCloseEditOverlay,
      handleCloseWriteAnswerOverlay,
      handleCloseTopicPicker: () => setState((prev) => ({ ...prev, isTopicPickerOpen: false })),
      handleSaveNewTopic,
    }),
    [
      handleSkippedAllQuestions,
      handleViewTranscription,
      handleNewTopicPress,
      handleGenerateNewQuestionsPress,
      handleSaveForLater,
      handleSubmitAnswer,
      handleCloseSubmittingOverlay,
      handleOpenEditOverlay,
      handleOpenWriteAnswerOverlay,
      handleCloseEditOverlay,
      handleCloseWriteAnswerOverlay,
      handleSaveNewTopic,
    ]
  )

  const value: QuestionContextValue = useMemo(
    () => ({
      ...stateValues,
      ...dataValues,
      ...apiStates,
      ...actions,
    }),
    [stateValues, dataValues, apiStates, actions]
  )

  return <QuestionContext.Provider value={value}>{children}</QuestionContext.Provider>
}

export const useQuestionContext = () => useContext(QuestionContext)
