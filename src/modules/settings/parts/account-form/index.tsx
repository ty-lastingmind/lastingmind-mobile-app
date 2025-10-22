import { View } from 'react-native'
import { useSettings } from '../../contexts/settings-context'
import { AccountField } from '../../types'
import { AccountFormField } from '../account-form-field'

export function AccountForm() {
  const { currentValues } = useSettings()

  const accountFields: AccountField[] = [
    {
      label: 'Name',
      value: currentValues.displayName,
      hasChevron: true,
      // @ts-expect-error - Route types will be regenerated
      href: '/(protected)/settings/update-name',
    },
    {
      label: 'Email',
      value: currentValues.email,
      hasChevron: true,
      // @ts-expect-error - Route types will be regenerated
      href: '/(protected)/settings/update-email',
    },
    {
      label: 'Phone',
      value: currentValues.phoneNumber || 'Add',
      hasChevron: true,
      // @ts-expect-error - Route types will be regenerated
      href: '/(protected)/settings/update-phone',
    },
  ]

  return (
    <View className="flex bg-bg-secondary rounded-t-[20px] rounded-b-[20px]">
      {accountFields.map((field, index) => {
        return <AccountFormField field={field} showSeparator={index === accountFields.length - 1} key={index} />
      })}
    </View>
  )
}
