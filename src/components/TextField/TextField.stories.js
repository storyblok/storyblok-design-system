import SbTextfield from './index'

export default {
  title: 'SbTextfield',
  component: SbTextfield,
  args: {
    id: 'example',
    name: 'example',
    label: 'Text input',
    disabled: false,
    required: false,
    placeholder: 'Placeholder text',
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
  components: { SbTextfield },
  props: Object.keys(args),
  data: () => ({
    internalValue: 'Boris Spassky',
    internalType: 'password',
    internalIconRight: 'eye',
  }),
  template: `
    <div>
      <SbTextfield
        style="margin-bottom: 2rem;"
        :id="id"
        :name="name"
        :label="label"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        :native-value="nativeValue"
        v-model="internalValue"
      />
      <SbTextfield
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
      <SbTextfield
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
      <SbTextfield
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
      <SbTextfield
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
      <SbTextfield
        :id="id"
        :name="name"
        label="Number input"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        type="number"
        native-value="30011937"
        v-model="internalValue"
      />
    </div>
  `,
})

export const withIcon = (args) => ({
  components: { SbTextfield },
  props: Object.keys(args),
  data: () => ({
    internalValue: 'Boris Spassky',
  }),
  template: `
    <div>
      <SbTextfield
        style="margin-bottom: 2rem;"
        :id="id"
        :name="name"
        label="With icon before"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        iconLeft="search"
        native-value="Boris Spassky"
        v-model="internalValue"
      />
      <SbTextfield
        style="margin-bottom: 2rem;"
        :id="id"
        :name="name"
        label="With icon after"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        iconRight="search"
        native-value="Boris Spassky"
        v-model="internalValue"
      />
      <SbTextfield
        style="margin-bottom: 2rem;"
        :id="id"
        :name="name"
        label="Ghost with icon before"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        iconLeft="search"
        native-value="Boris Spassky"
        v-model="internalValue"
        ghost
      />
      <SbTextfield
        style="margin-bottom: 2rem;"
        :id="id"
        :name="name"
        label="Ghost with icon after"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        iconRight="search"
        native-value="Boris Spassky"
        v-model="internalValue"
        ghost
      />
      <SbTextfield
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
      <SbTextfield
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
  components: { SbTextfield },
  props: Object.keys(args),
  data: () => ({
    internalValue: 'Boris Spassky',
    internalType: 'text',
    internalIconRight: 'eye',
  }),
  template: `
    <div>
      <SbTextfield
        style="margin-bottom: 2rem;"
        :id="id"
        :name="name"
        :label="label"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        native-value="Boris Spassky"
        v-model="internalValue"
        ghost
      />
      <SbTextfield
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
      <SbTextfield
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
      <SbTextfield
        :id="id"
        :name="name"
        label="Number input"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        type="number"
        native-value="30011937"
        v-model="internalValue"
        ghost
      />
    </div>
  `,
})

export const withText = (args) => ({
  components: { SbTextfield },
  props: Object.keys(args),
  data: () => ({
    internalValue: 'Boris Spassky',
  }),
  template: `
    <div>
      <SbTextfield
        style="margin-bottom: 2rem;"
        :id="id"
        :name="name"
        label="With text before"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        :prefix="prefix"
        native-value="Boris Spassky"
        v-model="internalValue"
        withTextLeft
      />
      <SbTextfield
        style="margin-bottom: 2rem;"
        :id="id"
        :name="name"
        label="With text after"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        :suffix="suffix"
        native-value="Boris Spassky"
        v-model="internalValue"
        withTextRight
      />
    </div>
  `,
})
