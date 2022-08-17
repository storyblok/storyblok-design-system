import dayjs from 'dayjs'
import { SbDatepicker } from '.'
import { datepickerOptions } from './utils'

const Template = (args) => ({
  components: { SbDatepicker },

  props: Object.keys(args),

  data: () => ({
    internalDatetimeValue: dayjs().format('YYYY-MM-DD HH:mm'),
  }),

  template: `
    <SbDatepicker
      :disabled="disabled"
      :placeholder="placeholder"
      :time-zone="timeZone"
      :tz-tooltip="tzTooltip"
      :type="type"
      v-model="internalDatetimeValue"
      style="width: 29.4rem"
      :min-date="minDate"
      :max-date="maxDate"
      :disabled-past="disabledPast"
    />
  `,
})

export default {
  title: 'Design System/Components/Form/SbDatepicker',
  components: { SbDatepicker },
  args: {
    placeholder: 'Select date and time',
    value: '2021-12-02 00:00',
    type: 'datetime',
    disabled: false,
    isoDate: false,
    timeZone: 'America/Detroit',
    tzTooltip: '',
    minDate: '',
    maxDate: '',
    disabledPast: false,
  },
  argTypes: {
    timeZone: {
      name: 'timeZone',
      description:
        'Use this property to bind the user timezone, for example "America/Detroit". The component will calculate the offset automatically',
      defaultValue: 'UTC',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: 'UTC' },
      },
      control: {
        type: 'text',
      },
    },
    tzOffset: {
      name: 'tzOffset',
      description: `Use this property to bind the user tz offset. NOTE: If you use this, timeZone value will be disconsidered.
        Examples: GMT +05:00 or +05:00 GMT -03:00 or -03:00`,
      defaultValue: '',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: '' },
      },
      control: {
        type: 'text',
      },
    },
    tzTooltip: {
      name: 'tzTooltip',
      description:
        'Use this property to display a tooltip message for `timeZone` or `tzOffset` information.',
      defaultValue: null,
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: 'null' },
      },
      control: {
        type: 'text',
      },
    },
    type: {
      name: 'type',
      options: [...datepickerOptions],
      description: 'Change the type of the input.',
      defaultValue: 'datetime',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: 'datetime' },
      },
      control: {
        type: 'select',
      },
    },
    isoDate: {
      name: 'isoDate',
      description:
        'If set to true, Datepicker will deliver the date as iso date format like 2010-02-27T05:00:37.845Z',
      defaultValue: false,
      table: {
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'False' },
      },
      control: {
        type: 'boolean',
      },
    },
    minDate: {
      name: 'minDate',
      description:
        'If set, Datepicker will disable dates before the date entered in minDate',
      defaultValue: '',
      control: {
        type: 'text',
      },
    },
    maxDate: {
      name: 'maxDate',
      description:
        'If set, Datepicker will disable dates after the date entered in maxDate',
      defaultValue: '',
      control: {
        type: 'text',
      },
    },
    disabledPast: {
      name: 'disabledPast',
      description:
        'If set to true, Datepicker will disable dates before the current date',
      defaultValue: false,
      control: {
        type: 'boolean',
      },
    }
  },
}

export const Default = Template.bind({})

export const TimeType = Template.bind({})

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
  tzTooltip: 'Timezone can be changed in settings',
}

WithTzOffset.parameters = {
  docs: {
    description: {
      story:
        'Use `timeZone` property to describe the user timezone. It is possible to use an optional property called `tzTooltip` to display a tooltip message for `timeZone` information.',
    },
  },
}

export const MinMaxDate = Template.bind({})

MinMaxDate.args = {
  minDate: dayjs().subtract(3, 'day').format('YYYY-MM-DD'),
  maxDate: dayjs().add(3, 'day').format('YYYY-MM-DD'),
}

MinMaxDate.parameters = {
  docs: {
    description: {
      story:
        'Add the `minDate` attribute to establish a minimum selectable date and add the `maxDate` attribute to establish a maximum selectable date.',
    },
  },
}

export const DisabledDatePast = Template.bind({})

DisabledDatePast.args = {
  disabledPast: true,
}

DisabledDatePast.parameters = {
  docs: {
    description: {
      story:
        'Add the `disabled-past` attribute to disabled select dates in past.',
    },
  },
}
