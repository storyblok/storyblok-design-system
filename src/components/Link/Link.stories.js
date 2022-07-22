import SbLink from './index'

export default {
  title: 'Design System/Components/SbLink',
  component: SbLink,
  args: {
    type: 'primary',
    size: null,
    href: 'https://storyblok.com',
    label: 'Go to Storyblok website',
    as: undefined,
    title: null,
  },
  argTypes: {
    size: {
      name: 'size',
      description: 'Size',
      control: {
        type: 'select',
        options: ['small', 'normal', 'large'],
      },
    },
    label: {
      name: 'label',
      description: 'Label',
      control: {
        type: 'text',
      },
    },
    as: {
      name: 'as',
      description: 'The tag that should be used (the `<a>` tag is default)',
      control: {
        type: 'text',
      },
    },
    href: {
      name: 'href',
      description: 'href attribute for <a> tag',
      control: {
        type: 'text',
      },
    },
    title: {
      name: 'title',
      description: 'Title to `SbLink`',
      control: {
        type: 'text',
      },
    },
    type: {
      name: 'type',
      description: '`SbLink` type',
      control: {
        type: 'select',
        options: ['primary', 'secondary'],
      },
    },
    icon: {
      name: 'icon',
      description: 'Icon to `SbLink` (default on the left)',
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
  },
}

export const Default = (args) => ({
  components: { SbLink },
  setup() {
    return { args }
  },
  template: `
    <SbLink
      v-bind="args"
    />
  `,
})

export const InlineLabel = (args) => ({
  components: { SbLink },
  setup() {
    return { args }
  },
  template: `
    <SbLink>
      {{ label }}
    </SbLink>
  `,
})

export const WithIcon = (args) => ({
  components: { SbLink },
  setup() {
    return { args }
  },
  template: `<div>
      <div>
        <SbLink
          v-bind="args"
        />
      </div>

      <div style="margin-top: 20px">
        <SbLink
          v-bind="args"
          type="secondary"
        />
      </div>
  </div>`,
})

WithIcon.args = {
  icon: 'check-mark',
  iconRight: 'calendar',
  primaryLabel: 'Icon before',
  secondaryLabel: 'Icon after',
}

WithIcon.argTypes = {
  primaryLabel: {
    control: {
      type: 'text',
    },
  },
  secondaryLabel: {
    control: {
      type: 'text',
    },
  },
}
