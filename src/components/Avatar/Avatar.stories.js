import SbAvatar from './index'

// default export defines configurations to all stories
export default {
  title: 'SbAvatar',
  component: SbAvatar
}

export const Default = () => ({
  components: { SbAvatar },
  template: '<SbAvatar src="https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4" />'
})

export const Initials = () => ({
  components: { SbAvatar },
  template: `<div>
    <SbAvatar name="John Doe" size="large" />

    <SbAvatar name="John Doe" />

    <SbAvatar name="John" size="small" />
  </div>`
})

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
