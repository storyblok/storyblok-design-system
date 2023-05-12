import SbTextField from './index'

export default {
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
    errorMessage: 'Some error message',

    error: false,
    clearable: false,
    ghost: false,

    prefix: 'http://',
    suffix: '.com',

    maxlength: 60,
    mask: '####-##-##',
  },
}

export const Default = (args) => ({
  components: { SbTextField },
  setup() {
    return { ...args }
  },
  data: () => ({
    internalValue: 'Boris Spassky',
    internalType: 'password',
    internalIconRight: 'eye',
  }),
  template: `
    <div style="max-width: 300px">
      <SbTextField
        :id="id"
        :name="name"
        :label="label"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        :readonly="readonly"
        :native-valueargs.="nativeValue"
        v-model="internalValue"
      /><br>
      <SbTextField
        :id="id"
        :name="name"
        label="With remaining characters counter"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        :readonly="readonly"
        :maxlength="maxlength"
        :native-valueargs.="nativeValue"
        v-model="internalValue"
      /><br>
      <SbTextField
        :id="id"
        :name="name"
        label="Disabled text input"
        :required="required"
        :placeholder="placeholder"
        :native-valueargs.="nativeValue"
        v-model="internalValue"
        disabled
      /><br>
      <SbTextField
        :id="id"
        :name="name"
        label="Read only"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        :native-valueargs.="nativeValue"
        v-model="internalValue"
        readonly
      /><br>
      <SbTextField
        :id="id"
        :name="name"
        label="With error"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        iconRight="square-error"
        native-value="Some text with error"
        v-model="internalValue"
        :errorMessage="errorMessage"
        error
      /><br>
      <SbTextFiel
      :id="id"
      :name="name"
      label="With error but no icon"
      :disabled="disabled"
      :required="required"
      :placeholder="placeholder"
      iconRight=""
      native-value="Some text with error but no icon"
      v-model="internalValue"
      :errorMessage="errorMessage"
      error
    />
      <SbTextField
        :id="id"
        :name="name"
        label="Clearable"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        native-value="Boris Spassky"
        v-model="internalValue"
        clearable
      /><br>
      <SbTextField
        :id="id"
        :name="name"
        label="Show / Hide password"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        iconRight="eye"
        type="password"
        native-value="Boris Spassky"
        v-model="internalValue"
      /><br>
      <SbTextField
        :id="id"
        :name="name"
        :label="label"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        :readonly="readonly"
        :maxlength="maxlength"
        v-model="internalValue"
      /><br>
      <SbTextField
        :id="id"
        :name="name"
        label="With max length"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        :readonly="readonly"
        maxlength="200"
        v-model="internalValue"
      /><br>
    </div>
  `,
})

export const withIcon = (args) => ({
  components: { SbTextField },
  setup() {
    return { ...args }
  },
  data: () => ({
    internalValue: 'Boris Spassky',
  }),
  template: `
    <div style="max-width: 300px">
      <SbTextField
        :id="id"
        :name="name"
        label="With icon before"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        :readonly="readonly"
        iconLeft="search"
        native-value="Boris Spassky"
        v-model="internalValue"
      /><br>
      <SbTextField
        :id="id"
        :name="name"
        label="With icon after"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        :readonly="readonly"
        iconRight="search"
        native-value="Boris Spassky"
        v-model="internalValue"
      /><br>
      <SbTextField
        :id="id"
        :name="name"
        label="Ghost with icon before"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        :readonly="readonly"
        iconLeft="search"
        native-value="Boris Spassky"
        v-model="internalValue"
        ghost
      /><br>
      <SbTextField
        :id="id"
        :name="name"
        label="Ghost with icon after"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        :readonly="readonly"
        iconRight="search"
        native-value="Boris Spassky"
        v-model="internalValue"
        ghost
      /><br>
      <SbTextField
        :id="id"
        :name="name"
        label="Default clearable with icon"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        iconLeft="search"
        native-value="Boris Spassky"
        v-model="internalValue"
        clearable
      /><br>
      <SbTextField
        :id="id"
        :name="name"
        label="Ghost clearable with icon"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        iconLeft="search"
        native-value="Boris Spassky"
        v-model="internalValue"
        clearable
        ghost
      /><br>
    </div>
  `,
})

export const Ghost = (args) => ({
  components: { SbTextField },
  setup() {
    return { ...args }
  },
  data: () => ({
    internalValue: 'Boris Spassky',
    internalType: 'text',
    internalIconRight: 'eye',
  }),
  template: `
    <div style="max-width: 300px">
      <SbTextField
        :id="id"
        :name="name"
        :label="label"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        :readonly="readonly"
        native-value="Boris Spassky"
        v-model="internalValue"
        ghost
      /><br>
      <SbTextField
        :id="id"
        :name="name"
        label="Clearable"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        native-value="Boris Spassky"
        v-model="internalValue"
        clearable
        ghost
      /><br>
      <SbTextField
        :id="id"
        :name="name"
        label="Show / Hide password"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        iconRight="eye"
        type="password"
        native-value="Boris Spassky"
        v-model="internalValue"
        ghost
      /><br>
    </div>
  `,
})

export const withText = (args) => ({
  components: { SbTextField },
  setup() {
    return { ...args }
  },
  data: () => ({
    internalValue: 'Boris Spassky',
  }),
  template: `
    <div style="max-width: 300px">
      <SbTextField
        :id="id"
        :name="name"
        label="With text before"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        :prefix="prefix"
        :readonly="readonly"
        native-value="Boris Spassky"
        v-model="internalValue"
      /><br>
      <SbTextField
        :id="id"
        :name="name"
        label="With text after"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        :readonly="readonly"
        :suffix="suffix"
        native-value="Boris Spassky"
        v-model="internalValue"
      /><br>
    </div>
  `,
})

export const TextArea = (args) => ({
  components: { SbTextField },
  setup() {
    return { ...args }
  },
  data: () => ({
    internalValue: 'Boris Spassky',
  }),
  template: `
    <div style="max-width: 300px">
      <SbTextField
        type="textarea"
        :id="id"
        :name="name"
        label="Textarea element"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        :readonly="readonly"
        native-value="Boris Spassky"
        :maxlength="maxlength"
        v-model="internalValue"
      /><br>
    </div>
  `,
})

export const withMask = (args) => ({
  components: { SbTextField },
  setup() {
    return { ...args }
  },
  data: () => ({
    internalValue: '',
  }),
  template: `
    <div style="max-width: 300px">
      <SbTextField
        :id="id"
        :name="name"
        label="With mask"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        :readonly="readonly"
        native-value="Boris Spassky"
        v-model="internalValue"
        :mask="mask"
      /><br>
    </div>
  `,
})

withMask.args = {
  placeholder: '####-##-##',
  mask: '####-##-##',
}
withMask.parameters = {
  docs: {
    description: {
      story:
        'Use "#" for numbers (0-9), “S” for letter in any case (a-z,A-Z), “X” for number or letter (a-z,A-Z,0-9), “*” for repeat and “!” for optional (next character).',
    },
  },
}
