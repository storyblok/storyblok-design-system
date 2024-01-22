import { mount } from '@vue/test-utils'
import SbAvatarGroup, { SbMoreAvatars } from '..'
import SbAvatar from '../../Avatar'

const factory = (template, props = {}) => {
  const Wrapper = {
    props: {
      size: String,
    },
    components: {
      SbAvatar,
      SbMoreAvatars,
      SbAvatarGroup,
    },
    template,
  }

  return mount(Wrapper, {
    props,
  })
}

describe('SbAvatarGroup component', () => {
  it('should render a list of Avatars when it has less than five users', () => {
    const template = `
      <SbAvatarGroup>
        <SbAvatar src="LOAD_SUCCESS_SRC" />
        <SbAvatar src="LOAD_SUCCESS_SRC" />
        <SbAvatar src="LOAD_SUCCESS_SRC" />
      </SbAvatarGroup>
    `
    const wrapper = factory(template)

    expect(wrapper.findAllComponents(SbAvatar).length).toBe(3)
  })

  it('should render a list of Avatars using the correct size', () => {
    const template = `
      <SbAvatarGroup size="large">
        <SbAvatar src="LOAD_SUCCESS_SRC" />
        <SbAvatar src="LOAD_SUCCESS_SRC" />
        <SbAvatar src="LOAD_SUCCESS_SRC" />
      </SbAvatarGroup>
    `
    const wrappers = factory(template)

    wrappers.findAllComponents(SbAvatar).forEach((wrapper) => {
      expect(wrapper.props('size')).toBe('large')
    })
  })

  describe('when there are more than five Avatar components', () => {
    const wrapper = {
      components: {
        SbAvatar,
        SbMoreAvatars,
        SbAvatarGroup,
      },
      props: {
        size: {
          type: String,
          default: 'large',
        },
        maxElements: {
          type: Number,
          default: 5,
        },
      },
      template: `
        <SbAvatarGroup :size="size" :max-elements="maxElements">
          <SbAvatar src="LOAD_SUCCESS_SRC" />
          <SbAvatar src="LOAD_SUCCESS_SRC" />
          <SbAvatar src="LOAD_SUCCESS_SRC" />
          <SbAvatar src="LOAD_SUCCESS_SRC" />
          <SbAvatar src="LOAD_SUCCESS_SRC" />
          <SbAvatar src="LOAD_SUCCESS_SRC" />
          <SbAvatar src="LOAD_SUCCESS_SRC" />
          <SbAvatar src="LOAD_SUCCESS_SRC" />
          <SbAvatar src="LOAD_SUCCESS_SRC" />
        </SbAvatarGroup>
      `,
    }
    const wrappers = mount(wrapper)

    it('should render a list of five Avatars', () => {
      expect(wrappers.findAll('.sb-avatar-group > .sb-avatar').length).toBe(5)
    })

    it('should render, as the last element, the MoreAvatar component with +n text', () => {
      expect(wrappers.findAllComponents(SbMoreAvatars).length).toBe(1)
      expect(wrappers.findComponent(SbMoreAvatars).text()).toBe('+4')
    })

    it('should render the correct SbAvatar when changes the maxElements property', async () => {
      await wrappers.setProps({
        maxElements: 7,
      })

      expect(wrappers.findAll('.sb-avatar-group > .sb-avatar').length).toBe(7)
      expect(wrappers.findComponent(SbMoreAvatars).text()).toBe('+2')
    })
  })
})
