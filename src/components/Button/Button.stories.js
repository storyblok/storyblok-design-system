import SbButton from './index'

const ButtonTemplate = args => ({
  components: { SbButton },
  props: Object.keys(args),
  template: `
    <div>
      <SbButton
        :type="type"
        :label="label"
        :size="size"
      />

      <SbButton
        :type="type"
        :is-disabled="isDisabled"
        :icon-before="iconBefore"
        :label="label"
        :size="size"
      />

      <SbButton
        :type="type"
        :is-disabled="isDisabled"
        :icon-after="iconAfter"
        :label="label"
        :size="size"
      />

      <SbButton
        :type="type"
        :label="label"
        :is-loading="isLoading"
        isDisabled
        :size="size"
      />

      <SbButton
        :type="type"
        is-loading
        :is-disabled="isDisabled"
        :size="size"
      />
    </div>
  `
})

export default {
  title: 'SbButton',
  component: SbButton,
  parameters: {
    docs: {
      description: {
        component: 'Buttons are used to initialize an action. Button labels express what action will occur when the user interacts with it.'
      }
    }
  },
  args: {
    type: 'primary',
    size: null,
    label: 'Default',
    isLoading: false,
    isDisabled: false,
    isFullWidth: false,
    isRounded: false
  },
  argTypes: {
    size: {
      name: 'size',
      description: 'Size',
      control: {
        type: 'select',
        options: ['small', 'normal', 'large']
      }
    },
    label: {
      name: 'label',
      description: 'Label (inner test)',
      control: {
        type: 'text'
      }
    },
    isLoading: {
      name: 'isLoading',
      description: 'Show a loading',
      control: {
        type: 'boolean'
      }
    },
    isDisabled: {
      name: 'isDisabled',
      description: 'Disable button',
      control: {
        type: 'boolean'
      }
    },
    type: {
      name: 'type',
      description: '`SbButton` type',
      control: {
        type: 'select',
        options: ['primary', 'secondary']
      }
    },
    iconBefore: {
      name: 'iconBefore',
      description: 'Icon before label',
      control: {
        type: 'text'
      }
    },
    iconAfter: {
      name: 'iconAfter',
      description: 'Icon after label',
      control: {
        type: 'text'
      }
    },
    isFullWidth: {
      name: 'isFullWidth',
      description: 'Expand button to 100% width',
      control: {
        type: 'boolean'
      }
    },
    isRounded: {
      name: 'isRounded',
      description: 'Transform button to rounded',
      control: {
        type: 'boolean'
      }
    },
    hasIconOnly: {
      name: 'hasIconOnly',
      description: 'Set the button to have only icon with a specific padding',
      control: {
        type: 'boolean'
      }
    }
  }
}

export const Default = args => ({
  components: { SbButton },
  props: Object.keys(args),
  template: `
    <SbButton
      :type="type"
      :label="label"
      :is-loading="isLoading"
      :is-disabled="isDisabled"
      :size="size"
    />
  `
})

export const Primary = ButtonTemplate.bind({})

Primary.args = {
  label: 'Primary',
  iconBefore: 'checkmark',
  iconAfter: 'calendar'
}

Primary.parameters = {
  docs: {
    description: {
      story: 'For the principal call to action on the page. Primary buttons should only appear once per screen (not including the application header or in a modal dialog).'
    }
  }
}

export const Secondary = ButtonTemplate.bind({})

Secondary.args = {
  type: 'secondary',
  label: 'Secondary',
  iconBefore: 'checkmark',
  iconAfter: 'calendar'
}

Secondary.parameters = {
  docs: {
    description: {
      story: 'For secondary actions on each page, these can only be used in conjunction with a primary button.'
    }
  }
}

export const Ghost = ButtonTemplate.bind({})

Ghost.args = {
  label: 'Ghost',
  type: 'ghost',
  iconBefore: 'checkmark',
  iconAfter: 'calendar'
}

Ghost.parameters = {
  docs: {
    description: {
      story: 'For less prominent actions, ghost buttons can be used in isolation or paired with a primary button when there are multiple calls to action.'
    }
  }
}

export const Danger = ButtonTemplate.bind({})

Danger.args = {
  label: 'Danger',
  type: 'danger',
  iconBefore: 'close',
  iconAfter: 'close'
}

Danger.parameters = {
  docs: {
    description: {
      story: 'Destructive actions'
    }
  }
}

export const Sizes = args => ({
  components: { SbButton },
  props: Object.keys(args),
  template: `<div>
    <SbButton label="Small" size="small" :type="type" />
    <SbButton label="Default" :type="type" />
    <SbButton label="Large" size="large" :type="type" />
  </div>`
})

Sizes.parameters = {
  docs: {
    description: {
      story: 'You can set the `size` attribute to change the padding inside the button'
    }
  }
}

export const FullWidth = args => ({
  components: { SbButton },
  props: Object.keys(args),
  template: `<div style="max-width: 500px;">
    <SbButton
      :type="type"
      :is-loading="isLoading"
      :is-disabled="isDisabled"
      :size="size"
      :is-full-width="isFullWidth"
      :label="label"
    />
  </div>`
})

FullWidth.args = {
  label: 'Full width',
  isFullWidth: true
}

export const JustIcons = args => ({
  components: { SbButton },
  props: Object.keys(args),
  template: `<div style="max-width: 500px;">
    <SbButton
      type="primary"
      :size="size"
      :iconBefore="iconBefore"
      :is-loading="isLoading"
      :is-disabled="isDisabled"
      :size="size"
      has-icon-only
    />

    <SbButton
      type="secondary"
      :size="size"
      :iconBefore="iconBefore"
      :is-loading="isLoading"
      :is-disabled="isDisabled"
      :size="size"
      has-icon-only
    />

    <SbButton
      type="ghost"
      :size="size"
      :iconBefore="iconBefore"
      :is-loading="isLoading"
      :is-disabled="isDisabled"
      :size="size"
      is-rounded
      has-icon-only
    />
  </div>`
})

JustIcons.args = {
  iconBefore: 'plus',
  isRounded: false
}
