import { Pressable, View } from 'react-native'
import { Input } from '~/modules/ui/input'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { useHelpChat } from '../../contexts/help-chat-context'

export function HelpInput() {
  const { sendHelpChat } = useHelpChat()

  const handleSendHelpChat = () => {
    sendHelpChat('tell me how to use the app')
  }

  return (
    <View className="flex flex-row bg-bg-secondary items-center justify-center h-[52px] p-[14px] rounded-[26px]">
      <Input
        placeholder="Ask anything"
        value=""
        onChangeText={() => {}}
        color="secondary"
        className="bg-transparent border-0 flex-1"
      />
      <SvgIcon name="mic" size="lg" color="miscellaneous" />
      <Pressable onPress={handleSendHelpChat}>
        <SvgIcon name="send" size="lg" color="miscellaneous" />
      </Pressable>
    </View>
  )
}
