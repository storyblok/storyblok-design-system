import SbIcon from '.'
import { iconSizes } from './utils'
import { availableColors } from '../../utils'
import availableIcons from '../../lib/all-icons'
import internalIcons from '../../lib/internal-icons'

import type { Args, Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'

type Story = StoryObj<typeof SbIcon>

const meta: Meta<typeof SbIcon> = {
  title: 'Basic/SbIcon',
  component: SbIcon,
  args: {
    size: 'normal',
    color: 'primary',
    name: 'chevron-down',
    role: null,
    backgroundColor: null,
  },
  argTypes: {
    color: {
      name: 'color',
      description: 'Color for SbIcon',
      options: availableColors,
      control: {
        type: 'select',
      },
    },
    backgroundColor: {
      name: 'background color',
      description: 'Background color for SbIcon',
      options: availableColors,
      control: {
        type: 'select',
      },
    },
    name: {
      name: 'name',
      description: 'Icon name (https://lucide.dev/icons)',
      options: availableIcons,
      control: {
        type: 'select',
      },
    },
    role: {
      name: 'role',
      description: 'HTML role for the icon',
      control: {
        type: 'text',
      },
    },
    size: {
      name: 'size',
      description: 'Size for SbIcon',
      options: iconSizes,
      control: {
        type: 'select',
      },
    },
  },
}

export default meta

export const Default: Story = {
  render: (args: Args) => ({
    components: { SbIcon },
    setup() {
      return { args }
    },
    template: '<SbIcon v-bind="args" />',
  }),

  args: {
    size: 'normal',
  },
}

export const IconWithBackground: Story = {
  render: () => ({
    components: { SbIcon },
    template:
      '<SbIcon name="toy-brick" color="primary" background-color="primary" />',
  }),
}

export const FallbackIcon: Story = {
  render: () => ({
    components: { SbIcon },
    template: '<SbIcon name="avatar-fallback" size="x-large" color="green" />',
  }),
}

export const LucideIcon: Story = {
  render: () => ({
    components: { SbIcon },
    template: '<div><SbIcon name="cat" size="large" color="green" /></div>',
    args: {
      name: 'cat',
      size: 'large',
      color: 'green',
    },
  }),
}

export const IconSizes: Story = {
  render: () => ({
    components: { SbIcon },
    template: `
    <div>
      <div style="margin-bottom: 10px">
        <SbIcon name="chevron-down" size="small" />
      </div>
      <div style="margin-bottom: 10px">
        <SbIcon name="chevron-down" />
      </div>
      <div style="margin-bottom: 10px">
        <SbIcon name="chevron-down" size="large" />
      </div>
      <div style="margin-bottom: 10px">
        <SbIcon name="chevron-down" size="x-large" />
      </div>
    </div>
  `,
  }),
}

export const StoryblokIcons: Story = {
  render: (args: Args) => ({
    components: { SbIcon },
    setup() {
      const icons = [...Object.keys(internalIcons)]
      return { args, icons }
    },
    template: `
  <div>
    <div style="display: flex; flex-wrap: wrap; justify-content: space-between;">
      <div
        v-for="(name, index) in icons"
        :key="index"
        style="text-align: center; padding: 2rem"
      >
        <SbIcon v-bind="args" :name="name" />

        <p class="font-size-md"> {{ name }} </p>
      </div>
    </div>
  </div>
  `,
  }),
}
