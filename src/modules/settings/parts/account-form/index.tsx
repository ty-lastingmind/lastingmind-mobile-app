import { View } from 'react-native'
import { useSettings } from '../../contexts/settings-context'
import { AccountField } from '../../types'
import { AccountFormField } from '../account-form-field'

export function AccountForm() {
  const { navigateToEditName, navigateToEditEmail, navigateToEditPhone, currentValues } = useSettings()

  const accountFields: AccountField[] = [
    {
      label: 'Name',
      value: currentValues.displayName,
      hasChevron: true,
      onPress: navigateToEditName,
    },
    {
      label: 'Email',
      value: currentValues.email,
      hasChevron: true,
      onPress: navigateToEditEmail,
    },
    {
      label: 'Phone',
      value: currentValues.phoneNumber || 'Add',
      hasChevron: true,
      onPress: navigateToEditPhone,
    },
  ]

  return (
    <View className="bg-bg-secondary rounded-t-[20px] rounded-b-[20px]">
      {accountFields.map((field, index) => {
        return <AccountFormField field={field} showSeparator={index === accountFields.length - 1} key={index} />
      })}
    </View>
  )
}
