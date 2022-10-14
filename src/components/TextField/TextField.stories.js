import SbTextField from './index'

export default {
  title: 'Design System/Components/Form/SbTextField',
  component: SbTextField,
  args: {
    id: 'example',
    name: 'example',
    label: 'Text input',
    disabled: false,
    required: false,
    placeholder: 'Placeholder text',
    readonly: false,
    value: 'Boris Spassky',
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
    return { args }
  },
  data: () => ({
    internalValue: 'Boris Spassky',
    internalType: 'password',
    internalIconRight: 'view',
  }),
  template: `
    <div style="max-width: 300px">
      <SbTextField
        style="margin-bottom: 20px;"
        :id="args.id"
        :name="args.name"
        :label="args.label"
        :disabled="args.disabled"
        :required="args.required"
        :placeholder="args.placeholder"
        :readonly="args.readonly"
        :native-valueargs.="nativeValue"
        v-model="internalValue"
      />
      <SbTextField
        style="margin-bottom: 20px;"
        :id="args.id"
        :name="args.name"
        label="With remaining characters counter"
        :disabled="args.disabled"
        :required="args.required"
        :placeholder="args.placeholder"
        :readonly="args.readonly"
        :maxlength="args.maxlength"
        :native-valueargs.="nativeValue"
        v-model="internalValue"
      />
      <SbTextField
        style="margin-bottom: 20px;"
        :id="args.id"
        :name="args.name"
        label="Disabled text input"
        :required="args.required"
        :placeholder="args.placeholder"
        :native-valueargs.="nativeValue"
        v-model="internalValue"
        disabled
      />
      <SbTextField
        style="margin-bottom: 20px;"
        :id="args.id"
        :name="args.name"
        label="Read only"
        :disabled="args.disabled"
        :required="args.required"
        :placeholder="args.placeholder"
        :native-valueargs.="nativeValue"
        v-model="internalValue"
        readonly
      />
      <SbTextField
        style="margin-bottom: 20px;"
        :id="args.id"
        :name="args.name"
        label="With error"
        :disabled="args.disabled"
        :required="args.required"
        :placeholder="args.placeholder"
        iconRight="square-error"
        native-value="Some text with error"
        v-model="internalValue"
        :errorMessage="args.errorMessage"
        error
      />
      <SbTextField
      style="margin-bottom: 20px;"
      :id="args.id"
      :name="args.name"
      label="With error but no icon"
      :disabled="args.disabled"
      :required="args.required"
      :placeholder="args.placeholder"
      iconRight=""
      native-value="Some text with error but no icon"
      v-model="internalValue"
      :errorMessage="args.errorMessage"
      error
    />
      <SbTextField
        style="margin-bottom: 20px;"
        :id="args.id"
        :name="args.name"
        label="Clearable"
        :disabled="args.disabled"
        :required="args.required"
        :placeholder="args.placeholder"
        native-value="Boris Spassky"
        v-model="internalValue"
        clearable
      />
      <SbTextField
        style="margin-bottom: 20px;"
        :id="args.id"
        :name="args.name"
        label="Show / Hide password"
        :disabled="args.disabled"
        :required="args.required"
        :placeholder="args.placeholder"
        iconRight="view"
        type="password"
        native-value="Boris Spassky"
        v-model="internalValue"
      />
      <SbTextField
        :id="args.id"
        :name="args.name"
        :label="args.label"
        :disabled="args.disabled"
        :required="args.required"
        :placeholder="args.placeholder"
        :readonly="args.readonly"
        :maxlength="args.maxlength"
        v-model="internalValue"
      />
    </div>
  `,
})

