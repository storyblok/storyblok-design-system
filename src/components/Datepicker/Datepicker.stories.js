import { SbDatepicker } from '.'
import { datepickerOptions } from './utils'

const Template = (args) => ({
  components: { SbDatepicker },

  props: Object.keys(args),

  data: () => ({
    internalDatetimeValue: '',
    internalTimeValue: '',
  }),

  template: `
    <SbDatepicker
      :type="type"
      :placeholder="placeholder"
      v-model="internalDatetimeValue"
    />
  `,
})

export default {
  title: 'SbDatepicker',
  components: { SbDatepicker },
  args: {
    placeholder: 'Select date and time',
    value: null,
    type: 'datetime',
  },
  argTypes: {
    type: {
      name: 'type',
      control: {
        type: 'select',
        options: [...datepickerOptions],
      },
    },
  },
}

export const Default = Template.bind({})

export const TimeType = Template.bind({})

TimeType.args = {
  type: 'time',
  docs: {
    description: {
      story: 'Use `time` type to only change the time option.',
    },
  },
}

export const DateType = Template.bind({})

DateType.args = {
  type: 'date',
  docs: {
    description: {
      story: 'Use `date` type to only change the date option.',
    },
  },
}
