import SbAvatar from './index'

import { availableColors } from '../../utils'
import { badgeTypes } from '../Badge/lib'

// default export defines configurations to all stories
export default {
  title: 'SbAvatar',
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
    bgColor: 'primary',
    description: null,
    descriptionPosition: null,
    name: null,
    size: 'normal',
    showName: false,
    src: null,
    status: null,
    useTooltip: false,
  },
  argTypes: {
    bgColor: {
      name: 'bgColor',
      description:
        'Add a background color when the `SbAvatar` has the initials or the fallback icon',
      control: {
        type: 'select',
        options: availableColors,
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
      control: {
        type: 'select',
        options: ['top', 'bottom'],
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
      control: {
        type: 'select',
        options: ['small', 'normal', 'large'],
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
      control: {
        type: 'select',
        options: badgeTypes,
      },
    },
    useTooltip: {
      name: 'useTooltip',
      description: 'Enable show a tooltip with the username on the bottom',
      control: {
        type: 'boolean',
      },
    },
  },
}

export const Default = (args) => ({
  components: { SbAvatar },
  props: Object.keys(args),
  template: `
    <SbAvatar
      v-bind="{
        bgColor,
        description,
        descriptionPosition,
        name,
        size,
        showName,
        src,
        status
      }"
    />
  `,
})

Default.args = {
  src:
    'https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4',
}

export const Initials = () => ({
  components: { SbAvatar },
  template: `<div>
    <SbAvatar name="John Doe" size="large" bg-color="primary" />

    <SbAvatar name="John Doe" bg-color="primary-dark" />

    <SbAvatar name="John" size="small" bg-color="secondary" />
  </div>`,
})

Initials.parameters = {
  docs: {
    description: {
      story:
        'When you do not pass the `src` attribute, but, pass the `name` attribute, the component will be use the initials from the name',
    },
  },
}

export const Sizes = () => ({
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
})

Sizes.parameters = {
  docs: {
    description: {
      story:
        'You can change the size of the `SbAvatar` components just passing the `size` attribute',
    },
  },
}

export const WithUsername = () => ({
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
})

WithUsername.parameters = {
  docs: {
    description: {
      story:
        'You can show the `name` attribute on the right by passing the `showName` attribute',
    },
  },
}

export const WithDescription = (args) => ({
  components: { SbAvatar },
  props: Object.keys(args),
  template: `<div>
    <div>
      <SbAvatar
        v-bind="{
          description,
          descriptionPosition: 'top',
          name,
          size,
          showName,
          bgColor: 'primary',
        }"
      />
    </div>

    <div style="margin-top: 20px">
      <SbAvatar
        v-bind="{
          description,
          descriptionPosition: 'bottom',
          name,
          size,
          showName,
          bgColor: 'primary-dark',
        }"
      />
    </div>
  </div>`,
})

WithDescription.args = {
  name: 'John Doe',
  description: 'Created by',
  showName: true,
}

WithDescription.parameters = {
  docs: {
    description: {
      story: 'You can add a description to `SbAvatar`',
    },
  },
}

export const WithFallback = () => ({
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
})

WithFallback.parameters = {
  docs: {
    description: {
      story:
        'When the image is not available, the component will be show a fallback avatar',
    },
  },
}

export const WithStatus = (args) => ({
  components: { SbAvatar },
  props: Object.keys(args),
  template: '<SbAvatar :src="src" :status="status" :size="size" />',
})

WithStatus.args = {
  src:
    'https://avatars1.githubusercontent.com/u/7952803?s=400&u=0fd8a3a0721768210fdcedb7607e9ad33af9f7ad&v=4',
  status: 'positive',
}

export const WithInitials = (args) => ({
  components: { SbAvatar },
  props: Object.keys(args),
  template: `<div>
    <SbAvatar :size="size" :name="name" :bg-color="bgColor" />
  </div>`,
})

WithInitials.args = {
  size: 'large',
  name: 'Ada Lovelace',
  bgColor: 'primary',
}

WithInitials.parameters = {
  docs: {
    description: {
      story:
        'When you do not use the `src` attribute, the component will use the `name` attribute to show the initials to name',
    },
  },
}

export const WithInternalElements = () => ({
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
})

WithInternalElements.parameters = {
  docs: {
    description: {
      story:
        'You can use internal elements inside `SbAvatar` component, like `<img>` tag',
    },
  },
}

export const WithTooltip = (args) => ({
  components: { SbAvatar },
  props: Object.keys(args),
  template: '<SbAvatar :src="src" :name="name" :use-tooltip="useTooltip" />',
})

WithTooltip.args = {
  src:
    'https://avatars1.githubusercontent.com/u/7952803?s=400&u=0fd8a3a0721768210fdcedb7607e9ad33af9f7ad&v=4',
  name: 'John Doe',
  useTooltip: true,
}

WithTooltip.parameters = {
  docs: {
    description: {
      story:
        'When you set the `useTooltip` property, you need to provide a `name` property that should be used for tooltip label. This should not render the user name and description on right',
    },
  },
}
