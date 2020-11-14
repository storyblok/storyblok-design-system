import SbFormItem from './index'
import SbRadio from '../Radio'

export default {
  title: 'SbFormItem',
  component: SbFormItem,
  args: {
    label: 'Label',
  },
}

export const Default = (args) => ({
  components: { SbFormItem, SbRadio },
  props: Object.keys(args),
  data: () => ({
    internalValue: 'Selected',
  }),
  template: `
    <div>
      <SbFormItem :label="label" style="margin-bottom: 20px">
        <input type="text" />
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
