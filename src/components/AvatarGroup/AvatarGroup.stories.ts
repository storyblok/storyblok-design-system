import SbAvatarGroup from './SbAvatarGroup'
import SbAvatar from '../Avatar'

// default export defines configurations to all stories
export default {
  title: 'Data/SbAvatarGroup',
  component: SbAvatarGroup,
  parameters: {
    docs: {
      description: {
        component: 'The `SbAvatarGroup` component is to list the `SbAvatar`',
      },
    },
  },
  args: {
    darkBg: false,
    maxElements: 5,
    size: 'normal',
  },
  argTypes: {
    darkBg: {
      name: 'darkBg',
      description: 'Adjust borders to dark background',
      control: {
        type: 'boolean',
      },
    },
    maxElements: {
      name: 'maxElements',
      description: 'Max of `SbAvatar` components to view',
      control: {
        type: 'number',
      },
    },
    size: {
      name: 'size',
      description: 'Size of the `SbAvatar`',
      options: ['small', 'normal', 'large'],
      control: {
        type: 'select',
      },
    },
  },
}

export const Default = (args) => ({
  components: { SbAvatarGroup, SbAvatar },
  setup() {
    return { args }
  },
  template: `
  <div>
    <p class="font-size-lg"> With white Background </p>

    <SbAvatarGroup :size="size" :dark-bg="darkBg">
      <SbAvatar
        src="https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4"
        name="John Doe"
      />

      <SbAvatar
        src="https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4"
        name="Kobe Bryant"
      />

      <SbAvatar
        src="https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4"
        name="Elvis Presley"
      />
    </SbAvatarGroup>

    <p class="font-size-lg"> With dark Background </p>

    <div style="padding: 20px; background-color: #1B243F;">
      <SbAvatarGroup :size="size" dark-bg>
        <SbAvatar
          src="https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4"
          name="John Doe"
        />

        <SbAvatar
          src="https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4"
          name="Kobe Bryant"
        />

        <SbAvatar
          src="https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4"
          name="Elvis Presley"
        />
      </SbAvatarGroup>
    </div>
  </div>
  `,
})

export const WithSizes = () => ({
  components: { SbAvatarGroup, SbAvatar },
  template: `
  <div>
    <SbAvatarGroup size="large">
      <SbAvatar
        src="https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4"
      />

      <SbAvatar
        src="https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4"
      />

      <SbAvatar
        src="https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4"
      />
    </SbAvatarGroup>

    <SbAvatarGroup>
      <SbAvatar
        src="https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4"
      />

      <SbAvatar
        src="https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4"
      />

      <SbAvatar
        src="https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4"
      />
    </SbAvatarGroup>

    <SbAvatarGroup size="small">
      <SbAvatar
        src="https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4"
      />

      <SbAvatar
        src="https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4"
      />

      <SbAvatar
        src="https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4"
      />
    </SbAvatarGroup>
  </div>
  `,
})

WithSizes.parameters = {
  docs: {
    description: {
      story:
        'You can change the size for all `SbAvatar` components just passing the `size` attribute for `SbAvatarGroup`',
    },
  },
}

export const WithMoreAvatars = (args) => ({
  components: { SbAvatarGroup, SbAvatar },
  setup() {
    return { args }
  },
  template: `
  <div>
    <div>
      <SbAvatarGroup v-bind="args">
        <SbAvatar
          src="https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4"
        />

        <SbAvatar name="John Doe" bg-color="primary" />

        <SbAvatar
          src="https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4"
        />

        <SbAvatar
          src="https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4"
        />

        <SbAvatar
          src="https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4"
        />

        <SbAvatar name="John Doe" bg-color="primary-dark" />

        <SbAvatar
          src="https://avatars1.githubusercontent.com/u/7952803?s=400&u=0fd8a3a0721768210fdcedb7607e9ad33af9f7ad&v=4"
          name="Dominik Angerer"
        />

        <SbAvatar
          src="https://avatars1.githubusercontent.com/u/160495?s=460&u=b88ece40883d2e9716e833f6a3c78c56ca3eb14f&v=4"
          name="Alexander Feiglstorfer"
        />
      </SbAvatarGroup>
    </div>
  </div>
  `,
})

WithMoreAvatars.parameters = {
  docs: {
    description: {
      story:
        'When you have more than **5** `SbAvatar` components, it will be render a placeholder as last element indicating how many more components are there. The number of max elements can be changed with the `maxElements` property',
    },
  },
}
