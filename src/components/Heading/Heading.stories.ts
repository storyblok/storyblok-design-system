import SbHeading from '.'
import { availableHeadingTags, availableHeadingWeights } from './lib'

import type { Args, Meta, StoryObj } from '@storybook/vue3'

type Story = StoryObj<typeof SbHeading>

const meta: Meta<typeof SbHeading> = {
  title: 'Basic/SbHeading',
  component: SbHeading,
  args: {
    as: 'h1',
    fontWeight: 'bold',
  },
  argTypes: {
    as: {
      name: 'as',
      description: 'The rendered tag element',
      options: availableHeadingTags,
      control: {
        type: 'select',
      },
    },
    fontWeight: {
      name: 'fontWeight',
      description: 'Render a different font-weight for heading element',
      options: availableHeadingWeights,
      control: {
        type: 'select',
      },
    },
    customFontSize: {
      name: 'customFontSize',
      description:
        'Render a different font-size style, overriding the existing one',
      control: {
        type: 'text',
      },
    },
  },
  render: (args: Args) => ({
    components: { SbHeading },
    setup() {
      return { args }
    },
    template: `
    <SbHeading v-bind="args"> Storyblok is amazing! </SbHeading>
  `,
  }),
}

export default meta

export const Default: Story = {}

export const HeadingWithCustomFontSize: Story = {
  args: {
    customFontSize: '40px',
  },
}
