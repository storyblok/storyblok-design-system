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
      :tz-offset="tzOffset"
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
    value: '',
    type: 'datetime',
    disabled: false,
    tzOffset: '',
  },
  argTypes: {
    type: {
      name: 'type',
      description: 'Change the type of the input.',
      control: {
        type: 'select',
        options: [...datepickerOptions],
      },
    },
    tzOffset: {
      name: 'tzOffset',
      description: 'Use this property to bind the user tz offset.',
      control: {
        type: 'text',
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

export const WithTzOffset = Template.bind({})

WithTzOffset.args = {
  tzOffset: '-02:00',
}

WithTzOffset.parameters = {
  docs: {
    description: {
      story: 'Use `tzOffset` property to describe the user timezone',
    },
  },
}
