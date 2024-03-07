import SbFormItem from './index'
import SbRadio from '../Radio'
import SbTextField from '../TextField'
import SbButton from '../Button'

import type { Args, Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'

type Story = StoryObj<typeof SbFormItem>

const meta: Meta<typeof SbFormItem> = {
  title: 'Forms/SbFormItem',
  component: SbFormItem,
  args: {
    label: 'A form item',
    helperIconText: null,
    helperText: null,
    isRequired: false,
    icon: null,
    labelFor: 'textfield-id',
  },
  render: (args: Args) => ({
    components: { SbButton, SbFormItem, SbRadio, SbTextField },
    setup() {
      return { args }
    },
    template: `
    <div>
      <SbFormItem
        v-bind="args"
      >
        <SbTextField
          :placeholder="placeholder"
          :id="args.labelFor"
        />
      </SbFormItem>
    </div>
  `,
  }),
}

export default meta

export const Default: Story = {
  args: {
    labelFor: 'textfield-id-0',
  },
}

export const WithIcon: Story = {
  args: {
    icon: 'lock',
    label: 'Form item with icon',
    labelFor: 'textfield-id-1',
  },
}

export const WithHelperText: Story = {
  args: {
    helperText: 'This is a helper text',
    helperIconText: 'This is a icon text',
    label: 'Form item with helper text',
    tooltipPosition: 'top',
    labelFor: 'textfield-id-2',
  },
}

export const WithRequired: Story = {
  args: {
    isRequired: true,
    label: 'Form item with required',
    labelFor: 'textfield-id-3',
  },
}

export const WithButton: Story = {
  args: {
    label: 'Grouped form item with button',
    grouped: true,
    labelFor: 'textfield-id-4',
  },
  render: (args: Args) => ({
    components: { SbFormItem, SbTextField, SbButton },
    setup() {
      return { args }
    },
    template: `
    <div>
      <SbFormItem
        v-bind="args"
      >
        <SbTextField :id="args.labelFor"/>
        <SbButton label="Button" />
      </SbFormItem>
    </div>
  `,
  }),
}
