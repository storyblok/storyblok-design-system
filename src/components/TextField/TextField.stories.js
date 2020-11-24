import SbTextField from './index'

export default {
  title: 'SbTextField',
  component: SbTextField,
  args: {
    id: 'example',
    name: 'example',
    label: 'Text input',
    disabled: false,
    required: false,
    placeholder: 'Placeholder text',
    min: 0,
    max: 100,
    step: 1,
    readonly: false,
    value: 'Boris Spassky',
    nativeValue: 'Boris Spassky',
    errorMessage: 'Some error message',

    error: false,
    clearable: false,
    ghost: false,

    prefix: 'http://',
    suffix: '.com',
  },
}

export const Default = (args) => ({
  components: { SbTextField },
  props: Object.keys(args),
  data: () => ({
    internalValue: 'Boris Spassky',
    internalType: 'password',
    internalIconRight: 'eye',
  }),
  template: `
    <div style="max-width: 300px">
      <SbTextField
        style="margin-bottom: 2rem;"
        :id="id"
        :name="name"
        :label="label"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        :readonly="readonly"
        :native-value="nativeValue"
        v-model="internalValue"
      />
      <SbTextField
        style="margin-bottom: 2rem;"
        :id="id"
        :name="name"
        label="Disabled text input"
        :required="required"
        :placeholder="placeholder"
        :native-value="nativeValue"
        v-model="internalValue"
        disabled
      />
      <SbTextField
        style="margin-bottom: 2rem;"
        :id="id"
        :name="name"
        label="Read only"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        :native-value="nativeValue"
        v-model="internalValue"
        readonly
      />
      <SbTextField
        style="margin-bottom: 2rem;"
        :id="id"
        :name="name"
        label="With error"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        iconRight="input-error"
        native-value="Some text with error"
        v-model="internalValue"
        :errorMessage="errorMessage"
        error
      />
      <SbTextField
        style="margin-bottom: 2rem;"
        :id="id"
        :name="name"
        label="Clearable"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        native-value="Boris Spassky"
        v-model="internalValue"
        clearable
      />
      <SbTextField
        style="margin-bottom: 2rem;"
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
      />
      <SbTextField
        style="max-width: 100px;"
        :id="id"
        :name="name"
        label="Number input"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        :min="min"
        :max="max"
        :step="step"
        :readonly="readonly"
        type="number"
        native-value="30011937"
        v-model="internalValue"
      />
    </div>
  `,
})

export const withIcon = (args) => ({
  components: { SbTextField },
  props: Object.keys(args),
  data: () => ({
    internalValue: 'Boris Spassky',
  }),
  template: `
    <div style="max-width: 300px">
      <SbTextField
        style="margin-bottom: 2rem;"
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
      />
      <SbTextField
        style="margin-bottom: 2rem;"
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
      />
      <SbTextField
        style="margin-bottom: 2rem;"
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
      />
      <SbTextField
        style="margin-bottom: 2rem;"
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
      />
      <SbTextField
        style="margin-bottom: 2rem;"
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
      />
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
      />
    </div>
  `,
})

export const Ghost = (args) => ({
  components: { SbTextField },
  props: Object.keys(args),
  data: () => ({
    internalValue: 'Boris Spassky',
    internalType: 'text',
    internalIconRight: 'eye',
  }),
  template: `
    <div style="max-width: 300px">
      <SbTextField
        style="margin-bottom: 2rem;"
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
      />
      <SbTextField
        style="margin-bottom: 2rem;"
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
      />
      <SbTextField
        style="margin-bottom: 2rem;"
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
      />
      <SbTextField
        :id="id"
        :name="name"
        label="Number input"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        :min="min"
        :max="max"
        :step="step"
        :readonly="readonly"
        type="number"
        native-value="30011937"
        v-model="internalValue"
        ghost
      />
    </div>
  `,
})

export const withText = (args) => ({
  components: { SbTextField },
  props: Object.keys(args),
  data: () => ({
    internalValue: 'Boris Spassky',
  }),
  template: `
    <div style="max-width: 300px">
      <SbTextField
        style="margin-bottom: 2rem;"
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
      />
      <SbTextField
        style="margin-bottom: 2rem;"
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
      />
    </div>
  `,
})
