import SbBadge from './index'
import { badgeTypes } from './lib'

const BadgeTemplate = args => ({
  components: { SbBadge },
  props: Object.keys(args),
  template: `
    <SbBadge
      v-bind="{
        contract,
        inlineLabel,
        label,
        number,
        onlyIcon,
        type
      }"
    />
  `
})

export default {
  title: 'SbBadge',
  component: SbBadge,
  parameters: {
    docs: {
      description: {
        component: 'Badges are composed of text inside a bg color element and may include inline/inline-block elements and/or icons.'
      }
    }
  },
  args: {
    contract: false,
    inlineLabel: false,
    label: 'Badge Label',
    number: null,
    onlyIcon: false,
    type: 'positive'
  },
  argTypes: {
    contract: {
      name: 'contract',
      description: 'A small and circular `SbBadge`',
      control: {
        type: 'boolean'
      }
    },
    inlineLabel: {
      name: 'inlineLabel',
      description: 'Define a label on the right',
      control: {
        type: 'boolean'
      }
    },
    label: {
      name: 'label',
      description: 'Label to `SbBadge`',
      control: {
        type: 'text'
      }
    },
    number: {
      name: 'number',
      description: 'Define the `SbBadge` as just a number',
      control: {
        type: 'number'
      }
    },
    onlyIcon: {
      name: 'onlyIcon',
      description: 'Only renders an icon',
      control: {
        type: 'boolean'
      }
    },
    type: {
      name: 'type',
      description: 'Type of the `SbBadge`',
      control: {
        type: 'select',
        options: badgeTypes
      },
      type: {
        required: true
      }
    }
  }
}

export const Default = BadgeTemplate.bind({})

export const Types = args => ({
  components: { SbBadge },
  props: Object.keys(args),
  template: `<div>
    <SbBadge
      v-bind="{
        label,
        inlineLabel,
        number,
        type:'positive'
      }"
    />
    <SbBadge
      v-bind="{
        label,
        inlineLabel,
        number,
        type:'info'
      }"
    />
    <SbBadge
      v-bind="{
        label,
        inlineLabel,
        number,
        type:'warning'
      }"
    />
    <SbBadge
      v-bind="{
        label,
        inlineLabel,
        number,
        type:'negative'
      }"
    />
  </div>`
})

Types.parameters = {
  docs: {
    description: {
      story: 'You can set the `type` property to change the type of the `SbBadge`'
    }
  }
}

export const JustNumber = BadgeTemplate.bind({})

JustNumber.args = {
  number: 1000
}

JustNumber.parameters = {
  docs: {
    description: {
      story: 'You can set the `type` property to change the type of the `SbBadge`'
    }
  }
}

export const OnlyIcon = BadgeTemplate.bind({})

OnlyIcon.args = {
  onlyIcon: true
}

OnlyIcon.parameters = {
  docs: {
    description: {
      story: 'You can set the `onlyIcon` property to just show the icon'
    }
  }
}

export const Contract = BadgeTemplate.bind({})

Contract.args = {
  contract: true
}

Contract.parameters = {
  docs: {
    description: {
      story: 'You can set the `contract` property to just show a circle with a background type'
    }
  }
}

export const InlineLabel = BadgeTemplate.bind({})

InlineLabel.args = {
  inlineLabel: true,
  label: 'Inline label'
}

InlineLabel.parameters = {
  docs: {
    description: {
      story: 'You can set the `inlineLabel` property to just the icon filled with a background type and the label is on the right'
    }
  }
}
