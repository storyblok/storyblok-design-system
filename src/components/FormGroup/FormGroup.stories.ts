import SbFormGroup from './index'
import { SbSelect } from '../Select'
import SbTextField from '../TextField'

import type { Args, Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'

type Story = StoryObj<typeof SbFormGroup>

const meta: Meta<typeof SbFormGroup> = {
  title: 'Forms/SbFormGroup',
  component: SbFormGroup,
  excludeStories: /.*Data$/,
  args: {
    legend: 'Group Name',
    description: 'Optional description for group',
    inline: false,
  },
}

export const defaultSelectOptionsData = [
  {
    label: 'Option 1',
    value: 'Option 1',
  },
  {
    label: 'Option 2',
    value: 'Option 2',
  },
  {
    label: 'Option 3',
    value: 'Option 3',
  },
]

export default meta

export const Default: Story = {
  render: (args: Args) => ({
    components: { SbFormGroup, SbSelect, SbTextField },
    setup() {
      const options = ref([...defaultSelectOptionsData])
      const label = ref('Label')
      const placeholder = ref('Placeholder')

      return { args, options, label, placeholder }
    },

    template: `
    <div>
      <SbFormGroup
        v-bind="args"
        style="margin-bottom: 20px; max-width: 300px"
      >
        <SbTextField
          :placeholder="placeholder"
          style="margin-bottom: 15px;"
        />
        <SbTextField
          :placeholder="placeholder"
          style="margin-bottom: 15px;"
        />
      </SbFormGroup>

      <SbFormGroup
        v-bind="args"
        style="margin-bottom: 20px; max-width: 300px"
      >
        <SbTextField
          :label="label"
          style="margin-bottom: 15px;"
        />
        <SbTextField
          :label="label"
          style="margin-bottom: 15px;"
        />
      </SbFormGroup>

      <SbFormGroup
        v-bind="args"
        style="margin-bottom: 20px; max-width: 300px"
      >
        <SbSelect
          label="Choose an option"
          :options="options"
          style="display: block; margin-bottom: 15px; width: 100%; box-sizing: border-box"
        />

        <SbSelect
          label="Choose an option"
          :options="options"
          style="display: block; margin-bottom: 15px; width: 100%; box-sizing: border-box"
        />
      </SbFormGroup>
    </div>
  `,
  }),
}

export const Inline: Story = {
  render: (args: Args) => ({
    components: { SbFormGroup, SbSelect, SbTextField },
    setup() {
      const options = ref([...defaultSelectOptionsData])
      const label = ref('Label')
      const placeholder = ref('Placeholder')

      return { args, options, label, placeholder }
    },
    template: `
    <div>
      <SbFormGroup
        v-bind="args"
        style="margin-bottom: 20px;"
      >
        <SbTextField
          :placeholder="placeholder"
          style="margin-bottom: 15px; max-width: 300px"
        />
        <SbTextField
          :placeholder="placeholder"
          style="margin-bottom: 15px; max-width: 300px"
        />
      </SbFormGroup>

      <SbFormGroup
        v-bind="args"
        style="margin-bottom: 20px;"
      >
        <SbTextField
          :label="label"
          style="margin-bottom: 15px; max-width: 300px"
        />
        <SbTextField
          :label="label"
          style="margin-bottom: 15px; max-width: 300px"
        />
      </SbFormGroup>
    </div>
  `,
  }),
  args: {
    inline: true,
  },
}
