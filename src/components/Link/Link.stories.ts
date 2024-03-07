import SbLink from './index'

import type { Args, Meta, StoryObj } from '@storybook/vue3'

type Story = StoryObj<typeof SbLink>

const meta: Meta<typeof SbLink> = {
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

export default meta

export const Default: Story = {
  render: (args: Args) => ({
    components: { SbLink },
    setup() {
      return { args }
    },
    template: `
    <SbLink
      v-bind="args"
    />
  `,
  }),
}

export const InlineLabel: Story = {
  render: (args: Args) => ({
    components: { SbLink },
    setup() {
      return { args }
    },
    template: `
    <SbLink>
      Inline Label
    </SbLink>
  `,
  }),
}

export const WithIconLeft: Story = {
  render: () => ({
    components: { SbLink },
    template: `
        <SbLink
          icon="check"
          primary-label="With icon left"
        />
    `,
  }),
}

export const WithIconRight: Story = {
  render: () => ({
    components: { SbLink },
    template: `
        <SbLink
          icon-right="check"
          secondary-label="With icon left"
        />
    `,
  }),
}
