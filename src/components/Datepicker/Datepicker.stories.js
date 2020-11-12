import { SbDatepicker } from '.'

export default {
  title: 'SbDatepicker',
  components: { SbDatepicker },
  args: {
    placeholder: 'Select date and time',
  },
}

export const Default = (args) => ({
  components: { SbDatepicker },

  props: Object.keys(args),

  data: () => ({
    internalDatetimeValue: '',
    internalTimeValue: '',
  }),

  template: `
    <div>
      <div style="display: inline-block; margin-right: 1rem;">
        <SbDatepicker
          :placeholder="placeholder"
          v-model="internalDatetimeValue"
        />
      </div>

      <div style="display: inline-block">
        <SbDatepicker
          :placeholder="placeholder"
          type="time"
          v-model="internalTimeValue"
        />
      </div>
    </div>
  `,
})
