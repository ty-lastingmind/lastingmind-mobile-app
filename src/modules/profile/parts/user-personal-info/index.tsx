import { View } from 'react-native'
import React from 'react'
import { Typography } from '~/modules/ui/typography'
import Dropdown from '~/modules/ui/dropdown'
import { FamilyInfo } from '../user-info-family'
import { FriendsInfo } from '../user-info-friends'
import { EducationInfo } from '../user-info-education'
import { CareerInfo } from '../user-info-career'
import { LivingInfo } from '../user-info-living'
import { DatesInfo } from '../user-info-dates'
import { OrganizationsInfo } from '../user-info-organizations'

export default function UserPersonalInfo() {
  return (
    <View className="gap-4">
      <Typography level="h5" weight="bold">
        Personal Info
      </Typography>

      <Dropdown iconName="home-outline" title="Family">
        <FamilyInfo />
      </Dropdown>
      <Dropdown iconName="home-outline" title="Friends">
        <FriendsInfo />
      </Dropdown>
      <Dropdown iconName="education-outline" title="Education">
        <EducationInfo />
      </Dropdown>
      <Dropdown iconName="person" title="Career">
        <CareerInfo />
      </Dropdown>
      <Dropdown iconName="home-outline" title="Living">
        <LivingInfo />
      </Dropdown>
      <Dropdown iconName="calendar" title="Dates">
        <DatesInfo />
      </Dropdown>
      <Dropdown iconName="work-outline" title="Organizations">
        <OrganizationsInfo />
      </Dropdown>
    </View>
  )
}
