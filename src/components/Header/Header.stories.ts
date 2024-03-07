import SbHeader from './index'
import availableIcons from '../../lib/all-icons'
import { availableVariants } from '../Button/lib'

import type { Args, Meta, StoryObj } from '@storybook/vue3'

type Story = StoryObj<typeof SbHeader>

const meta: Meta<typeof SbHeader> = {
  title: 'Basic/SbHeader',
  component: SbHeader,
  parameters: {
    docs: {
      description: {
        component:
          'Header is used to name an area. It could also have a button which triggers an event called "button-click"',
      },
    },
  },
  args: {
    hasButton: true,
    title: 'Title',
    subtitleText: 'Subtitle',
    isLoading: false,
    buttonLabel: 'Button label',
    buttonIcon: 'plus',
    buttonVariant: 'primary',
    buttonDisabled: false,
    buttonTooltip: { label: 'Hello', position: 'top' },
  },
  argTypes: {
    title: {
      description: 'Define the title of the header',
      control: 'text',
    },
    subtitleText: {
      description: 'Define the subtitle of the header',
      control: 'text',
    },
    hasButton: {
      description: 'Define if it has a button or not',
      control: 'boolean',
    },
    buttonLabel: {
      description: 'Define the label of the button',
      control: 'text',
    },
    buttonDisabled: {
      description: 'Define if it is disabled or not',
      control: 'boolean',
    },
    isLoading: {
      description: 'Define the loading state of the button',
      control: 'boolean',
    },
    buttonIcon: {
      description: 'Define the icon name of the button',
      options: availableIcons,
      control: 'select',
    },
    buttonVariant: {
      description: 'Define the color variant of the button',
      options: availableVariants,
      control: 'select',
    },
    buttonTooltip: {
      description: 'Define the button tooltip',
      control: 'object',
    },
    onButtonClick: {
      action: 'button-click',
    },
  },
  render: (args: Args) => ({
    components: { SbHeader },
    setup() {
      return { args }
    },
    template: `
      <SbHeader
        v-bind="args"
      />
    `,
  }),
}

export default meta

export const Default: Story = {}
export const WithoutButton: Story = {
  args: {
    hasButton: false,
  },

  parameters: {
    docs: {
      description: {
        story: 'Header without the button',
      },
    },
  },
}
export const LoadingButton: Story = {
  args: {
    isLoading: true,
  },

  parameters: {
    docs: {
      description: {
        story: 'Button in header with a loading state',
      },
    },
  },
}
export const DisabledButton: Story = {
  args: {
    buttonDisabled: true,
  },

  parameters: {
    docs: {
      description: {
        story: 'Header with a disabled button',
      },
    },
  },
}
export const TooltipButton: Story = {
  args: {
    buttonTooltip: { label: 'Tooltip test', position: 'bottom' },
  },

  parameters: {
    docs: {
      description: {
        story: 'Button in header with a tooltip',
      },
    },
  },
}