export const withIcon = (args) => ({
  components: { SbTextField },
  setup() {
    return { args }
  },
  data: () => ({
    internalValue: 'Boris Spassky',
  }),
  template: `
    <div style="max-width: 300px">
      <SbTextField
        style="margin-bottom: 20px;"
        :id="args.id"
        :name="args.name"
        label="With icon before"
        :disabled="args.disabled"
        :required="args.required"
        :placeholder="args.placeholder"
        :readonly="args.readonly"
        iconLeft="search"
        native-value="Boris Spassky"
        v-model="internalValue"
      />
      <SbTextField
        style="margin-bottom: 20px;"
        :id="args.id"
        :name="args.name"
        label="With icon after"
        :disabled="args.disabled"
        :required="args.required"
        :placeholder="args.placeholder"
        :readonly="args.readonly"
        iconRight="search"
        native-value="Boris Spassky"
        v-model="internalValue"
      />
      <SbTextField
        style="margin-bottom: 20px;"
        :id="args.id"
        :name="args.name"
        label="Ghost with icon before"
        :disabled="args.disabled"
        :required="args.required"
        :placeholder="args.placeholder"
        :readonly="args.readonly"
        iconLeft="search"
        native-value="Boris Spassky"
        v-model="internalValue"
        ghost
      />
      <SbTextField
        style="margin-bottom: 20px;"
        :id="args.id"
        :name="args.name"
        label="Ghost with icon after"
        :disabled="args.disabled"
        :required="args.required"
        :placeholder="args.placeholder"
        :readonly="args.readonly"
        iconRight="search"
        native-value="Boris Spassky"
        v-model="internalValue"
        ghost
      />
      <SbTextField
        style="margin-bottom: 20px;"
        :id="args.id"
        :name="args.name"
        label="Default clearable with icon"
        :disabled="args.disabled"
        :required="args.required"
        :placeholder="args.placeholder"
        iconLeft="search"
        native-value="Boris Spassky"
        v-model="internalValue"
        clearable
      />
      <SbTextField
        :id="args.id"
        :name="args.name"
        label="Ghost clearable with icon"
        :disabled="args.disabled"
        :required="args.required"
        :placeholder="args.placeholder"
        iconLeft="search"
        native-value="Boris Spassky"
        v-model="internalValue"
        clearable
        ghost
      />
    </div>
  `,
})

export const Ghost = (args) => ({
  components: { SbTextField },
  setup() {
    return { args }
  },
  data: () => ({
    internalValue: 'Boris Spassky',
    internalType: 'text',
    internalIconRight: 'view',
  }),
  template: `
    <div style="max-width: 300px">
      <SbTextField
        style="margin-bottom: 20px;"
        :id="args.id"
        :name="args.name"
        :label="args.label"
        :disabled="args.disabled"
        :required="args.required"
        :placeholder="args.placeholder"
        :readonly="args.readonly"
        native-value="Boris Spassky"
        v-model="internalValue"
        ghost
      />
      <SbTextField
        style="margin-bottom: 20px;"
        :id="args.id"
        :name="args.name"
        label="Clearable"
        :disabled="args.disabled"
        :required="args.required"
        :placeholder="args.placeholder"
        native-value="Boris Spassky"
        v-model="internalValue"
        clearable
        ghost
      />
      <SbTextField
        style="margin-bottom: 20px;"
        :id="args.id"
        :name="args.name"
        label="Show / Hide password"
        :disabled="args.disabled"
        :required="args.required"
        :placeholder="args.placeholder"
        iconRight="view"
        type="password"
        native-value="Boris Spassky"
        v-model="internalValue"
        ghost
      />
    </div>
  `,
})

export const withText = (args) => ({
  components: { SbTextField },
  setup() {
    return { args }
  },
  data: () => ({
    internalValue: 'Boris Spassky',
  }),
  template: `
    <div style="max-width: 300px">
      <SbTextField
        style="margin-bottom: 20px;"
        :id="args.id"
        :name="args.name"
        label="With text before"
        :disabled="args.disabled"
        :required="args.required"
        :placeholder="args.placeholder"
        :prefix="args.prefix"
        :readonly="args.readonly"
        native-value="Boris Spassky"
        v-model="internalValue"
      />
      <SbTextField
        style="margin-bottom: 20px;"
        :id="args.id"
        :name="args.name"
        label="With text after"
        :disabled="args.disabled"
        :required="args.required"
        :placeholder="args.placeholder"
        :readonly="args.readonly"
        :suffix="args.suffix"
        native-value="Boris Spassky"
        v-model="internalValue"
      />
    </div>
  `,
})

export const TextArea = (args) => ({
  components: { SbTextField },
  setup() {
    return { args }
  },
  data: () => ({
    internalValue: 'Boris Spassky',
  }),
  template: `
    <div style="max-width: 300px">
      <SbTextField
        type="textarea"
        :id="args.id"
        :name="args.name"
        label="Textarea element"
        :disabled="args.disabled"
        :required="args.required"
        :placeholder="args.placeholder"
        :readonly="args.readonly"
        native-value="Boris Spassky"
        :maxlength="args.maxlength"
        v-model="internalValue"
      />
    </div>
  `,
})

export const withMask = (args) => ({
  components: { SbTextField },
  setup() {
    return { args }
  },
  data: () => ({
    internalValue: '',
  }),
  template: `
    <div style="max-width: 300px">
      <SbTextField
        style="margin-bottom: 20px;"
        :id="args.id"
        :name="args.name"
        label="With mask"
        :disabled="args.disabled"
        :required="args.required"
        :placeholder="args.placeholder"
        :readonly="args.readonly"
        native-value="Boris Spassky"
        v-model="internalValue"
        :mask="args.mask"
      />
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
