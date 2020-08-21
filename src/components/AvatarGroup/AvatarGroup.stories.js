import SbAvatarGroup from './index'
import SbAvatar from '../Avatar'

// default export defines configurations to all stories
export default {
  title: 'SbAvatarGroup',
  component: SbAvatarGroup,
  parameters: {
    docs: {
      description: {
        component: 'The `SbAvatarGroup` component is to list the `SbAvatar`'
      }
    }
  },
  args: {
    size: 'normal'
  },
  argTypes: {
    size: {
      name: 'size',
      description: 'Size of the SbAvatar',
      control: {
        type: 'select',
        options: ['small', 'normal', 'large']
      }
    }
  }
}

export const Default = (args) => ({
  components: { SbAvatarGroup, SbAvatar },
  props: Object.keys(args),
  template: `
  <SbAvatarGroup :size="size">
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
  `
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
  `
})

WithSizes.parameters = {
  docs: {
    description: {
      story: 'You can change the size for all `SbAvatar` components just passing the `size` attribute for `SbAvatarGroup`'
    }
  }
}

export const WithMoreAvatars = () => ({
  components: { SbAvatarGroup, SbAvatar },
  template: `
  <div>
    <div>
      <SbAvatarGroup size="large">
        <SbAvatar
          src="https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4"
        />

        <SbAvatar name="John Doe" />

        <SbAvatar
          src="https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4"
        />

        <SbAvatar
          src="https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4"
        />

        <SbAvatar
          src="https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4"
        />

        <SbAvatar name="John Doe" />

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

    <div>
      <SbAvatarGroup>
        <SbAvatar
          src="https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4"
        />

        <SbAvatar name="John Doe" />

        <SbAvatar
          src="https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4"
        />

        <SbAvatar
          src="https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4"
        />

        <SbAvatar
          src="https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4"
        />

        <SbAvatar name="John Doe" />

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

    <div>
      <SbAvatarGroup size="small">
        <SbAvatar
          src="https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4"
        />

        <SbAvatar name="John Doe" />

        <SbAvatar
          src="https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4"
        />

        <SbAvatar
          src="https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4"
        />

        <SbAvatar
          src="https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4"
        />

        <SbAvatar name="John Doe" />

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
  `
})

WithMoreAvatars.parameters = {
  docs: {
    description: {
      story: 'When you have more than **6** `SbAvatar` components, it will be render a placeholder as last element indicating how many more components are there'
    }
  }
}
