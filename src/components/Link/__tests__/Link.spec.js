import SbLink from '..'
import SbIcon from '../../Icon'
import { mount } from '@vue/test-utils'

const factory = propsData => {
  return mount(SbLink, {
    propsData
  })
}

describe('Test SbLink component', () => {
  describe('SbLink default behavior', () => {
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

    it('should have properly classes with primary state', () => {
      expect(Link.attributes('class')).toBe('sb-link sb-link--primary')
    })
  })

  describe('secondary SbLink', () => {
    it('should have properly classes with secondary state', () => {
      const wrapper = factory({
        label: 'Secondary',
        href: 'http://storyblok.com/v2',
        title: 'To second page',
        type: 'secondary'
      })

      const Link = wrapper.find('a')

      expect(Link.attributes('class')).toBe('sb-link sb-link--secondary')
    })
  })

  describe('SbLink using icon', () => {
    const wrapper = factory({
      label: 'Secondary',
      href: 'http://storyblok.com/',
      title: 'Link with icon',
      iconAfter: 'checkmark'
    })

    const Icon = wrapper.findComponent(SbIcon)

    it('should have SbIcon component', () => {
      expect(Icon.exists()).toBe(true)
    })

    it('should the SbIcon with name that it was passed', () => {
      expect(Icon.props('name')).toBe('checkmark')
    })
  })
})
