import SbButton from './index'

import { availablePositions as availableTooltipPositions } from '../Tooltip/lib'

const ButtonTemplate = (args) => ({
  components: { SbButton },
  props: Object.keys(args),
  template: `
    <div>
      <SbButton
        :color-palette="colorPalette"
        :label="label"
        :size="size"
      />

      <SbButton
        :color-palette="colorPalette"
        :is-disabled="isDisabled"
        :icon="icon"
        :label="label"
        :size="size"
      />

      <SbButton
        :color-palette="colorPalette"
        :is-disabled="isDisabled"
        :icon-right="iconRight"
        :label="label"
        :size="size"
      />

      <SbButton
        :color-palette="colorPalette"
        :label="label"
        :is-loading="isLoading"
        isDisabled
        :size="size"
      />

      <SbButton
        :color-palette="colorPalette"
        is-loading
        :is-disabled="isDisabled"
        :size="size"
      />
    </div>
  `,
})

export default {
  title: 'SbButton',
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
    iconDescription: null,
    iconRight: null,
    hasIconOnly: false,
    label: 'Default',
    size: null,
    colorPalette: 'primary',
    tooltipPosition: 'bottom',
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
        type: 'text',
      },
    },
    icon: {
      name: 'icon',
      description: 'Icon before label (default on the left)',
      control: {
        type: 'text',
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
    colorPalette: {
      name: 'colorPalette',
      description: '`SbButton` colorPalette',
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'ghost', 'danger'],
      },
    },
    tooltipPosition: {
      name: 'tooltipPosition',
      description: 'Position for `SbTooltip` component',
      control: {
        type: 'select',
        options: [...availableTooltipPositions],
      },
    },
  },
}

export const Default = (args) => ({
  components: { SbButton },
  props: Object.keys(args),
  template: `
    <SbButton
      :is-rounded="isRounded"
      :is-full-width="isFullWidth"
      :is-loading="isLoading"
      :is-disabled="isDisabled"
      :icon="icon"
      :icon-right="iconRight"
      :has-icon-only="hasIconOnly"
      :label="label"
      :size="size"
      :color-palette="colorPalette"
      :tooltip-position="tooltipPosition"
    />
  `,
})

export const Primary = ButtonTemplate.bind({})

Primary.args = {
  label: 'Primary',
  icon: 'checkmark',
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
  colorPalette: 'secondary',
  label: 'Secondary',
  icon: 'checkmark',
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

export const Ghost = ButtonTemplate.bind({})

Ghost.args = {
  label: 'Ghost',
  colorPalette: 'ghost',
  icon: 'checkmark',
  iconRight: 'calendar',
}

Ghost.parameters = {
  docs: {
    description: {
      story:
        'For less prominent actions, ghost buttons can be used in isolation or paired with a primary button when there are multiple calls to action.',
    },
  },
}

export const Danger = ButtonTemplate.bind({})

Danger.args = {
  label: 'Danger',
  colorPalette: 'danger',
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

export const Sizes = (args) => ({
  components: { SbButton },
  props: Object.keys(args),
  template: `<div>
    <SbButton label="Small" size="small" :color-palette="colorPalette" />
    <SbButton label="Default" :color-palette="colorPalette" />
    <SbButton label="Large" size="large" :color-palette="colorPalette" />
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
  props: Object.keys(args),
  template: `<div style="max-width: 500px;">
    <SbButton
      :color-palette="colorPalette"
      :is-loading="isLoading"
      :is-disabled="isDisabled"
      :size="size"
      :is-full-width="isFullWidth"
      :label="label"
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
  props: Object.keys(args),
  template: `<div style="max-width: 500px;">
    <SbButton
      colorPalette="primary"
      :size="size"
      :icon="icon"
      :is-loading="isLoading"
      :is-disabled="isDisabled"
      has-icon-only
    />

    <SbButton
      colorPalette="secondary"
      :size="size"
      :icon="icon"
      :is-loading="isLoading"
      :is-disabled="isDisabled"
      has-icon-only
    />

    <SbButton
      colorPalette="ghost"
      :size="size"
      :icon="icon"
      :is-loading="isLoading"
      :is-disabled="isDisabled"
      :icon-description="iconDescription"
      is-rounded
      has-icon-only
      :tooltip-position="tooltipPosition"
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
  props: Object.keys(args),
  template: `<div style="max-width: 500px;">
    <SbButton
      :color-palette="colorPalette"
      :is-loading="isLoading"
      :is-disabled="isDisabled"
      :size="size"
      :is-full-width="isFullWidth"
    >
      {{ label }}
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
  props: Object.keys(args),
  template: `
    <SbButton
      :is-rounded="isRounded"
      :is-full-width="isFullWidth"
      :is-loading="isLoading"
      :is-disabled="isDisabled"
      :size="size"
      :color-palette="colorPalette"
    />`,
})

LoadingButton.args = ButtonTemplate.bind({})

LoadingButton.args = {
  colorPalette: 'primary',
  isLoading: true,
}

LoadingButton.parameters = {
  docs: {
    description: {
      story: 'Types of buttons with loading',
    },
  },
}
