import SbLogo from './index'

import type { Args, Meta, StoryObj } from '@storybook/vue3'

type Story = StoryObj<typeof SbLogo>

const meta: Meta<typeof SbLogo> = {
  title: 'Basic/SbLogo',
  component: SbLogo,
  argTypes: {
    textVariant: {
      name: 'variant',
      description: 'Variant',
      options: ['dark', 'white'],
      control: {
        type: 'select',
      },
    },
    iconOnly: {
      name: 'iconOnly',
      description: 'show the icon only',
      control: {
        type: 'boolean',
      },
    },
  },
}

export default meta

export const Default: Story = {
  render: (args: Args) => ({
    components: { SbLogo },
    setup() {
      return { args }
    },
    template: `
    <SbLogo v-bind="args" />
  `,
  }),
}
export const WhiteText: Story = {
  render: (args: Args) => ({
    components: { SbLogo },
    setup() {
      return { args }
    },
    template: `
    <div style="background-color:#1b243f;padding:20px;">
      <SbLogo text-variant="white" />
    </div>
  `,
  }),
}
export const IconOnly: Story = {
  render: (args: Args) => ({
    components: { SbLogo },
    setup() {
      return { args }
    },
    template: `
      <SbLogo icon-only />
  `,
  }),
}
