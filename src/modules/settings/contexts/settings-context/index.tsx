import { useRouter } from 'expo-router'
import React, { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react'
import { queryClient } from '~/libs/query-client'
import { Auth, Notifications } from '~/services'
import {
  changePhoneNumberSettingsChangePhoneNumberPost,
  usePullUserInfoSettingsGetUserPhoneNameGet,
} from '~/services/api/generated'
import {
  changeDisplayName,
  changeEmail,
  changePassword,
  getUserDisplayName,
  getUserEmail,
  sendPasswordResetEmail,
} from '~/services/auth'

// User Data Interface
interface UserData {
  displayName: string
  email: string
  phoneNumber: string
}

// Navigation Functions Interface
interface NavigationFunctions {
  navigateToAccount: () => void
  navigateToHelp: () => void
  navigateToContactUs: () => void
  navigateToEditName: () => void
  navigateToEditEmail: () => void
  navigateToEditPhone: () => void
  navigateToChangePassword: () => void
  handleLogout: () => Promise<void>
}
// Settings Context Interface
interface SettingsContextType extends NavigationFunctions {
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
  fetchUserSettings: () => Promise<void>
  saveNewDisplayName: () => Promise<void>
  saveNewPhoneNumber: () => Promise<void>
  saveNewEmail: () => Promise<void>
  handleSendPasswordResetEmail: () => Promise<void>
  saveNewPassword: () => Promise<void>
}

// Create Context
const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

// Settings Provider Component
export function SettingsProvider({ children }: PropsWithChildren) {
  const router = useRouter()
  const phoneNumber = usePullUserInfoSettingsGetUserPhoneNameGet()
  //updated values
  const [newDisplayName, setNewDisplayName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('')
  // User Data State
  const [userData, setUserData] = useState<UserData>({
    displayName: '',
    email: '',
    phoneNumber: phoneNumber.data?.phone_number || '',
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
      await fetchUserSettings()
    } catch (error) {
      console.error(error)
      setNewDisplayName('')
    }
  }

  const saveNewPhoneNumber = async () => {
    try {
      const response = await changePhoneNumberSettingsChangePhoneNumberPost({ phone_number: newPhoneNumber })
      phoneNumber.refetch()
      console.log('saveNewPhoneNumber', response)
      setNewPhoneNumber('')
      // Refresh user settings to get the latest data
      await fetchUserSettings()
    } catch (error) {
      console.error(error)
      setNewPhoneNumber('')
    }
  }

  const saveNewEmail = async () => {
    try {
      const response = await changeEmail(newEmail)
      console.log('saveNewEmail', response)
      setNewEmail('')
      // Refresh user settings to get the latest data from Firebase
      await fetchUserSettings()
    } catch (error) {
      console.error(error)
      setNewEmail('')
    }
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
    try {
      await Auth.signOut()
      await Notifications.deleteToken()
      queryClient.removeQueries()
      router.replace('/auth/sign-in')
    } catch (error) {
      console.error('Failed to sign out', error)
    }
  }

  // Navigation Functions
  const navigateToAccount = () => {
    router.push('/account')
  }

  const navigateToHelp = () => {
    router.push('/help')
  }

  const navigateToContactUs = () => {
    router.push('/contact-us')
  }

  const navigateToEditName = () => {
    router.push('/update-name')
  }

  const navigateToEditEmail = () => {
    router.push('/update-email')
  }

  const navigateToEditPhone = () => {
    router.push('/update-phone')
  }

  const navigateToChangePassword = () => {
    router.push('/update-password')
  }

  const fetchUserSettings = useCallback(async () => {
    const displayName = getUserDisplayName()
    const email = getUserEmail()
    const phoneNumberData = phoneNumber.data?.phone_number || ''
    console.log('userData', displayName, email, phoneNumberData)
    setUserData((prev) => ({
      displayName: displayName || prev.displayName,
      email: email || prev.email,
      phoneNumber: phoneNumberData || prev.phoneNumber,
    }))
  }, [phoneNumber.data?.phone_number])

  useEffect(() => {
    fetchUserSettings()
  }, [fetchUserSettings])

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
    // Navigation Functions
    navigateToAccount,
    navigateToHelp,
    navigateToContactUs,
    navigateToEditName,
    navigateToEditEmail,
    navigateToEditPhone,
    navigateToChangePassword,
    handleLogout,
    //save functions
    fetchUserSettings,
    saveNewDisplayName,
    saveNewPhoneNumber,
    saveNewEmail,
    handleSendPasswordResetEmail,
    saveNewPassword,
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
