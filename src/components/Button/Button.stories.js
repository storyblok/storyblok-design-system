import SbButton from './index'

const ButtonTemplate = args => ({
  components: { SbButton },
  props: Object.keys(args),
  template: `
    <div>
      <SbButton
        :status="status"
        :label="label"
        :size="size"
      />

      <SbButton
        :status="status"
        :is-disabled="isDisabled"
        :icon="icon"
        :label="label"
        :size="size"
      />

      <SbButton
        :status="status"
        :label="label"
        :is-loading="isLoading"
        isDisabled
        :size="size"
      />

      <SbButton
        :status="status"
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
    status: 'primary',
    size: null,
    label: 'Default',
    isLoading: false,
    isDisabled: false,
    isFullWidth: false
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
    status: {
      name: 'status',
      description: '`SbButton` status',
      control: {
        type: 'select',
        options: ['primary', 'secondary']
      }
    },
    icon: {
      name: 'icon',
      description: 'Icon to `SbButton`',
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
    }
  }
}

export const Default = args => ({
  components: { SbButton },
  props: Object.keys(args),
  template: `
    <SbButton
      :status="status"
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
  icon: 'checkmark'
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
  label: 'Secondary',
  status: 'secondary',
  icon: 'calendar'
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
  status: 'ghost',
  icon: 'calendar'
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
  status: 'danger',
  icon: 'close'
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
    <SbButton label="Small" size="small" :status="status" />
    <SbButton label="Default" :status="status" />
    <SbButton label="Large" size="large" :status="status" />
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
      :status="status"
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
