import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import { OrganizationsItem } from '~/services/api/model'
import BadgeList from '~/modules/ui/badge-list'
import { Typography } from '~/modules/ui/typography'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { useProfileInfo } from '../../hooks/use-profile-info'
import { OrganizationsFormData, useOrganizationsForm } from '../../hooks/use-organizations-form'
import { useBoolean } from 'usehooks-ts'
import OrganizationsForm from '../dialogs/organizations-form'

export function OrganizationsInfo() {
  const {
    selectedBadge,
    setSelectedBadge,
    selectedBadgeValue: selectedOrganization,
    list,
  } = useProfileInfo<OrganizationsItem>({
    topic: 'organizations',
    listKey: 'title',
  })

  const form = useOrganizationsForm()

  const { value, setFalse, setTrue } = useBoolean(false)

  const handleSelectBadge = (value: string) => {
    if (value === '+') {
      form.reset({ title: '', about: '' })
      setTrue()
    } else {
      setSelectedBadge(value)
    }
  }

  const handleEdit = () => {
    if (selectedOrganization) {
      form.reset(selectedOrganization as OrganizationsFormData)
      setTrue()
    }
  }

  return (
    <View className="p-6 bg-bg-secondary rounded-xl gap-4">
      <BadgeList list={['+', ...list]} selectedBadge={selectedBadge} onBadgePress={handleSelectBadge} />
      {selectedOrganization && (
        <View className="gap-4 relative">
          {selectedOrganization.title && (
            <Typography color="accent" weight="bold">
              Name: <Typography>{selectedOrganization.title}</Typography>
            </Typography>
          )}
          {selectedOrganization.about && (
            <Typography color="accent" weight="bold">
              Description: <Typography>{selectedOrganization.about}</Typography>
            </Typography>
          )}
          <TouchableOpacity className="absolute right-0 top-0" onPress={handleEdit}>
            <SvgIcon name="editbox" size="lg" color="accent" />
          </TouchableOpacity>
        </View>
      )}
      <OrganizationsForm isOpen={value} onClose={setFalse} form={form} />
    </View>
  )
}
