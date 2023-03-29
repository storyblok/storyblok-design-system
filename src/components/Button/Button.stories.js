import SbButton from './index'

import { availablePositions as availableTooltipPositions } from '../Tooltip/lib'
import { availableButtonsTypes } from './lib'
import { availableColors } from '../../utils'
import LIB_ICONS from '../../lib/internal-icons'

const availableIcons = Object.keys(LIB_ICONS)

const ButtonTemplate = (args) => ({
  components: { SbButton },
  setup() {
    return { args }
  },
  template: `
    <div>
      <SbButton
        :variant="args.variant"
        :label="args.label"
        :size="args.size"
        :type="args.type"
      />

      <SbButton
        :variant="args.variant"
        :is-disabled="args.isDisabled"
        :icon="args.icon"
        :icon-color="args.iconColor"
        :label="args.label"
        :size="args.size"
        :type="args.type"
      />

      <SbButton
        :variant="args.variant"
        :is-disabled="args.isDisabled"
        :icon-right="args.iconRight"
        :icon-color="args.iconColor"
        :label="args.label"
        :size="args.size"
        :type="args.type"
      />

      <SbButton
        :variant="args.variant"
        :label="args.label"
        :is-loading="args.isLoading"
        isDisabled
        :size="args.size"
        :type="args.type"
      />

      <SbButton
        :variant="args.variant"
        is-loading
        :icon-color="args.iconColor"
        :is-disabled="args.isDisabled"
        :size="args.size"
        :type="args.type"
      />
    </div>
  `,
})

export default {
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
    iconRight: '',
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
      control: {
        type: 'select',
        options: availableIcons,
      },
    },
    iconColor: {
      name: 'iconColor',
      description: 'Icon color',
      control: {
        type: 'select',
        options: availableColors,
      },
    },
    icon: {
      name: 'icon',
      description: 'Icon before label (default on the left)',
      control: {
        type: 'select',
        options: availableIcons,
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
      control: {
        type: 'select',
        options: ['small', 'normal', 'large'],
      },
    },
    variant: {
      name: 'variant',
      description: '`SbButton` variant',
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'tertiary', 'danger', 'caution'],
      },
    },
    tooltipPosition: {
      name: 'tooltipPosition',
      description: 'Position for `v-tooltip` directive',
      control: {
        type: 'select',
        options: [...availableTooltipPositions],
      },
    },
    type: {
      name: 'type',
      description:
        'The `type` attribute specifies the `type` of button, the available options are **button**, **submit**, **reset**, the default value is null.',
      control: {
        type: 'select',
        options: [...availableButtonsTypes],
      },
    },
  },
}

export const Default = (args) => ({
  components: { SbButton },
  setup() {
    return { args }
  },
  template: `
    <SbButton
      v-bind="args"
    />
  `,
})

export const Primary = ButtonTemplate.bind({})

Primary.args = {
  label: 'Primary',
  icon: 'check-mark',
  iconRight: 'calendar',
}

Primary.parameters = {
  docs: {
    description: {
      story:
        'For the principal call to action on the page. Primary buttons should only appear once per screen (not including the application header or in a modal dialog).',
    },
  },
}

export const Secondary = ButtonTemplate.bind({})

Secondary.args = {
  variant: 'secondary',
  label: 'Secondary',
  icon: 'check-mark',
  iconRight: 'calendar',
}

Secondary.parameters = {
  docs: {
    description: {
      story:
        'For secondary actions on each page, these can only be used in conjunction with a primary button.',
    },
  },
}

export const Tertiary = ButtonTemplate.bind({})

Tertiary.args = {
  label: 'Tertiary',
  variant: 'tertiary',
  icon: 'check-mark',
  iconRight: 'calendar',
}

Tertiary.parameters = {
  docs: {
    description: {
      story:
        'For less prominent actions, tertiary buttons can be used in isolation or paired with a primary button when there are multiple calls to action.',
    },
  },
}

export const Danger = ButtonTemplate.bind({})

