import { useLocalSearchParams } from 'expo-router'
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Alert, FlatList } from 'react-native'
import {
  useGenerateContinuedQuestionsCuratedQuestionsContinueQuestionsPost,
  useGenerateStartingQuestionsCuratedQuestionsGenerateStartingQuestionsPost,
  usePullUserInfoHomePullUserInfoGet,
  useSaveQuestionCuratedQuestionsAddSavedQuestionPost,
  useSubmitAnswerCuratedQuestionsSubmitAnswerPost,
} from '~/services/api/generated'
import {
  QuestionDetail,
  SavedQuestionsOutputSavedQuestionsAnyOfItem,
  StarterQuestionsResponseNextQuestionsItem,
  SubmitAnswerResponse,
  SubmitQuestionInput,
} from '~/services/api/model'

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
  isGeneratingStartingQuestions: boolean
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
  topicProgress: number
  flatListRef: React.RefObject<FlatList | null>
}

interface QuestionActions {
  handleSkippedAllQuestions: (value: boolean) => void
  handleQuestionIndexChange: (index: number) => void
  handleViewTranscription: () => void
  handleSaveForLater: () => void
  handleSubmitAnswer: (data: Omit<SubmitQuestionInput, 'userFullName'>, callback?: () => void) => void
  handleNewTopicPress: () => void
  handleGenerateNewQuestionsPress: () => void
  handleCloseSubmittingOverlay: () => void
  handleOpenEditOverlay: () => void
  handleOpenWriteAnswerOverlay: () => void
  handleCloseEditOverlay: () => void
  handleCloseWriteAnswerOverlay: () => void
  handleCloseTopicPicker: () => void
  handleSaveNewTopic: (topic: string) => void
  handleCloseSkippedAllQuestionsOverlay: () => void
  handleCloseSuccessScreen: () => void
}

interface QuestionContextValue extends QuestionState, QuestionData, QuestionActions {}

