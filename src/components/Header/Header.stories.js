import SbHeader from './index'
import availableIcons from '../../lib/all-icons'
import { availableVariants } from '../Button/lib'

const HeaderTemplate = (args) => ({
  components: { SbHeader },
  setup() {
    return { args }
  },
  template: `
    <SbHeader
      v-bind="args"
    />
  `,
})

export default {
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
      action: 'button-click'
    },
  },
}

export const Default = HeaderTemplate.bind({})

export const WithoutButton = HeaderTemplate.bind({})

WithoutButton.args = {
  hasButton: false,
}

WithoutButton.parameters = {
  docs: {
    description: {
      story: 'Types of buttons with loading.',
    },
  },
}

export const LoadingButton = HeaderTemplate.bind({})

LoadingButton.args = {
  isLoading: true,
}

LoadingButton.parameters = {
  docs: {
    description: {
      story: 'Types of buttons with loading.',
    },
  },
}

export const DisabledButton = HeaderTemplate.bind({})

DisabledButton.args = {
  buttonDisabled: true,
}

DisabledButton.parameters = {
  docs: {
    description: {
      story: 'Types of buttons with disabled.',
    },
  },
}

export const TooltipButton = HeaderTemplate.bind({})

TooltipButton.args = {
  buttonTooltip: { label: 'Tooltip test', position: 'bottom' },
}

TooltipButton.parameters = {
  docs: {
    description: {
      story: 'Types of tooltip button.',
    },
  },
}
