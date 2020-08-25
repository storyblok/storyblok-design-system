import SbLinkButton from '..'
import SbIcon from '../../Icon'
import { mount } from '@vue/test-utils'

const factory = propsData => {
  return mount(SbLinkButton, {
    propsData
  })
}

describe('Test SbLinkButton component', () => {
  describe('SbLinkButton default behavior', () => {
    const wrapper = factory({
      label: 'Primary',
      href: 'http://storyblok.com',
      title: 'To home page'
    })
    const LinkButton = wrapper.find('a')

    it('should render a <a> tag with properly attributes', () => {
      expect(LinkButton.exists()).toBe(true)
      expect(LinkButton.attributes('href')).toBe('http://storyblok.com')
      expect(LinkButton.attributes('title')).toBe('To home page')
      expect(LinkButton.text()).toBe('Primary')
    })

    it('should have properly classes with primary state', () => {
      expect(LinkButton.attributes('class')).toBe('sb-link-button sb-link-button--primary')
    })
  })

  describe('secondary SbLinkButton', () => {
    it('should have properly classes with secondary state', () => {
      const wrapper = factory({
        label: 'Secondary',
        href: 'http://storyblok.com/v2',
        title: 'To second page',
        type: 'secondary'
      })

      const LinkButton = wrapper.find('a')

      expect(LinkButton.attributes('class')).toBe('sb-link-button sb-link-button--secondary')
    })
  })

  describe('SbLinkButton using icon', () => {
    const wrapper = factory({
      label: 'Secondary',
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
})
