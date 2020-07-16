import SbAvatarGroup from './index'
import SbAvatar from '../Avatar'

// default export defines configurations to all stories
export default {
  title: 'SbAvatarGroup',
  component: SbAvatarGroup
}

export const Default = () => ({
  components: { SbAvatarGroup, SbAvatar },
  template: `
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

export const WithMoreAvatars = () => ({
  components: { SbAvatarGroup, SbAvatar },
  template: `
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
      src="https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4"
    />

    <SbAvatar
      src="https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4"
    />
  </SbAvatarGroup>
  `
})
