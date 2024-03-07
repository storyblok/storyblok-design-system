import SbBadge from './index'
import { badgeTypes } from './lib'

import type { Args, Meta, StoryObj } from '@storybook/vue3'

type Story = StoryObj<typeof SbBadge>

const meta: Meta<typeof SbBadge> = {
  title: 'Data/SbBadge',
  component: SbBadge,
  parameters: {
    docs: {
      description: {
        component:
          'Badges are composed of text inside a bg color element and may include inline/inline-block elements and/or icons.',
      },
    },
  },
  args: {
    contract: false,
    inlineLabel: false,
    label: 'Badge Label',
    number: null,
    onlyIcon: false,
    type: 'positive',
  },
  argTypes: {
    contract: {
      name: 'contract',
      description: 'A small and circular `SbBadge`',
      control: {
        type: 'boolean',
      },
    },
    inlineLabel: {
      name: 'inlineLabel',
      description: 'Define a label on the right',
      control: {
        type: 'boolean',
      },
    },
    label: {
      name: 'label',
      description: 'Label to `SbBadge`',
      control: {
        type: 'text',
      },
    },
    number: {
      name: 'number',
      description: 'Define the `SbBadge` as just a number',
      control: {
        type: 'number',
      },
    },
    onlyIcon: {
      name: 'onlyIcon',
      description: 'Only renders an icon',
      control: {
        type: 'boolean',
      },
    },
    type: {
      name: 'type',
      description: 'Type of the `SbBadge`',
      options: badgeTypes,
      control: {
        type: 'select',
      },
      type: {
        required: true,
      },
    },
  },
  render: (args: Args) => ({
    components: { SbBadge },
    setup() {
      return { args }
    },
    template: `
      <SbBadge
        v-bind="args"
      />
    `,
  }),
}

export default meta

export const Default: Story = {}

export const Types: Story = {
  render: (args: Args) => ({
    components: { SbBadge },
    setup() {
      return { args }
    },
    template: `<div>
    <SbBadge
      v-bind="args"
      type="positive"
    />
    <SbBadge
      v-bind="args"
      type="info"
    />
    <SbBadge
      v-bind="args"
      type="warning"
    />
    <SbBadge
      v-bind="args"
      type="negative"
    />
  </div>`,
  }),

  parameters: {
    docs: {
      description: {
        story:
          'You can set the `type` property to change the type of the `SbBadge`',
      },
    },
  },
}

export const JustNumber: Story = {
  args: {
    number: 1000,
  },

  parameters: {
    docs: {
      description: {
        story:
          'You can set the `type` property to change the type of the `SbBadge`',
      },
    },
  },
}

export const OnlyIcon: Story = {
  args: {
    onlyIcon: true,
  },

  parameters: {
    docs: {
      description: {
        story: 'You can set the `onlyIcon` property to just show the icon',
      },
    },
  },
}

export const Contract: Story = {
  args: {
    contract: true,
  },

  parameters: {
    docs: {
      description: {
        story:
          'You can set the `contract` property to just show a circle with a background type',
      },
    },
  },
}

export const InlineLabel: Story = {
  args: {
    inlineLabel: true,
    label: 'Inline label',
  },
  parameters: {
    docs: {
      description: {
        story:
          'You can set the `inlineLabel` property to just the icon filled with a background type and the label is on the right',
      },
    },
  },
}

export const SlotLabel: Story = {
  render: () => ({
    components: { SbBadge },
    template: `<div>
    <SbBadge type="positive">A slot text</SbBadge>
  </div>`,
  }),
}
