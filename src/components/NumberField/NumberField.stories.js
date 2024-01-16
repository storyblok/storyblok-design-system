import SbNumberField from './index'

export default {
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
}

export const Default = (args) => ({
  components: { SbNumberField },
  setup: () => ({ args }),
  data: () => ({
    internalValue: 10,
  }),
  template: `
    <div style="max-width: 300px">
      <SbNumberField
        style="margin-bottom: 20px;"
        v-model="internalValue"
        v-bind="args"
        label="Number input"
      />

      <SbNumberField
        style="margin-bottom: 20px;"
        v-model="internalValue"
        v-bind="args"
        label="Max: 10 and Min: -10"
      />

      <SbNumberField
        v-model="internalValue"
        style="margin-bottom: 20px;"
        v-bind="args"
        label="Step: 0.5"
      />

      <SbNumberField
        style="margin-bottom: 20px;"
        v-model="internalValue"
        v-bind="args"
        label="Precision of 3 decimals"
      />

      <SbNumberField
        style="margin-bottom: 20px;"
        v-model="internalValue"
        v-bind="args"
        label="Disabled input"
        disabled
      />

      <SbNumberField
        style="margin-bottom: 20px;"
        v-model="internalValue"
        v-bind="args"
        label="Readonly input"
        readonly
      />
    </div>
  `,
})
