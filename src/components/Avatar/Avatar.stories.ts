import SbAvatar from './SbAvatar.vue'

import { availableColors } from '../../utils'
import { badgeTypes } from '../Badge/lib'

// default export defines configurations to all stories
import type { Args, Meta, StoryObj } from '@storybook/vue3'

type Story = StoryObj<typeof SbAvatar>

const meta: Meta<typeof SbAvatar> = {
  title: 'Data/SbAvatar',
  component: SbAvatar,
  parameters: {
    docs: {
      description: {
        component:
          'The `SbAvatar` is a component to view user information. It provides a fallback when the user image is not allowed. By default, it applys a border-radius to view a round avatar.',
      },
    },
  },
  args: {
    bgColor: 'teal',
    description: null,
    descriptionPosition: null,
    name: null,
    size: 'normal',
    showName: false,
    src: null,
    status: null,
    useTooltip: false,
    tooltipVariant: 'dark',
  },
  argTypes: {
    bgColor: {
      name: 'bgColor',
      description:
        'Add a background color when the `SbAvatar` has the initials or the fallback icon',
      options: availableColors,
      control: {
        type: 'select',
      },
    },
    description: {
      name: 'description',
      description: 'Description to `SbAvatar`',
      control: {
        type: 'text',
      },
    },
    descriptionPosition: {
      name: 'descriptionPosition',
      description: 'Define the position to description',
      options: ['top', 'bottom'],
      control: {
        type: 'select',
      },
    },
    name: {
      name: 'name',
      description: 'Username',
      control: {
        type: 'text',
      },
    },
    size: {
      name: 'size',
      description: 'Size of the SbAvatar',
      options: ['small', 'normal', 'large'],
      control: {
        type: 'select',
      },
    },
    showName: {
      name: 'showName',
      description: 'Enable show the username on the right',
      control: {
        type: 'boolean',
      },
    },
    src: {
      name: 'src',
      description: 'Path to image',
      control: {
        type: 'text',
      },
    },
    status: {
      name: 'status',
      description: 'Render a `SbBadge` to show a status to `SbAvatar`',
      options: badgeTypes,
      control: {
        type: 'select',
      },
    },
    useTooltip: {
      name: 'useTooltip',
      description: 'Enable show a tooltip with the username on the bottom',
      control: {
        type: 'boolean',
      },
    },
    tooltipVariant: {
      name: 'tooltipVariant',
      description: 'it changes the default color for the Avatars tooltip',
      options: ['dark', 'light'],
      control: {
        type: 'select',
      },
    },
  },
  render: (args: Args) => ({
    components: { SbAvatar },
    setup() {
      return { args }
    },
    template: `
      <SbAvatar
        v-bind="args"
      />
    `,
  }),
}

export default meta

export const Default: Story = {
  args: {
    src: 'https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4',
  },
}

export const Initials: Story = {
  render: (args: Args) => ({
    components: { SbAvatar },
    template: `<div>
    <SbAvatar name="John Doe" size="large" bg-color="teal" />
    <SbAvatar name="John Doe" bg-color="dark-blue" />
    <SbAvatar name="John" size="small" bg-color="green" />
  </div>`,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'When you do not pass the `src` attribute, but, pass the `name` attribute, the component will be use the initials from the name',
      },
    },
  },
}

export const Sizes: Story = {
  render: (args: Args) => ({
    components: { SbAvatar },
    template: `<div>
    <SbAvatar
      src="https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4"
      size="large"
      bg-color="primary"
    />

    <SbAvatar
      src="https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4"
      bg-color="primary-dark"
    />

    <SbAvatar
      src="https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4"
      size="small"
      bg-color="secondary"
    />
  </div>`,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'You can change the size of the `SbAvatar` components just passing the `size` attribute',
      },
    },
  },
}

export const WithUsername: Story = {
  render: (args: Args) => ({
    components: { SbAvatar },
    template: `<div>
    <div style="margin: 10px 0;">
      <SbAvatar
        src="https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4"
        size="large"
        name="John Doe"
        show-name
      />
    </div>

    <div style="margin: 10px 0;">
      <SbAvatar
        src="https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4"
        name="John Doe"
        show-name
      />
    </div>

    <div style="margin: 10px 0;">
      <SbAvatar
        src="https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4"
        size="small"
        name="John Doe"
        show-name
      />
    </div>
  </div>`,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'You can show the `name` attribute on the right by passing the `showName` attribute',
      },
    },
  },
}

