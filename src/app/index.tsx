import { Redirect } from 'expo-router'

export default function RootPage() {
  return <Redirect href="/auth/sign-in" />
}
