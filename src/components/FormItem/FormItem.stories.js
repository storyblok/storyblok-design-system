import SbFormItem from './index'
import SbRadio from '../Radio'
import SbTextField from '../TextField'
import SbButton from '../Button'

export default {
  title: 'Forms/SbFormItem',
  component: SbFormItem,
  args: {
    label: 'Label',
    helperIconText: 'Helper icon text',
    helperText: 'Helper text',
    isRequired: false,
    icon: 'form',
  },
}

export const Default = (args) => ({
  components: { SbButton, SbFormItem, SbRadio, SbTextField },
  setup() {
    return { args }
  },
  data: () => ({
    internalValue: 'Selected',
    placeholder: 'Placeholder',
  }),
  template: `
    <div>
      <SbFormItem
        v-bind="args"
      >
        <SbTextField
          :placeholder="placeholder"
        />
      </SbFormItem>

      <SbFormItem :label="args.label" :is-required="args.isRequired">
        <SbRadio
          name="example"
          id="inactive"
          label="Inactive"
          v-model="internalValue"
          native-value="Inactive"
          inline
          style="margin-right: 20px;"
        />

        <SbRadio
          name="example"
          id="selected"
          label="Selected"
          v-model="internalValue"
          native-value="Selected"
          inline
        />
      </SbFormItem>

      <SbFormItem :label="args.label" :is-required="args.isRequired" grouped>
        <SbTextField
          name="example"
          id="textfield"
          style="flex: 1"
        />

        <SbButton label="Just a button" />
      </SbFormItem>
    </div>
  `,
})

export const WithIcon = (args) => ({
  components: { SbTextField },
  setup() {
    return { args }
  },
  data: () => ({
    internalValue: 'Selected',
    placeholder: 'Placeholder',
  }),
  template: `
    <div>
      <SbFormItem v-bind="args">
        <SbTextField
          name="example"
          id="textfield"
        />
      </SbFormItem>
    </div>
  `,
})
