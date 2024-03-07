import SbIconButton from './index'
import { iconSizes } from '../Icon/utils'
import { availableColors } from '../../utils'
import availableIcons from '../../lib/all-icons'

import type { Args, Meta, StoryObj } from '@storybook/vue3'

type Story = StoryObj<typeof SbIconButton>

const meta: Meta<typeof SbIconButton> = {
  title: 'Basic/SbIconButton',
  component: SbIconButton,
  args: {
    iconName: 'search',
    iconSize: null,
    iconColor: 'primary',
  },
  argTypes: {
    iconName: {
      description:
        'Icon name (https://lucide.dev/icons) or custom Storyblok icons',
      options: availableIcons,
      control: {
        type: 'select',
      },
    },
    iconSize: {
      options: iconSizes,
      control: {
        type: 'select',
      },
    },
    iconColor: {
      options: availableColors,
      control: {
        type: 'select',
      },
    },
  },
}

export default meta

export const Default: Story = {
  render: (args: Args) => ({
    components: { SbIconButton },
    setup() {
      return { args }
    },
    template: `
    <SbIconButton v-bind="args" />
  `,
  }),
}

export const WhiteColor: Story = {
  render: (args: Args) => ({
    components: { SbIconButton },
    setup() {
      return { args }
    },
    template: `
    <div style="background-color:#1b243f;padding:20px;">
      <SbIconButton icon-color="white" icon-name="toy-brick" />
    </div>
  `,
  }),
}
