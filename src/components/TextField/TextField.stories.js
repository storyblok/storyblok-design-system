import SbTextField from './index'

export default {
  title: 'SbTextField',
  component: SbTextField,
  args: {
    label: 'Text input',
    id: 'example',
    name: 'example',
    type: 'text',
    value: 'Bobby Fischer',
    nativeValue: 'Bobby Fischer',
    disabled: false,
    required: false,

    error: false,
    clearable: false,
    ghost: false,
    withIconBefore: false,
    withIconAfter: false,

    icon: {
      side: 'right',
      name: 'search',
      size: 'small',
    },

    errorMessage: null,
    placeholder: 'Placeholder text',
  },
  argTypes: {
    type: {
      name: 'type',
      description: '`SbTextField` type',
      control: {
        type: 'select',
        options: ['number', 'password', 'text'],
      },
    },
  },
}

export const Default = (args) => ({
  components: { SbTextField },
  props: Object.keys(args),
  data: () => ({
    internalValue: 'Bobby Fischer',
  }),
  template: `
    <SbTextField
      :id="id"
      :name="name"
      :label="label"
      :disabled="disabled"
      :required="required"
      :placeholder="placeholder"
      :type="type"
      :error="error"
      :clearable="clearable"
      :ghost="ghost"
      :withIconBefore="withIconBefore"
      :withIconAfter="withIconAfter"
      :native-value="nativeValue"
      v-model="internalValue"
    />
  `,
})

export const Error = (args) => ({
  components: { SbTextField },
  props: Object.keys(args),
  data: () => ({
    internalValue: 'Bobby Fischer',
  }),
  template: `
    <SbTextField
      :id="id"
      :name="name"
      :label="label"
      :disabled="disabled"
      :required="required"
      :placeholder="placeholder"
      :type="type"
      native-value="Some text with error"
      v-model="internalValue"
      errorMessage="Some error message"
      error
    />
  `,
})

export const Clearable = (args) => ({
  components: { SbTextField },
  props: Object.keys(args),
  data: () => ({
    internalValue: 'Bobby Fischer',
  }),
  template: `
    <SbTextField
      :id="id"
      :name="name"
      :label="label"
      :disabled="disabled"
      :required="required"
      :placeholder="placeholder"
      :type="type"
      native-value="Some clearable text"
      v-model="internalValue"
      clearable
    />
  `,
})

export const Ghost = (args) => ({
  components: { SbTextField },
  props: Object.keys(args),
  data: () => ({
    internalValue: 'Bobby Fischer',
  }),
  template: `
    <SbTextField
      :id="id"
      :name="name"
      :label="label"
      :disabled="disabled"
      :required="required"
      :placeholder="placeholder"
      :type="type"
      :icon="icon"
      native-value="Bobby Fischer"
      v-model="internalValue"
      ghost
    />
  `,
})

export const withIconBefore = (args) => ({
  components: { SbTextField },
  props: Object.keys(args),
  data: () => ({
    internalValue: 'Bobby Fischer',
  }),
  template: `
    <SbTextField
      :id="id"
      :name="name"
      :label="label"
      :disabled="disabled"
      :required="required"
      :placeholder="placeholder"
      :type="type"
      :icon="{ side: 'left', name: 'search', size: 'small' }"
      native-value="Bobby Fischer"
      v-model="internalValue"
      withIconBefore
    />
  `,
})

export const withIconAfter = (args) => ({
  components: { SbTextField },
  props: Object.keys(args),
  data: () => ({
    internalValue: 'Bobby Fischer',
  }),
  template: `
    <SbTextField
      :id="id"
      :name="name"
      :label="label"
      :disabled="disabled"
      :required="required"
      :placeholder="placeholder"
      :type="type"
      :icon="{ side: 'right', name: 'search', size: 'small' }"
      native-value="Bobby Fischer"
      v-model="internalValue"
      withIconAfter
    />
  `,
})

export const withTextLeft = (args) => ({
  components: { SbTextField },
  props: Object.keys(args),
  data: () => ({
    internalValue: 'Bobby Fischer',
  }),
  template: `
    <SbTextField
      :id="id"
      :name="name"
      :label="label"
      :disabled="disabled"
      :required="required"
      :placeholder="placeholder"
      :type="type"
      native-value="Bobby Fischer"
      v-model="internalValue"
      clearable
    />
  `,
})

export const withTextRight = (args) => ({
  components: { SbTextField },
  props: Object.keys(args),
  data: () => ({
    internalValue: 'Bobby Fischer',
  }),
  template: `
    <SbTextField
      :id="id"
      :name="name"
      :label="label"
      :disabled="disabled"
      :required="required"
      :placeholder="placeholder"
      :type="type"
      native-value="Bobby Fischer"
      v-model="internalValue"
      clearable
    />
  `,
})
