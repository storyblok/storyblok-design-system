import SbNumberField from './index'

export default {
  title: 'Design System/Components/Form/SbNumberField',
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
}

export const Default = (args) => ({
  components: { SbNumberField },
  setup() {
    return { args }
  },
  data: () => ({
    internalValue: 10,
  }),
  template: `
    <div class="mw-300">
      <SbNumberField
        class="mb-20"
        v-bind="args"
        v-model="internalValue"
        label="Number input"
      />

      <SbNumberField
        class="mb-20"
        v-model="internalValue"
        v-bind="args"
        label="Max: 10 and Min: -10"
        :min="-10"
        :max="10"
      />

      <SbNumberField
        v-model="internalValue"
        class="mb-20"
        v-bind="args"
        label="Step: 0.5"
        :step="0.5"
      />

      <SbNumberField
        v-model="internalValue"
        class="mb-20"
        v-bind="args"
        label="Precision of 3 decimals"
        :precision="3"
      />

      <SbNumberField
        v-model="internalValue"
        class="mb-20"
        v-bind="args"
        label="Disabled input"
        disabled
      />

      <SbNumberField
        v-model="internalValue"
        v-bind="args"
        label="Readonly input"
        readonly
      />
    </div>
  `,
})
