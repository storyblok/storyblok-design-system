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
    value: 'Boris Spassky',
    nativeValue: 'Boris Spassky',
    errorMessage: 'Some error message',

    error: false,
    clearable: false,
    ghost: false,
    withIconLeft: false,
    withIconRight: false,

    sideText: {
      side: 'right',
      text: 'search',
    },
  },
}

export const Default = (args) => ({
  components: { SbTextField },
  props: Object.keys(args),
  data: () => ({
    internalValue: 'Boris Spassky',
    internalType: 'password',
  }),
  template: `
    <div>
      <SbTextField
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
      <SbTextField
        style="margin-bottom: 2rem;"
        :id="id"
        :name="name"
        label="With error"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        :icon="{ side: 'right', name: 'input-error', size: 'small' }"
        native-value="Some text with error"
        v-model="internalValue"
        :errorMessage="errorMessage"
        withIconRight
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
        withIconRight
      />
      <SbTextField
        style="margin-bottom: 2rem;"
        :id="id"
        :name="name"
        label="Show / Hide password"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        :icon="{ side: 'right', name: 'eye-off', size: 'small' }"
        type="password"
        native-value="Boris Spassky"
        v-model="internalValue"
        withIconRight
      />
      <SbTextField
        :id="id"
        :name="name"
        label="Number input"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        type="number"
        native-value="30011937"
        v-model="internalValue"
        withIconRight
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
    <div>
      <SbTextField
        style="margin-bottom: 2rem;"
        :id="id"
        :name="name"
        label="With icon before"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        :icon="{side: 'left', name: 'search', size: 'small' }"
        native-value="Boris Spassky"
        v-model="internalValue"
        withIconLeft
      />
      <SbTextField
        style="margin-bottom: 2rem;"
        :id="id"
        :name="name"
        label="With icon after"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        :icon="{ side: 'right', name: 'search', size: 'small' }"
        native-value="Boris Spassky"
        v-model="internalValue"
        withIconRight
      />
      <SbTextField
        style="margin-bottom: 2rem;"
        :id="id"
        :name="name"
        label="Ghost with icon before"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        :icon="{ side: 'left', name: 'search', size: 'small' }"
        native-value="Boris Spassky"
        v-model="internalValue"
        withIconLeft
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
        :icon="{ side: 'right', name: 'search', size: 'small' }"
        native-value="Boris Spassky"
        v-model="internalValue"
        withIconRight
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
        :icon="{ side: 'left', name: 'search', size: 'small' }"
        native-value="Boris Spassky"
        v-model="internalValue"
        clearable
        withIconLeft
        withIconRight
      />
      <SbTextField
        :id="id"
        :name="name"
        label="Ghost clearable with icon"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        :icon="{ side: 'left', name: 'search', size: 'small' }"
        native-value="Boris Spassky"
        v-model="internalValue"
        clearable
        ghost
        withIconLeft
        withIconRight
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
  }),
  template: `
    <div>
      <SbTextField
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
        withIconRight
      />
      <SbTextField
        style="margin-bottom: 2rem;"
        :id="id"
        :name="name"
        label="Show / Hide password"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        :icon="{ side: 'right', name: 'eye-off', size: 'small' }"
        type="password"
        native-value="Boris Spassky"
        v-model="internalValue"
        withIconRight
        ghost
      />
      <SbTextField
        :id="id"
        :name="name"
        label="Number input"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        type="number"
        native-value="30011937"
        v-model="internalValue"
        withIconRight
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
    <div>
      <SbTextField
        style="margin-bottom: 2rem;"
        :id="id"
        :name="name"
        label="With text before"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        :side-text="{ side: 'left', text: 'http://' }"
        native-value="Boris Spassky"
        v-model="internalValue"
        withTextLeft
      />
      <SbTextField
        style="margin-bottom: 2rem;"
        :id="id"
        :name="name"
        label="With text after"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        :side-text="{ side: 'right', text: '.com' }"
        native-value="Boris Spassky"
        v-model="internalValue"
        withTextRight
      />
    </div>
  `,
})
