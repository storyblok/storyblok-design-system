import SbTag from './index'
import { tagTypes } from './lib'
import type { Args, Meta, StoryObj } from '@storybook/vue3'
type Story = StoryObj<typeof SbTag>

const meta: Meta<typeof SbTag> = {
  title: 'Basic/SbTag',
  component: SbTag,
  args: {
    closable: false,
    label: 'a label',
    type: 'light',
    user: {
      avatar: 'https://placehold.co/22x22',
      friendly_name: 'John Doe',
    },
  },
  argTypes: {
    type: {
      name: 'type',
      description: 'Type of the `SbTag`',
      options: tagTypes,
      control: {
        type: 'select',
      },
    },
  },
}

export default meta

export const Default: Story = {
  render: (args) => ({
    components: { SbTag },
    setup(): Args {
      return { args }
    },
    template: `<SbTag v-bind="args" />`,
  }),
}

Default.args = {
  closable: false,
  label: 'Label',
  type: 'light',
}

export const Closable: Story = {
  render: (args) => ({
    components: { SbTag },
    setup(): Args {
      return { ...args }
    },
    template: `
    <SbTag
      :closable="closable"
      :label="label"
      :type="type"
      @close="onClick"
  />`,
  }),
}

Closable.args = {
  closable: true,
  label: 'Closable tag',
  type: 'light',
}

Closable.parameters = {
  docs: {
    description: {
      story:
        'When you set the `closable` property, it will be render a close icon on the right',
    },
  },
}

export const Avatar: Story = {
  render: (args) => ({
    components: {
      SbTag,
    },
    setup(): Args {
      return { ...args }
    },
    template: `
  <SbTag
    :closable="closable"
    :label="label"
    :type="type"
    @close="onClick"
    :user="user"
  />`,
  }),
}

Avatar.args = {
  closable: true,
  label: 'Label',
  type: 'light-grey',
  user: {
    avatar: 'https://placehold.co/22x22',
    friendly_name: 'John Doe',
  },
}

Avatar.parameters = {
  docs: {
    description: {
      story:
        'When you set the `user` property, it will render an avatar on the left',
    },
  },
}