Danger.args = {
  label: 'Danger',
  variant: 'danger',
  icon: 'close',
  iconRight: 'close',
}

Danger.parameters = {
  docs: {
    description: {
      story: 'Destructive actions',
    },
  },
}

export const Caution = ButtonTemplate.bind({})

Caution.args = {
  label: 'Caution',
  variant: 'caution',
  icon: 'close',
  iconRight: 'close',
}

Caution.parameters = {
  docs: {
    description: {
      story: 'Caution actions',
    },
  },
}

export const Sizes = (args) => ({
  components: { SbButton },
  setup() {
    return { args }
  },
  template: `<div>
    <SbButton label="Small" size="small" :variant="variant" :icon="icon" />
    <SbButton label="Default" :variant="variant" :icon="icon" />
    <SbButton label="Large" size="large" :variant="variant" :icon="icon" />
  </div>`,
})

Sizes.parameters = {
  docs: {
    description: {
      story:
        'You can set the `size` attribute to change the padding inside the button',
    },
  },
}

export const FullWidth = (args) => ({
  components: { SbButton },
  setup() {
    return { args }
  },
  template: `<div style="max-width: 500px;">
    <SbButton
      is-full-width
      label="Full width"
    />
  </div>`,
})

FullWidth.args = {
  label: 'Full width',
  isFullWidth: true,
}

FullWidth.parameters = {
  docs: {
    description: {
      story:
        'When you define the button as `isFullWidth`, it will be expanded to full width to fill its parent container.',
    },
  },
}

export const JustIcons = (args) => ({
  components: { SbButton },
  setup() {
    return { args }
  },
  template: `<div style="max-width: 500px;">
    <SbButton
      variant="primary"
      :size="args.size"
      :icon="args.icon"
      :icon-color="args.iconColor"
      :is-loading="args.isLoading"
      :is-disabled="args.isDisabled"
      :type="args.type"
      has-icon-only
    />

    <SbButton
      variant="secondary"
      :size="args.size"
      :icon="args.icon"
      :icon-color="args.iconColor"
      :is-loading="args.isLoading"
      :is-disabled="args.isDisabled"
      :type="type"
      has-icon-only
    />

    <SbButton
      variant="tertiary"
      :size="args.size"
      :icon="args.icon"
      :icon-color="args.iconColor"
      :is-loading="args.isLoading"
      :is-disabled="args.isDisabled"
      :icon-description="args.iconDescription"
      is-rounded
      :type="args.type"
      has-icon-only
      :tooltip-position="args.tooltipPosition"
    />
  </div>`,
})

JustIcons.args = {
  icon: 'plus',
  isRounded: false,
  iconDescription: 'Hey! I have a description!',
}

JustIcons.parameters = {
  docs: {
    description: {
      story:
        'If you use the button just with icon, you can use the `hasIconOnly` boolean attribute. Optionally, you can use the `isRounded` attribute too.',
    },
  },
}

export const InlineLabel = (args) => ({
  components: { SbButton },
  setup() {
    return { args }
  },
  template: `<div style="max-width: 500px;">
    <SbButton
      :variant="args.variant"
      :is-loading="args.isLoading"
      :is-disabled="args.isDisabled"
      :size="args.size"
      :is-full-width="args.isFullWidth"
      :type="args.type"
    >
      {{ args.label }}
    </SbButton>
  </div>`,
})

InlineLabel.args = {
  label: 'Inline label',
}

InlineLabel.parameters = {
  docs: {
    description: {
      story: 'You can use the label inline, not as prop.',
    },
  },
}

export const LoadingButton = (args) => ({
  components: { SbButton },
  setup() {
    return { args }
  },
  template: `
    <SbButton v-bind="args" />
    `,
})

LoadingButton.args = {
  isLoading: true,
  label: 'Default',
  variant: 'primary',
  size: 'small',
}

LoadingButton.parameters = {
  docs: {
    description: {
      story: 'Types of buttons with loading',
    },
  },
}
