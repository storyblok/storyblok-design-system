import SbLink from './index'

export default {
  title: 'Basic/SbLink',
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
      options: ['small', 'normal', 'large'],
      control: {
        type: 'select',
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
      options: ['primary', 'secondary'],
      control: {
        type: 'select',
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

export const WithIconLeft = () => ({
  components: { SbLink },
  template: `
        <SbLink
          icon="check-mark"
          primary-label="With icon left"
        />
    `,
})

export const WithIconRight = () => ({
  components: { SbLink },
  template: `
        <SbLink
          icon-right="check-mark"
          secondary-label="With icon left"
        />
    `,
})
