import SbFormItem from './index'
import SbRadio from '../Radio'
import SbTextField from '../TextField'

export default {
  title: 'SbFormItem',
  component: SbFormItem,
  args: {
    label: 'Label',
  },
}

export const Default = (args) => ({
  components: { SbFormItem, SbRadio, SbTextField },
  props: Object.keys(args),
  data: () => ({
    internalValue: 'Selected',
    placeholder: 'Placeholder',
  }),
  template: `
    <div>
      <SbFormItem :label="label" style="margin-bottom: 20px">
        <SbTextField
          :placeholder="placeholder"
        />
      </SbFormItem>

      <SbFormItem :label="label">
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
    </div>
  `,
})
