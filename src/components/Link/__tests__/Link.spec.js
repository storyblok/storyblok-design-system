import SbLink from '..'
import SbIcon from '../../Icon'
import { mount, RouterLinkStub } from '@vue/test-utils'

const factory = propsData => {
  return mount(SbLink, {
    propsData,
    stubs: {
      RouterLink: RouterLinkStub
    }
  })
}

describe('Test SbLink component', () => {
  describe('when use as default <a> tag', () => {
    const wrapper = factory({
      label: 'Primary',
      href: 'http://storyblok.com',
      title: 'To home page'
    })
    const Link = wrapper.find('a')

    it('should render a <a> tag with properly attributes', () => {
      expect(Link.exists()).toBe(true)
      expect(Link.attributes('href')).toBe('http://storyblok.com')
      expect(Link.attributes('title')).toBe('To home page')
      expect(Link.text()).toBe('Primary')
    })
  })

  describe('when using an icon', () => {
    const label = 'Link with icon'
    const wrapper = factory({
      label,
      href: 'http://storyblok.com/',
      title: 'Link with icon',
      icon: 'checkmark'
    })

    const Icon = wrapper.findComponent(SbIcon)

    it('should have SbIcon component', () => {
      expect(Icon.exists()).toBe(true)
    })

    it('should the SbIcon with name that it was passed', () => {
      expect(Icon.props('name')).toBe('checkmark')
    })
  })

  describe('when use router-link component', () => {
    const label = 'Auth data'

    const wrapper = factory({
      label,
      to: '/auth',
      title: 'Link with icon',
      as: 'router-link'
    })

    const routerLinkComponent = wrapper.findComponent(RouterLinkStub)

    it('should the component exists', () => {
      expect(
        routerLinkComponent.exists()
      ).toBe(true)

      expect(
        routerLinkComponent.text()
      ).toBe(label)
    })

    it('should the component has the correct props', () => {
      expect(
        routerLinkComponent.props('to')
      ).toBe('/auth')
    })
  })

  describe('when use label as a default slot', () => {
    const label = 'Auth data'

    const wrapper = mount(SbLink, {
      propsData: {
        to: '/auth',
        title: 'Link with icon'
      },
      slots: {
        default: [label]
      }
    })

    it('should render the correct label', () => {
      expect(wrapper.text()).toBe(label)
    })
  })
})