const QuestionContext = createContext<QuestionContextValue>({
  isSubmittingAnswer: false,
  isEditingAnswer: false,
  isWritingAnswer: false,
  isAnswerSaved: false,
  isTopicPickerOpen: false,
  isGeneratingStartingQuestions: false,
  showSuccessScreen: false,
  nextQuestions: [],
  currentQuestionIndex: 0,
  questionsProgress: 0,
  topicProgress: 0,
  isSavingQuestion: false,
  isGeneratingQuestions: false,
  isSavingAnswer: false,
  hasSkippedAllQuestions: false,
  currentQuestion: null,
  hasError: false,
  errorMessage: null,
  flatListRef: { current: null },
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
  handleCloseSkippedAllQuestionsOverlay: () => {},
  handleCloseSuccessScreen: () => {},
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
    isGeneratingStartingQuestions: false,
    isTopicPickerOpen: false,
    showSuccessScreen: false,
    hasSkippedAllQuestions: false,
    hasError: false,
    errorMessage: null,
  })

  const [nextQuestions, setNextQuestions] = useState<StarterQuestionsResponseNextQuestionsItem[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [topicProgress, setTopicProgress] = useState(0)
  const [selectedTopic, setSelectedTopic] = useState('')
  const flatListRef = useRef<FlatList>(null)
  const isInitialRender = useRef(false)
  const hasProcessedNewQuestion = useRef(false)
  const { newQuestion } = useLocalSearchParams<{ newQuestion?: string }>()

  const user = usePullUserInfoHomePullUserInfoGet()
  const { mutate: saveQuestion, isPending: isSavingQuestion } = useSaveQuestionCuratedQuestionsAddSavedQuestionPost()
  const {
    mutate: submitAnswer,
    isPending: isSavingAnswer,
    isSuccess: isAnswerSaved,
  } = useSubmitAnswerCuratedQuestionsSubmitAnswerPost()
  const { mutate: generateContinuedQuestions, isPending: isGeneratingQuestions } =
    useGenerateContinuedQuestionsCuratedQuestionsContinueQuestionsPost()
  const { mutate: generateStartingQuestions, isPending: isGeneratingStartingQuestions } =
    useGenerateStartingQuestionsCuratedQuestionsGenerateStartingQuestionsPost()

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

  const generateQuestions = useCallback(() => {
    if (!user.data) return

    clearError()

    generateContinuedQuestions(
      {
        data: {
          userFullName: user.data.full_user_name,
          topic: '',
        },
      },
      {
        onSuccess(data) {
          setNextQuestions(data.next_questions)
          setTopicProgress(data.progress_percent)
        },
        onError(error) {
          handleError(error, 'generating questions')
        },
      }
    )
  }, [clearError, generateContinuedQuestions, handleError, user.data])

  const generateNewQuestions = useCallback(() => {
    if (!user.data) return

    clearError()

    generateStartingQuestions(
      {
        data: {
          userFullName: user.data.full_user_name,
          topic: selectedTopic,
        },
      },
      {
        onSuccess(data) {
          setNextQuestions(data.next_questions)
          setState((prev) => ({ ...prev, hasSkippedAllQuestions: false }))
          setTopicProgress(data.progress_percent)
        },
        onError(error) {
          handleError(error, 'generating questions')
        },
      }
    )
  }, [clearError, generateStartingQuestions, handleError, selectedTopic, user.data])

  useEffect(() => {
    if (newQuestion && !hasProcessedNewQuestion.current && nextQuestions.length > 0) {
      hasProcessedNewQuestion.current = true
      const parsedQuestion: SavedQuestionsOutputSavedQuestionsAnyOfItem = JSON.parse(newQuestion)

      // Get the responseId (key) and question data (value)
      const responseId = Object.keys(parsedQuestion)[0]
      const questionData: QuestionDetail = parsedQuestion[responseId]

      // Transform the question to have the saved_question category
      const transformedQuestion: StarterQuestionsResponseNextQuestionsItem = {
        [responseId]: {
          ...questionData,
          question_cat: 'saved_question',
        },
      }

      // Add to front of questions array
      setNextQuestions([transformedQuestion, ...nextQuestions])
      setCurrentQuestionIndex(0)
      flatListRef.current?.scrollToIndex({ index: 0, animated: false })
    }
  }, [newQuestion, nextQuestions])

  // Reset the ref when leaving the screen
  useEffect(() => {
    return () => {
      hasProcessedNewQuestion.current = false
    }
  }, [])

  // Generate new questions when topic is selected
  useEffect(() => {
    if (!user.data || !selectedTopic.length) return
    generateNewQuestions()
  }, [generateNewQuestions, user.data, selectedTopic])

  // Generate initial questions when component mounts
  useEffect(() => {
    // this should render only once when the component mounts
    if (isInitialRender.current) return
    isInitialRender.current = true
    generateQuestions()
  }, [generateQuestions])

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

  const handleShowSuccessScreen = useCallback((data: SubmitAnswerResponse) => {
    setState((prev) => ({ ...prev, showSuccessScreen: true }))
    setNextQuestions(data.next_questions)
    setCurrentQuestionIndex(0)
    setTopicProgress(data.progress_percent)
  }, [])

  const handleCloseSuccessScreen = useCallback(() => {
    setState((prev) => ({ ...prev, showSuccessScreen: false }))
  }, [])

  const handleSubmitAnswer = useCallback(
    (data: Omit<SubmitQuestionInput, 'userFullName'>, callback?: () => void) => {
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
          onSuccess: (data) => {
            handleShowSuccessScreen(data)
            callback?.()
          },
          onError(error) {
            handleError(error, 'submitting answer')
          },
        }
      )
    },
    [submitAnswer, handleShowSuccessScreen, handleError, user.data]
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
    generateNewQuestions()
  }, [generateNewQuestions])

  const handleCloseSkippedAllQuestionsOverlay = useCallback(() => {
    setState((prev) => ({ ...prev, hasSkippedAllQuestions: false }))
  }, [])

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
      topicProgress,
      flatListRef,
    }),
    [nextQuestions, currentQuestionIndex, questionsProgress, currentQuestion, topicProgress]
  )

  const apiStates = useMemo(
    () => ({
      isAnswerSaved,
      isSavingAnswer,
      isSavingQuestion,
      isGeneratingQuestions,
      isGeneratingStartingQuestions,
    }),
    [isAnswerSaved, isSavingAnswer, isSavingQuestion, isGeneratingQuestions, isGeneratingStartingQuestions]
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
      handleCloseSkippedAllQuestionsOverlay,
      handleCloseSuccessScreen,
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
      handleCloseSkippedAllQuestionsOverlay,
      handleCloseSuccessScreen,
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
