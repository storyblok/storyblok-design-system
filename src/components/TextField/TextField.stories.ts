import SbTextField from './index'

import type { Args, Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'

type Story = StoryObj<typeof SbTextField>

const meta: Meta<typeof SbTextField> = {
  title: 'Forms/SbTextField',
  component: SbTextField,
  args: {
    id: 'example',
    name: 'example',
    label: 'Text input',
    disabled: false,
    required: false,
    placeholder: 'Placeholder text',
    readonly: false,
    modelValue: 'Boris Spassky',
    nativeValue: 'Boris Spassky',
    errorMessage: '',

    error: false,
    clearable: false,
    ghost: false,

    prefix: '',
    suffix: '',

    maxlength: undefined,
    mask: undefined,

    autoGrow: false,
  },
}

export default meta

export const Default: Story = {
  render: (args: Args) => ({
    components: { SbTextField },
    setup() {
      const internalValue = ref(args.modelValue)
      return { args, internalValue }
    },
    template: `
    <div style="max-width: 300px">
      <SbTextField
        v-bind="args"
        v-model="internalValue"
      />
    </div>
  `,
  }),
  args: {
    id: 'example-default',
  },
}

export const withCounter: Story = {
  args: {
    maxlength: 14,
    label: 'With remaining characters counter',
    id: 'example-counter',
  },
}

export const withMaxLength: Story = {
  args: {
    maxlength: 20,
    label: 'With max length 20',
    id: 'example-max-length',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled text input',
    disabled: true,
    id: 'example-disabled',
  },
}

export const ReadOnly: Story = {
  args: {
    label: 'Readonly text input',
    readonly: true,
    id: 'example-readonly',
  },
}

export const withError: Story = {
  args: {
    label: 'With error',
    error: true,
    errorMessage: 'Some error message',
    id: 'example-error',
  },
}

export const withIconLeft: Story = {
  args: {
    label: 'With icon left',
    iconLeft: 'search',
    id: 'example-icon-right',
  },
}
export const withIconRight: Story = {
  args: {
    label: 'With icon right',
    iconRight: 'search',
    id: 'example-icon-right',
  },
}

export const clearable: Story = {
  args: {
    label: 'Default clearable',
    clearable: true,
    id: 'example-clearable',
  },
}

export const asPassword: Story = {
  args: {
    label: 'Show / Hide password',
    type: 'password',
    iconRight: 'eye',
    id: 'example-password',
  },
}

export const withInlineLabel: Story = {
  args: {
    label: 'With inline label',
    inlineLabel: 'User:',
    id: 'example-inline-label',
  },
  parameters: {
    docs: {
      description: {
        story: 'Use the `inline-label` property to add text inside field',
      },
    },
  },
}

export const withPrefix: Story = {
  args: {
    label: 'With prefix',
    prefix: 'http://',
    id: 'example-prefix',
  },
}

export const withSuffix: Story = {
  args: {
    label: 'With suffix',
    suffix: '.com',
    id: 'example-suffix',
  },
}

export const withGhost: Story = {
  args: {
    label: 'Ghost text input',
    ghost: true,
    id: 'example-ghost',
  },
}

export const withRequired: Story = {
  args: {
    label: 'Required text input',
    required: true,
    id: 'example-required',
  },
}

export const withPlaceholder: Story = {
  args: {
    label: 'With placeholder',
    placeholder: 'Placeholder text',
    modelValue: undefined,
    id: 'example-placeholder',
  },
}

export const Ghost: Story = {
  render: (args: Args) => ({
    components: { SbTextField },
    setup() {
      const internalValue = ref('Boris Spassky')
      return { ...args, internalValue }
    },
    template: `
    <div style="max-width: 300px">
      <SbTextField
        v-bind="args"
        v-model="internalValue"
      /><br>
      <SbTextField
        v-bind="args"
        v-model="internalValue"
        clearable
      /><br>
      <SbTextField
        v-bind="args"
        iconRight="eye"
        type="password"
        native-value="Boris Spassky"
        v-model="internalValue"
      /><br>
    </div>
  `,
  }),
  args: {
    ghost: true,
  },
}

export const asTextArea: Story = {
  args: {
    type: 'textarea',
    label: 'Textarea element',
  },
}

export const withAutoGrowTextarea: Story = {
  args: {
    label: 'Textarea with auto grow',
    autoGrow: true,
    id: 'example-auto-grow',
    type: 'textarea',
  },
}

export const withMask: Story = {
  args: {
    placeholder: '####-##-##',
    mask: '####-##-##',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Use "#" for numbers (0-9), “S” for letter in any case (a-z,A-Z), “X” for number or letter (a-z,A-Z,0-9), “*” for repeat and “!” for optional (next character).',
      },
    },
  },
}
