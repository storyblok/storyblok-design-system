import { mount } from '@vue/test-utils'
import SbAvatarGroup, { MoreAvatar, MoreAvatars } from '..'
import SbAvatar from '../../Avatar'

const factory = (template, propsData = {}) => {
  const Wrapper = {
    props: {
      size: String
    },
    components: {
      SbAvatar,
      SbAvatarGroup
    },
    template
  }

  return mount(Wrapper, {
    propsData
  })
}

describe('SbAvatarGroup component', () => {
  it('should render a list of Avatars when it has less than six users', () => {
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

    wrappers.findAllComponents(SbAvatar).wrappers.forEach(wrapper => {
      expect(wrapper.props('size')).toBe('large')
    })
  })

  describe('when there are more than six Avatar components', () => {
    const template = `
      <SbAvatarGroup size="large">
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
    `
    const wrappers = factory(template)

    it('should render a list of six Avatars', () => {
      expect(wrappers.findAll('.sb-avatar-group > .sb-avatar').length).toBe(6)
    })

    it('should render, as the last element, the MoreAvatar component with +n text', () => {
      expect(wrappers.findAllComponents(MoreAvatar).length).toBe(1)
      expect(wrappers.findComponent(MoreAvatar).text()).toBe('+3')
    })

    it('should render the MoreAvatars component with the children', () => {
      const moreAvatars = wrappers.findComponent(MoreAvatars)
      expect(moreAvatars.findAll('.sb-avatar').length).toBe(3)
    })
  })
})
