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
    max: 100,
    step: 1,
    precision: 0,
    readonly: false,
    value: 10,
    errorMessage: 'Some error message',
    error: false,
  },
}

export const Default = (args) => ({
  components: { SbNumberField },
  props: Object.keys(args),
  data: () => ({
    internalValue: 10,
  }),
  template: `
    <div style="max-width: 300px">
      <SbNumberField
        style="margin-bottom: 20px;"
        v-model="internalValue"
        :id="id"
        :name="name"
        label="Number input"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        :min="min"
        :max="max"
        :step="step"
        :precision="precision"
        :readonly="readonly"
      />

      <SbNumberField
        style="margin-bottom: 20px;"
        v-model="internalValue"
        :id="id"
        :name="name"
        label="Max: 10 and Min: -10"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        :min="-10"
        :max="10"
        :step="step"
        :precision="precision"
        :readonly="readonly"
      />

      <SbNumberField
        v-model="internalValue"
        style="margin-bottom: 20px;"
        :id="id"
        :name="name"
        label="Step: 0.5"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        :min="min"
        :max="max"
        :step="0.5"
        :precision="precision"
        :readonly="readonly"
      />

      <SbNumberField
        v-model="internalValue"
        :id="id"
        :name="name"
        label="Precision of 3 decimals"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        :min="min"
        :max="max"
        :step="step"
        :precision="3"
        :readonly="readonly"
      />

      <SbNumberField
        v-model="internalValue"
        :id="id"
        :name="name"
        label="Disabled input"
        :required="required"
        :placeholder="placeholder"
        :min="min"
        :max="max"
        :step="step"
        :precision="3"
        :readonly="readonly"
        disabled
      />

      <SbNumberField
        v-model="internalValue"
        :id="id"
        :name="name"
        label="Readonly input"
        :disabled="true"
        :required="required"
        :placeholder="placeholder"
        :min="min"
        :max="max"
        :step="step"
        :precision="3"
        readonly
      />
    </div>
  `,
})
