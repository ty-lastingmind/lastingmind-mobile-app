import { KeyboardAvoidingView } from 'react-native'
import { SettingsScreenLayout } from '../../components/common/screen-layout'
import { HelpChatProvider } from '../../contexts/help-chat-context'
import { HelpActions } from '../../parts/help-actions'
import { HelpChat } from '../../parts/help-chat'
import { HelpInput } from '../../parts/help-input'

export function HelpScreen() {
  return (
    <HelpChatProvider>
      <SettingsScreenLayout title="Help">
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={150}>
          <HelpChat />
          <HelpActions />
          <HelpInput />
        </KeyboardAvoidingView>
      </SettingsScreenLayout>
    </HelpChatProvider>
  )
}
