import SbNumberField from './index'

import type { Args, Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'

type Story = StoryObj<typeof SbNumberField>

const meta: Meta<typeof SbNumberField> = {
  title: 'Forms/SbNumberField',
  component: SbNumberField,
  args: {
    id: 'example',
    name: 'example',
    label: 'Number input',
    disabled: false,
    required: false,
    placeholder: 'Placeholder text',
    min: 0,
    type: 'number',
    max: 100,
    step: 1,
    precision: 0,
    readonly: false,
    modelValue: 10,
    errorMessage: 'Some error message',
    error: false,
  },
  render: (args: Args) => ({
    components: { SbNumberField },
    setup: () => {
      const internalValue = ref(args.modelValue)
      return { internalValue, args }
    },

    template: `
    <div style="max-width: 300px">
      <SbNumberField
        style="margin-bottom: 20px;"
        v-bind="args"
        v-model="internalValue"
      />
    </div>
  `,
  }),
}

export default meta

export const Default: Story = {}

export const withMinAndMax: Story = {
  args: {
    min: -10,
    max: 10,
  },
  parameters: {
    docs: {
      description: {
        story:
          'You can set the minimum and maximum value of the input, e.g. -10 to 10',
      },
    },
  },
}

export const withStep: Story = {
  args: {
    step: 0.5,
    precision: 2,
  },
  parameters: {
    docs: {
      description: {
        story: 'You can set the step of the input, e.g. 0.5',
      },
    },
  },
}

export const withPrecision: Story = {
  args: {
    precision: 3,
  },
}

export const withDisabled: Story = {
  args: {
    disabled: true,
  },
}

export const withReadonly: Story = {
  args: {
    readonly: true,
  },
}

export const withRequired: Story = {
  args: {
    required: true,
  },
}

export const withError: Story = {
  args: {
    error: true,
    errorMessage: 'This is an error message',
  },
}

export const withLabel: Story = {
  args: {
    label: 'Number input',
  },
}

export const withPlaceholder: Story = {
  args: {
    placeholder: 'Placeholder text',
    modelValue: undefined,
  },
}
