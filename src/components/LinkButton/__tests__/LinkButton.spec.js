import SbLinkButton from '../index'
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
        status: 'secondary'
      })

      const LinkButton = wrapper.find('a')

      expect(LinkButton.attributes('class')).toBe('sb-link-button sb-link-button--secondary')
    })
  })

  describe('SbLinkButton using icon', () => {
    it('should have an img tag', () => {
      const wrapper = factory({
        label: 'Secondary',
        href: 'http://storyblok.com/',
        title: 'Link with icon',
        icon: 'check'
      })

      expect(wrapper.find('img').exists()).toBe(true)
    })
  })
})
