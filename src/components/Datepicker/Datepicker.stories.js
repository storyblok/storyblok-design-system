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
      :placeholder="placeholder"
      :tz-offset="tzOffset"
      :tz-tooltip="tzTooltip"
      :type="type"
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
    tzTooltip: null,
  },
  argTypes: {
    tzOffset: {
      name: 'tzOffset',
      description: 'Use this property to bind the user tz offset.',
      control: {
        type: 'text',
      },
    },
    tzTooltip: {
      name: 'tzTooltip',
      description:
        'Use this property to display a tooltip message for `tzOffset` information.',
      control: {
        type: 'text',
      },
    },
    type: {
      name: 'type',
      description: 'Change the type of the input.',
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

export const WithTzOffset = Template.bind({})

WithTzOffset.args = {
  tzOffset: 'GMT -02:00',
  tzTooltip: 'Timezone can be changed in settings',
}

WithTzOffset.parameters = {
  docs: {
    description: {
      story:
        'Use `tzOffset` property to describe the user timezone. It is possible to use an optional property called `tzTpoltip` to display a tooltip message for `tzOffset` information.',
    },
  },
}
