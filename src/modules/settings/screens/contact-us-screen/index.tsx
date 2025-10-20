import React from 'react'
import { SettingsScreenLayout } from '../../components/common/screen-layout'
import { ContactUsForm } from '../../parts/contact-us-form'

export function ContactUsScreen() {
  return (
    <SettingsScreenLayout title="Contact Us">
      <ContactUsForm />
    </SettingsScreenLayout>
  )
}
