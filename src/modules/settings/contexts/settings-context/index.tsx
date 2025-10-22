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
  currentPassword: string
  newPassword: string
  newPasswordConfirm: string
  updateDisplayName: (displayName: string) => void
  updatePhoneNumber: (phone: string) => void
  updateEmail: (email: string) => void
  updateCurrentPassword: (currentPassword: string) => void
  updateNewPassword: (newPassword: string) => void
  updateNewPasswordConfirm: (newPasswordConfirm: string) => void
  saveNewDisplayName: () => Promise<void>
  saveNewPhoneNumber: () => Promise<void>
  saveNewEmail: () => Promise<void>
  handleSendPasswordResetEmail: () => Promise<void>
  saveNewPassword: () => Promise<void>
  handleLogout: () => Promise<void>
}

// Create Context
const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

// Settings Provider Component
export function SettingsProvider({ children }: PropsWithChildren) {
  const router = useRouter()
  //queries
  const displayName = getUserDisplayName()
  //const { data: displayName, refetch: refetchDisplayName } = useGetUserNameSettingsGetUserNameGet()
  const { data: email, refetch: refetchEmail } = useGetUserEmailSettingsGetUserEmailGet()
  const { data: phoneNumber, refetch: refetchPhoneNumber } = usePullUserInfoSettingsGetUserPhoneNameGet()
  //mutations
  //const changeDisplayNameMutation = useChangeUserNameSettingsChangeUserNamePost()
  const changeEmailMutation = useChangePhoneNumberSettingsChangeEmailPost()
  const changePhoneNumberMutation = useChangePhoneNumberSettingsChangePhoneNumberPost()
  const signOutMutation = useSignOut()
  //updated values
  const [newDisplayName, setNewDisplayName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('')
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

  const updateCurrentPassword = (password: string) => {
    setCurrentPassword(password)
  }

  const updateNewPassword = (password: string) => {
    setNewPassword(password)
  }

  const updateNewPasswordConfirm = (passwordConfirm: string) => {
    setNewPasswordConfirm(passwordConfirm)
  }

  const saveNewDisplayName = async () => {
    try {
      const response = await changeDisplayName(newDisplayName)
      console.log('saveNewDisplayName', response)
      setNewDisplayName('')
      // Refresh user settings to get the latest data from Firebase
    } catch (error) {
      console.error(error)
      setNewDisplayName('')
    }
    /* changeDisplayNameMutation.mutate(
      { data: { name: newDisplayName } },
      {
        onSuccess: () => {
          setNewDisplayName('')
          refetchUserSettings()
        },
      }
    ) */
  }

  const saveNewPhoneNumber = async () => {
    changePhoneNumberMutation.mutate(
      { data: { phone_number: newPhoneNumber } },
      {
        onSuccess: () => {
          setNewPhoneNumber('')
          refetchUserSettings()
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
      }
    )
  }

  const handleSendPasswordResetEmail = async () => {
    try {
      const response = await sendPasswordResetEmail(userData.email)
      console.log('sendPasswordResetEmail', response)
    } catch (error) {
      console.error(error)
    }
  }

  const saveNewPassword = async () => {
    try {
      const response = await changePassword(currentPassword, newPassword)
      console.log('updatePassword', response)
      setCurrentPassword('')
      setNewPassword('')
      setNewPasswordConfirm('')
    } catch (error) {
      console.error(error)
    }
  }

  const handleLogout = async () => {
    signOutMutation.mutate(undefined, {
      onSuccess: () => {
        router.replace('/auth/sign-in')
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
    currentPassword,
    newPassword,
    newPasswordConfirm,
    // Update Functions
    updateDisplayName,
    updateEmail,
    updatePhoneNumber,
    updateCurrentPassword,
    updateNewPassword,
    updateNewPasswordConfirm,
    //save functions
    saveNewDisplayName,
    saveNewPhoneNumber,
    saveNewEmail,
    handleSendPasswordResetEmail,
    saveNewPassword,
    handleLogout,
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