export const WithDescription: Story = {
  render: (args: Args) => ({
    components: { SbAvatar },
    setup() {
      return { args }
    },
    template: `<div>
    <div>
      <SbAvatar
        v-bind="args"
        descriptionPosition="top"
      />
    </div>

    <div style="margin-top: 20px">
      <SbAvatar
        v-bind="args"
        descriptionPosition="bottom"
        bg-color="dark-blue"
      />
    </div>
  </div>`,
  }),
  args: {
    name: 'John Doe',
    description: 'Created by',
    showName: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'You can add a description to `SbAvatar`',
      },
    },
  },
}

export const WithFallback: Story = {
  render: (args: Args) => ({
    components: { SbAvatar },
    template: `<div>
    <SbAvatar
      src="https://google.com"
      size="large"
      bg-color="primary"
    />

    <SbAvatar src="https://google.com" bg-color="secondary" />

    <SbAvatar
      src="https://google.com"
      size="small"
      bg-color="negative"
    />
  </div>`,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'When the image is not available, the component will be show a fallback avatar',
      },
    },
  },
}

export const WithStatus: Story = {
  render: (args: Args) => ({
    components: { SbAvatar },
    setup() {
      return { ...args }
    },
    template: '<SbAvatar :src="src" :status="status" :size="size" />',
  }),
  args: {
    src: 'https://avatars1.githubusercontent.com/u/7952803?s=400&u=0fd8a3a0721768210fdcedb7607e9ad33af9f7ad&v=4',
    status: 'positive',
  },
}

export const WithInitials: Story = {
  render: (args: Args) => ({
    components: { SbAvatar },
    setup() {
      return { args }
    },
    template: `<div>
    <SbAvatar name="John Doe" />
  </div>`,
  }),
  args: {
    size: 'large',
    name: 'Ada Lovelace',
    bgColor: 'teal',
  },
  parameters: {
    docs: {
      description: {
        story:
          'When you do not use the `src` attribute, the component will use the `name` attribute to show the initials to name',
      },
    },
  },
}

export const WithInternalElements: Story = {
  render: (args: Args) => ({
    components: { SbAvatar },
    template: `<div>
    <div style="margin: 10px 0">
      <SbAvatar size="large">
        <img src="https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4" alt="Image of John Doe" />
      </SbAvatar>
    </div>

    <div style="margin: 10px 0">
      <SbAvatar size="large" name="John Doe" show-name>
        <img src="https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4" alt="Image of John Doe" />
      </SbAvatar>
    </div>
  </div>`,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'You can use internal elements inside `SbAvatar` component, like `<img>` tag',
      },
    },
  },
}

export const WithTooltip: Story = {
  render: (args: Args) => ({
    components: { SbAvatar },
    setup() {
      return { ...args }
    },
    template: '<SbAvatar :src="src" :name="name" :use-tooltip="useTooltip" />',
  }),
  args: {
    src: 'https://avatars1.githubusercontent.com/u/7952803?s=400&u=0fd8a3a0721768210fdcedb7607e9ad33af9f7ad&v=4',
    name: 'John Doe',
    useTooltip: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'When you set the `useTooltip` property, you need to provide a `name` property that should be used for tooltip label. This should not render the user name and description on right',
      },
    },
  },
}

export const MultipleAvatarsWithTheSameColor: Story = {
  render: (args: Args) => ({
    components: { SbAvatar },
    template: `<div>
    <SbAvatar name="Ada Lovelace" />

    <SbAvatar name="Ada Lovelace" />

    <SbAvatar name="Alan Turing" />

    <SbAvatar name="Alan Turing" />

    <SbAvatar name="Alan Turing" />

    <SbAvatar name="John von Neumann" />

    <SbAvatar name="John von Neumann" />

    <SbAvatar name="Tommy Flowers" />

    <SbAvatar name="Tommy Flowers" />

    <SbAvatar name="Tommy Flowers" />

    <SbAvatar name="John von Neumann" />

    <SbAvatar name="George Boole" />

    <SbAvatar name="George Boole" />

    <SbAvatar name="Ramon Llull" />

    <SbAvatar name="Ramon Llull" />

    <SbAvatar name="Ramon Llull" />

    <SbAvatar name="Joseph Marie Jacquard" />

    <SbAvatar name="Joseph Marie Jacquard" />

    <SbAvatar name="Banū Mūsā" />

    <SbAvatar name="Banū Mūsā" />
  </div>`,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'This story is to show for the user when we have a list with a lot of users, and if the avatar initials is the same, the color for this avatar will be the same and not a randomized color.',
      },
    },
  },
}
