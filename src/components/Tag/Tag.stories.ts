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
    type: 'light-grey',
    user: null,
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
  render: (args: Args) => ({
    components: { SbTag },
    setup(): Args {
      return { args }
    },
    template: `<SbTag v-bind="args" />`,
  }),
}

export default meta

export const Default: Story = {
  args: {
    closable: false,
    label: 'Light grey tag',
    type: 'light-grey',
  },
}

export const AllTags: Story = {
  render: () => ({
    components: { SbTag },
    setup(): Args {
      return { tagTypes }
    },
    template: `<SbTag v-for="tagType in tagTypes" :key="tagType" :type="tagType" :label="tagType" class="sb-mr-2" />`,
  }),
}

export const Closable: Story = {
  args: {
    closable: true,
    label: 'Closable tag',
    type: 'light-grey',
  },
  parameters: {
    docs: {
      description: {
        story:
          'When you set the `closable` property, it will be render a close icon on the right',
      },
    },
  },
}

export const Avatar: Story = {
  args: {
    closable: true,
    label: 'Label',
    type: 'light-grey',
    user: {
      avatar: 'https://placehold.co/22x22',
      friendly_name: 'John Doe',
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'When you set the `user` property, it will render an avatar on the left',
      },
    },
  },
}
