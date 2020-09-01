import SbAvatar from './index'

// default export defines configurations to all stories
export default {
  title: 'SbAvatar',
  component: SbAvatar,
  parameters: {
    docs: {
      description: {
        component: 'The `SbAvatar` is a component to view user information. It provides a fallback when the user image is not allowed. By default, it applys a border-radius to view a round avatar.'
      }
    }
  },
  args: {
    description: null,
    descriptionPosition: null,
    name: null,
    size: 'normal',
    showName: false,
    src: null
  },
  argTypes: {
    description: {
      name: 'description',
      description: 'Description to `SbAvatar`',
      control: {
        type: 'text'
      }
    },
    descriptionPosition: {
      name: 'descriptionPosition',
      description: 'Define the position to description',
      control: {
        type: 'text'
      }
    },
    name: {
      name: 'name',
      description: 'Username',
      control: {
        type: 'text'
      }
    },
    size: {
      name: 'size',
      description: 'Size of the SbAvatar',
      control: {
        type: 'select',
        options: ['small', 'normal', 'large']
      }
    },
    showName: {
      name: 'showName',
      description: 'Enable show the username on the right',
      control: {
        type: 'boolean'
      }
    },
    src: {
      name: 'src',
      description: 'Path to image',
      control: {
        type: 'text'
      }
    }
  }
}

export const Default = (args) => ({
  components: { SbAvatar },
  props: Object.keys(args),
  template: '<SbAvatar v-bind="{ showName, size, name, src }" />'
})

Default.args = {
  src: 'https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4'
}

export const Initials = () => ({
  components: { SbAvatar },
  template: `<div>
    <SbAvatar name="John Doe" size="large" />

    <SbAvatar name="John Doe" />

    <SbAvatar name="John" size="small" />
  </div>`
})

Initials.parameters = {
  docs: {
    description: {
      story: 'When you do not pass the `src` attribute, but, pass the `name` attribute, the component will be use the initials from the name'
    }
  }
}

export const Sizes = () => ({
  components: { SbAvatar },
  template: `<div>
    <SbAvatar
      src="https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4"
      size="large"
    />

    <SbAvatar
      src="https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4"
    />

    <SbAvatar
      src="https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4"
      size="small"
    />
  </div>`
})

Sizes.parameters = {
  docs: {
    description: {
      story: 'You can change the size of the `SbAvatar` components just passing the `size` attribute'
    }
  }
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
  </div>`
})

WithUsername.parameters = {
  docs: {
    description: {
      story: 'You can show the `name` attribute on the right by passing the `showName` attribute'
    }
  }
}

export const WithDescription = args => ({
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
          showName
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
          showName
        }"
      />
    </div>
  </div>`
})

WithDescription.args = {
  name: 'John Doe',
  description: 'Created by',
  showName: true
}

WithDescription.parameters = {
  docs: {
    description: {
      story: 'You can add a description to `SbAvatar`'
    }
  }
}

export const WithFallback = () => ({
  components: { SbAvatar },
  template: `<div>
    <SbAvatar
      src="https://google.com"
      size="large"
    />

    <SbAvatar src="https://google.com" />

    <SbAvatar
      src="https://google.com"
      size="small"
    />
  </div>`
})

WithFallback.parameters = {
  docs: {
    description: {
      story: 'When the image is not available, the component will be show a fallback avatar'
    }
  }
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
  </div>`
})

WithInternalElements.parameters = {
  docs: {
    description: {
      story: 'You can use internal elements inside `SbAvatar` component, like `<img>` tag'
    }
  }
}
