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
      :disabled="disabled"
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
    disabled: false,
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
}

TimeType.parameters = {
  docs: {
    description: {
      story: 'Use `time` type to only change the time option.',
    },
  },
}

export const DateType = Template.bind({})

DateType.args = {
  type: 'date',
}

DateType.parameters = {
  docs: {
    description: {
      story: 'Use `date` type to only change the date option.',
    },
  },
}

export const Disabled = Template.bind({})

Disabled.args = {
  disabled: true,
}

Disabled.parameters = {
  docs: {
    description: {
      story:
        'Use `disabled` property to disable the input that opens the Datepicker',
    },
  },
}
