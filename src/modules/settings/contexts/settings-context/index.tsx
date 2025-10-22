import { onAuthStateChanged } from '@react-native-firebase/auth'
import { useRouter } from 'expo-router'
import React, { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react'
import useSignOut from '~/hooks/auth/use-sign-out'
import { auth } from '~/libs/firebase'
import {
  useChangePhoneNumberSettingsChangeEmailPost,
  useChangePhoneNumberSettingsChangePhoneNumberPost,
  useGetUserEmailSettingsGetUserEmailGet,
  usePullUserInfoSettingsGetUserPhoneNameGet,
} from '~/services/api/generated'
import { changeDisplayName, changePassword, getUserDisplayName, sendPasswordResetEmail } from '~/services/auth'

// User Data Interface
interface UserData {
  displayName: string
  email: string
  phoneNumber: string
}

// Settings Context Interface
interface SettingsContextType {
  currentValues: UserData
  newDisplayName: string
  newPhoneNumber: string
  newEmail: string
  updateDisplayName: (displayName: string) => void
  updatePhoneNumber: (phone: string) => void
  updateEmail: (email: string) => void
  saveNewDisplayName: () => Promise<void>
  saveNewPhoneNumber: () => Promise<void>
  saveNewEmail: () => Promise<void>
  handleSendPasswordResetEmail: () => Promise<void>
  saveNewPassword: (currentPassword: string, newPassword: string) => Promise<void>
  handleLogout: () => Promise<void>
  isUpdating: boolean
  isLoggingOut: boolean
  isSendingEmail: boolean
  isSavingPassword: boolean
}

// Create Context
const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

// Settings Provider Component
export function SettingsProvider({ children }: PropsWithChildren) {
  const router = useRouter()
  //queries
  const displayName = getUserDisplayName()
  const { data: email, refetch: refetchEmail } = useGetUserEmailSettingsGetUserEmailGet()
  const { data: phoneNumber, refetch: refetchPhoneNumber } = usePullUserInfoSettingsGetUserPhoneNameGet()
  //mutations
  const changeEmailMutation = useChangePhoneNumberSettingsChangeEmailPost()
  const changePhoneNumberMutation = useChangePhoneNumberSettingsChangePhoneNumberPost()
  const signOutMutation = useSignOut()
  //updated values
  const [newDisplayName, setNewDisplayName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [newEmail, setNewEmail] = useState('')
  //loading states
  const [isUpdatingDisplayName, setIsUpdatingDisplayName] = useState(false)
  const [isSendingEmail, setIsSendingEmail] = useState(false)
  const [isSavingPassword, setIsSavingPassword] = useState(false)
  // User Data State
  const [userData, setUserData] = useState<UserData>({
    displayName: displayName || '',
    email: email?.email || '',
    phoneNumber: phoneNumber?.phone_number || '',
  })

  const updateDisplayName = (displayName: string) => {
    setNewDisplayName(displayName)
  }

  const updateEmail = (email: string) => {
    setNewEmail(email)
  }

  const updatePhoneNumber = (phoneNumber: string) => {
    setNewPhoneNumber(phoneNumber)
  }

  const saveNewDisplayName = async () => {
    setIsUpdatingDisplayName(true)
    try {
      await changeDisplayName(newDisplayName)
      setNewDisplayName('')
    } catch (error) {
      console.error(error)
      setNewDisplayName('')
    } finally {
      setIsUpdatingDisplayName(false)
    }
  }

  const saveNewPhoneNumber = async () => {
    changePhoneNumberMutation.mutate(
      { data: { phone_number: newPhoneNumber } },
      {
        onSuccess: () => {
          setNewPhoneNumber('')
          refetchUserSettings()
        },
        onError: (error) => {
          console.error(error)
        },
      }
    )
  }

  const saveNewEmail = async () => {
    changeEmailMutation.mutate(
      { data: { new_email: newEmail } },
      {
        onSuccess: () => {
          setNewEmail('')
          refetchUserSettings()
        },
        onError: (error) => {
          console.error(error)
        },
      }
    )
  }

  const saveNewPassword = async (currentPassword: string, newPassword: string) => {
    setIsSavingPassword(true)
    try {
      await changePassword(currentPassword, newPassword)
    } catch (error) {
      console.error(error)
    } finally {
      setIsSavingPassword(false)
    }
  }

  const handleSendPasswordResetEmail = async () => {
    setIsSendingEmail(true)
    try {
      await sendPasswordResetEmail(userData.email)
    } catch (error) {
      console.error(error)
    } finally {
      setIsSendingEmail(false)
    }
  }

  const handleLogout = async () => {
    signOutMutation.mutate(undefined, {
      onSuccess: () => {
        router.replace('/auth/sign-in')
      },
      onError: (error) => {
        console.error(error)
      },
    })
  }

  const refetchUserSettings = useCallback(async () => {
    getUserDisplayName()
    await refetchEmail()
    await refetchPhoneNumber()
  }, [refetchEmail, refetchPhoneNumber])

  useEffect(() => {
    setUserData({
      displayName: displayName || '',
      email: email?.email || '',
      phoneNumber: phoneNumber?.phone_number || '',
    })
  }, [displayName, email, phoneNumber])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        refetchUserSettings()
      }
    })
    return () => unsubscribe()
  }, [refetchUserSettings, userData])

  // Context Value
  const contextValue: SettingsContextType = {
    // User Data
    currentValues: userData,
    // New Values
    newDisplayName,
    newPhoneNumber,
    newEmail,
    // Update Functions
    updateDisplayName,
    updateEmail,
    updatePhoneNumber,
    //save functions
    saveNewDisplayName,
    saveNewPhoneNumber,
    saveNewEmail,
    handleSendPasswordResetEmail,
    saveNewPassword,
    handleLogout,
    isUpdating: changeEmailMutation.isPending || changePhoneNumberMutation.isPending || isUpdatingDisplayName,
    isLoggingOut: signOutMutation.isPending,
    isSendingEmail,
    isSavingPassword,
  }

  return <SettingsContext.Provider value={contextValue}>{children}</SettingsContext.Provider>
}

// Custom Hook to use Settings Context
export function useSettings(): SettingsContextType {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
}
