import SbButton from './index'

import { availablePositions as availableTooltipPositions } from '../Tooltip/lib'
import { availableButtonsTypes } from './lib'
import { availableColors } from '../../utils'
import availableIcons from '../../lib/all-icons'

import type { Args, Meta, StoryObj } from '@storybook/vue3'

type Story = StoryObj<typeof SbButton>

const meta: Meta<typeof SbButton> = {
  title: 'Basic/SbButton',
  component: SbButton,
  parameters: {
    docs: {
      description: {
        component:
          'Buttons are used to initialize an action. Button labels express what action will occur when the user interacts with it.',
      },
    },
  },
  args: {
    isLoading: false,
    isDisabled: false,
    isFullWidth: false,
    isRounded: false,
    icon: null,
    iconDescription: '',
    iconRight: null,
    iconFilled: false,
    hasIconOnly: false,
    label: 'Default',
    size: null,
    variant: 'primary',
    tooltipPosition: 'bottom',
    type: null,
    iconColor: '',
  },
  argTypes: {
    isDisabled: {
      name: 'isDisabled',
      description: 'Disable button',
      control: {
        type: 'boolean',
      },
    },
    iconDescription: {
      name: 'iconDescription',
      description:
        'Description to Icon when the `SbButton` has the `hasIconOnly` property setted to true',
      control: {
        type: 'text',
      },
    },
    iconRight: {
      name: 'iconRight',
      description: 'Icon on the right',
      options: availableIcons,
      control: {
        type: 'select',
      },
    },
    iconColor: {
      name: 'iconColor',
      description: 'Icon color',
      options: availableColors,
      control: {
        type: 'select',
      },
    },
    icon: {
      name: 'icon',
      description: 'Icon before label (default on the left)',
      options: availableIcons,
      control: {
        type: 'select',
      },
    },
    iconFilled: {
      name: 'iconFilled',
      description: 'Filled icon',
      control: {
        type: 'boolean',
      },
    },
    isFullWidth: {
      name: 'isFullWidth',
      description: 'Expand button to 100% width',
      control: {
        type: 'boolean',
      },
    },
    isLoading: {
      name: 'isLoading',
      description: 'Show a loading',
      control: {
        type: 'boolean',
      },
    },
    isRounded: {
      name: 'isRounded',
      description: 'Transform button to rounded',
      control: {
        type: 'boolean',
      },
    },
    hasIconOnly: {
      name: 'hasIconOnly',
      description: 'Set the button to have only icon with a specific padding',
      control: {
        type: 'boolean',
      },
    },
    label: {
      name: 'label',
      description: 'Label (inner test)',
      control: {
        type: 'text',
      },
    },
    size: {
      name: 'size',
      description: 'Size',
      options: ['small', 'normal', 'large'],
      control: {
        type: 'select',
      },
    },
    variant: {
      name: 'variant',
      description: '`SbButton` variant',
      options: ['primary', 'secondary', 'tertiary', 'danger', 'caution'],
      control: {
        type: 'select',
      },
    },
    tooltipPosition: {
      name: 'tooltipPosition',
      description: 'Position for `v-tooltip` directive',
      options: [...availableTooltipPositions],
      control: {
        type: 'select',
      },
    },
    type: {
      name: 'type',
      description:
        'The `type` attribute specifies the `type` of button, the available options are **button**, **submit**, **reset**, the default value is null.',
      options: [...availableButtonsTypes],
      control: {
        type: 'select',
      },
    },
  },
  render: (args: Args) => ({
    components: { SbButton },
    setup() {
      return { args }
    },
    template: `
      <div>
        <SbButton
            v-bind="args"
        />

        <SbButton
          v-bind="args"
          icon="plus"
          label="Icon left"
        />

        <SbButton
          v-bind="args"
          icon-right="calendar"
          label="Icon right"
        />

        <SbButton
          v-bind="args"
          is-disabled
          label="Disabled"
        />

        <SbButton
          v-bind="args"
          is-loading
          label="Loading"
        />
      </div>
    `,
  }),
}

export default meta

export const Default: Story = {}

export const Primary: Story = {
  args: {
    label: 'Primary',
  },
  parameters: {
    docs: {
      description: {
        story:
          'For the principal call to action on the page. Primary buttons should only appear once per screen (not including the application header or in a modal dialog).',
      },
    },
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    label: 'Secondary',
  },
  parameters: {
    docs: {
      description: {
        story:
          'For secondary actions on each page, these can only be used in conjunction with a primary button.',
      },
    },
  },
}

export const Tertiary: Story = {
  args: {
    label: 'Tertiary',
    variant: 'tertiary',
  },
  parameters: {
    docs: {
      description: {
        story:
          'For less prominent actions, tertiary buttons can be used in isolation or paired with a primary button when there are multiple calls to action.',
      },
    },
  },
}

export const Danger: Story = {
  args: {
    label: 'Danger',
    variant: 'danger',
  },
  parameters: {
    docs: {
      description: {
        story: 'Destructive actions',
      },
    },
  },
}

export const Caution: Story = {
  args: {
    label: 'Caution',
    variant: 'caution',
  },
  parameters: {
    docs: {
      description: {
        story: 'Caution actions',
      },
    },
  },
}

export const Sizes: Story = {
  render: (args: Args) => ({
    components: { SbButton },
    setup() {
      return { args }
    },
    template: `<div>
    <SbButton label="Small" size="small" :variant="variant" :icon="icon" />
    <SbButton label="Default" :variant="variant" :icon="icon" />
    <SbButton label="Large" size="large" :variant="variant" :icon="icon" />
  </div>`,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'You can set the `size` attribute to change the padding inside the button',
      },
    },
  },
}

export const FullWidth: Story = {
  render: (args: Args) => ({
    components: { SbButton },
    setup() {
      return { args }
    },
    template: `<div>
      <SbButton v-bind="args" />
    </div>`,
  }),
  args: {
    label: 'Full width',
    isFullWidth: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'When you define the button as `isFullWidth`, it will be expanded to full width to fill its parent container.',
      },
    },
  },
}

export const JustIcons: Story = {
  render: (args: Args) => ({
    components: { SbButton },
    setup() {
      return { args }
    },
    template: `<div>
      <SbButton v-bind="args" iconDescription="Small" size="small" />
      <SbButton v-bind="args" iconDescription="Default" variant="secondary" />
      <SbButton v-bind="args" iconDescription="Large"  size="large" variant="tertiary" />
      <SbButton v-bind="args" iconDescription="Rounded Small" size="small" is-rounded />
    </div>`,
  }),
  args: {
    icon: 'plus',
    hasIconOnly: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'If you use the button just with icon, you can use the `hasIconOnly` boolean attribute. Optionally, you can use the `isRounded` attribute too.',
      },
    },
  },
}

export const InlineLabel: Story = {
  render: (args: Args) => ({
    components: { SbButton },
    setup() {
      return { args }
    },
    template: `<div>
      <SbButton v-bind="args" ><span>Inline Label</span></SbButton>
    </div>`,
  }),
  parameters: {
    docs: {
      description: {
        story: 'You can use the label inline as a slot, not as prop.',
      },
    },
  },
}

export const LoadingButton: Story = {
  render: (args: Args) => ({
    components: { SbButton },
    setup() {
      return { args }
    },
    template: `<div>
      <SbButton v-bind="args" />
    </div>`,
  }),
  args: {
    isLoading: true,
    label: 'Default',
    variant: 'primary',
    size: 'small',
  },
  parameters: {
    docs: {
      description: {
        story: 'Loading button',
      },
    },
  },
}
