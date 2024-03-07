import SbGroupButton from '.'
import SbButton from '../Button/index'

import { availableVariants } from '../Button/lib'
import { availableSizes } from '../../utils'

import type { Args, Meta, StoryObj } from '@storybook/vue3'

type Story = StoryObj<typeof SbGroupButton>

const meta: Meta<typeof SbGroupButton> = {
  title: 'Basic/SbGroupButton',
  component: SbGroupButton,
  args: {
    variant: 'tertiary',
    size: null,
    hasSpaces: false,
  },
  argTypes: {
    size: {
      name: 'size',
      description: 'Size to each `SbButton` inside the `SbGroupButton`',
      options: [...availableSizes],
      control: {
        type: 'select',
      },
    },
    variant: {
      name: 'variant',
      description: '`SbButton` variant',
      options: [...availableVariants],
      control: {
        type: 'select',
      },
    },
    hasSpaces: {
      name: 'hasSpaces',
      description: 'Set if it has spaces between `SbButton` components',
      control: {
        type: 'boolean',
      },
    },
  },
}

export default meta

export const Default: Story = {
  render: (args: Args) => ({
    components: { SbGroupButton, SbButton },
    setup() {
      return { args }
    },
    template: `
    <SbGroupButton v-bind="args">
      <SbButton label="First Button" />
      <SbButton label="Secondary Button" />
      <SbButton label="Third Button" />
    </SbGroupButton>
  `,
  }),
}

export const WithIcons: Story = {
  render: (args: Args) => ({
    components: { SbGroupButton, SbButton },
    setup() {
      return { args }
    },
    template: `
    <SbGroupButton v-bind="args">
      <SbButton label="First Button" />
      <SbButton label="Secondary Button" />
      <SbButton has-icon-only icon="x" />
    </SbGroupButton>
  `,
  }),
}

export const JustIcons: Story = {
  render: (args: Args) => ({
    components: { SbGroupButton, SbButton },
    setup() {
      return { args }
    },
    template: `
    <SbGroupButton v-bind="args">
      <SbButton has-icon-only icon="calendar" iconDescription="Calendar Icon" />
      <SbButton has-icon-only icon="plus" iconDescription="Plus Icon" />
      <SbButton has-icon-only icon="more-vertical" iconDescription="Overflow Icon" />
    </SbGroupButton>
  `,
  }),
}

export const InvertedLink: Story = {
  render: (args: Args) => ({
    components: { SbGroupButton, SbButton },
    setup() {
      return { args }
    },
    template: `
    <div style="background-color:#1b243f;height:100px;">
      <SbGroupButton variant="inverted-link">
          <SbButton label="First button" />
          <SbButton label="Second button" />
      </SbGroupButton>
    </div>
  `,
  }),
}
