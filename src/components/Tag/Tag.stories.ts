import SbTag from './index'
import { tagTypes } from './lib'
import type { Args, ArgTypes, StoryFn } from '@storybook/vue3'

export default {
  title: 'Basic/SbTag',
  components: SbTag,
  parameters: {
    docs: {
      description: {
        component: '',
      },
    },
  },
  args: {
    closable: false,
    label: 'Tag Label',
    type: 'light',
    user: {
      avatar: '',
      friendly_name: '',
    },
  },
  argTypes: {
    closable: {
      name: 'closable',
      description: 'Render a close icon on the right',
      control: {
        type: 'boolean',
      },
    },
    label: {
      name: 'label',
      description: 'Label to `SbTag`',
      control: {
        type: 'text',
      },
    },
    type: {
      name: 'type',
      description: 'Type of the `SbTag`',
      options: tagTypes,
      control: {
        type: 'select',
      },
    },
    onClick: {
      action: 'clicked',
    },
    user: {
      name: 'user',
      description: 'used for the `SbAvatar` component',
      control: {
        type: 'object',
      },
    },
  },
}

export const Default: StoryFn = {
  render: (args) => ({
    components: { SbTag },
    setup(): Args {
      return { args }
    },
    template: `
    <SbTag
      :closable="closable"
      :label="label"
      :type="type"
      @close="onClick"
  />`,
  }),
  args: {
    closable: false,
    label: 'Label',
  },
}

export const Closable: StoryFn = {
  render: (args) => ({
    components: { SbTag },
    setup(): Args {
      return { args }
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
}

Closable.parameters = {
  docs: {
    description: {
      story:
        'When you set the `closable` property, it will be render a close icon on the right',
    },
  },
}

export const Avatar: StoryFn = {
  render: (args) => ({
    components: {
      SbTag,
    },
    setup(): Args {
      return { args }
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
