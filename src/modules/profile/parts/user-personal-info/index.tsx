import { View } from 'react-native'
import React from 'react'
import { Typography } from '~/modules/ui/typography'
import Dropdown from '~/modules/ui/dropdown'
import { FamilyInfo } from '../user-info-family'

export default function UserPersonalInfo() {
  return (
    <View className="gap-4">
      <Typography level="h5" weight="bold">
        Personal Info
      </Typography>

      <Dropdown iconName="home-outline" title="Family">
        <FamilyInfo />
      </Dropdown>
      <Dropdown iconName="home-outline" title="Friends"></Dropdown>
      <Dropdown iconName="education-outline" title="Education"></Dropdown>
      <Dropdown iconName="person" title="Career"></Dropdown>
      <Dropdown iconName="home-outline" title="Living"></Dropdown>
      <Dropdown iconName="calendar" title="Dates"></Dropdown>
      <Dropdown iconName="work-outline" title="Organizations"></Dropdown>
    </View>
  )
}
