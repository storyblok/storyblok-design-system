import SbAvatar from './index'

// default export defines configurations to all stories
export default {
  title: 'SbAvatar',
  component: SbAvatar
}

export const AvatarDefault = () => ({
  components: { SbAvatar },
  template: '<SbAvatar src="https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4" />'
})

export const AvatarInitials = () => ({
  components: { SbAvatar },
  template: `<div>
    <SbAvatar name="John Doe" size="large" />

    <SbAvatar name="John Doe" />

    <SbAvatar name="John" size="small" />
  </div>`
})

export const AvatarSizes = () => ({
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

export const AvatarWithUsername = () => ({
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

export const AvatarWithFallback = () => ({
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
