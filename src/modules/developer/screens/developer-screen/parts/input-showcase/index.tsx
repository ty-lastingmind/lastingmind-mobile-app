import { View } from 'react-native'
import { Icon } from '~/modules/ui/icon'

import { Input } from '~/modules/ui/input'
import { InputGroup } from '~/modules/ui/input-group'
import { Selector } from '~/modules/ui/selector'
import { Typography } from '~/modules/ui/typography'

const mockOptions = [
  { name: 'option 1', value: 'option1' },
  { name: 'option 2', value: 'option2' },
  { name: 'option 3', value: 'option3' },
]

const mockInputList = [
  {
    name: 'field1',
    label: 'Field 1',
    placeholder: 'Enter field 1',
  },
  {
    name: 'field2',
    placeholder: 'Enter field 2',
  },
  {
    name: 'field3',
    label: 'Field 3',
    placeholder: 'Select field 3',
    options: [
      { name: 'Option 1', value: 'option1' },
      { name: 'Option 2', value: 'option2' },
      { name: 'Option 3', value: 'option3' },
    ],
  },
  {
    name: 'field4',
    placeholder: 'Select field 4',
    options: [
      { name: 'Option A', value: 'optionA' },
      { name: 'Option B', value: 'optionB' },
      { name: 'Option C', value: 'optionC' },
    ],
  },
]

export function InputShowcase() {
  return (
    <View className="flex gap-4">
      <Typography level="h2">Input</Typography>

      <View className="flex gap-2">
        <Typography level="h3">Input variants</Typography>
        <Input color="primary" placeholder="Input primary" />
        <Input color="secondary" placeholder="Input secondary" />
        <Input isError placeholder="Input error" />
        <Selector options={mockOptions} placeholder="Select an option" />
      </View>
      <View className="flex gap-2">
        <Typography level="h3">Input right adornment</Typography>
        <Input color="primary" placeholder="Input primary" rightAdornment={<Icon name="person" />} />
      </View>
      <View className="flex gap-3">
        <Typography level="h3">Input group</Typography>
        <InputGroup inputList={mockInputList} />
      </View>
    </View>
  )
}
