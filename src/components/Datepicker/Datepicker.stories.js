import { SbDatepicker } from '.'
import { datepickerOptions } from './utils'

const Template = (args) => ({
  components: { SbDatepicker },

  props: Object.keys(args),

  data: () => ({
    internalDatetimeValue: '2017-09-09 00:00',
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
    timeZone: 'America/Detroit',
    tzTooltip: null,
  },
  argTypes: {
    timeZone: {
      name: 'timeZone',
      description:
        'Use this property to bind the user timezone, for example "America/Detroit". The component will calculate the offset automatically',
      control: {
        type: 'text',
      },
    },
    tzOffset: {
      name: 'tzOffset',
      description: `Use this property to bind the user tz offset. NOTE: If you use this, timeZone value will be disconsidered.
        Examples:
        GMT +05:00 or +05:00
        GMT -03:00 or -03:00`,
      control: {
        type: 'text',
      },
    },
    tzTooltip: {
      name: 'tzTooltip',
      description:
        'Use this property to display a tooltip message for `timeZone` or `tzOffset` information.',
      control: {
        type: 'text',
      },
    },
    type: {
      name: 'type',
      options: [...datepickerOptions],
      description: 'Change the type of the input.',
      control: {
        type: 'select',
      },
    },
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
