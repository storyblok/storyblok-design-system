import { mount, RouterLinkStub, shallowMount } from '@vue/test-utils'
import { SbBreadcrumbItem, SbBreadcrumbLink } from '../BreadcrumItem'
import SbTooltip from '../../Tooltip'

const factory = (propsData = {}) => {
  return mount(SbBreadcrumbItem, {
    propsData,
  })
}

const factoryShallowMount = (propsData = {}) => {
  return shallowMount(SbBreadcrumbLink, {
    stubs: {
      RouterLink: RouterLinkStub,
      NuxtLink: RouterLinkStub,
    },
    propsData,
  })
}

describe('SbBreadcrumbItem component', () => {
  describe('when render a simple <a> tag', () => {
    const wrapper = factory({
      href: '/test-link',
      label: 'Just a link',
      title: 'A simple title',
    })

    it('should render the tag with correct href and title attributes', () => {
      const linkTag = wrapper.find('a')
      expect(linkTag.attributes('href')).toBe('/test-link')
      expect(linkTag.attributes('title')).toBe('A simple title')
      expect(linkTag.text()).toBe('Just a link')
    })
  })

  describe('when render a long label', () => {
    const title = 'A long title that should be render correctly'
    const label = 'A long label to test'
    const wrapper = factory({
      href: '/test-link',
      label,
      title,
    })

    it('should render the first 13 letters', () => {
      const linkTag = wrapper.find('a')
      expect(linkTag.attributes('href')).toBe('/test-link')
      expect(linkTag.attributes('title')).toBe(title)
      expect(linkTag.text()).toBe('A long label ...')
    })

    it('should render a tooltip with the long label at the bottom position', () => {
      const SbTooltipComponent = wrapper.findComponent(SbTooltip)

      expect(SbTooltipComponent.exists()).toBe(true)
      expect(SbTooltipComponent.props('label')).toBe(label)
      expect(SbTooltipComponent.props('position')).toBe('bottom')
    })
  })

  describe('when render a active item', () => {
    const wrapper = factory({
      label: 'Just a link',
      isActive: true,
    })

    it('should render a <li> tag with --active class', () => {
      expect(wrapper.attributes('class')).toBe(
        'sb-breadcrumbs__item sb-breadcrumbs__item--active'
      )
    })

    it('should render a <li> tag with aria-current=page attribute', () => {
      expect(wrapper.attributes('aria-current')).toBe('page')
    })
  })

  describe('when customize the tag', () => {
    it('should render a <router-link> tag with the correct attributes', () => {
      const wrapper = factoryShallowMount({
        to: {
          name: 'TestView',
        },
        label: 'Just router-link link',
        as: 'router-link',
      })

      expect(wrapper.findComponent(RouterLinkStub).props().to).toStrictEqual({
        name: 'TestView',
      })
      expect(wrapper.text()).toBe('Just router-link link')
    })

    it('should render a <nuxt-link> tag with the correct attributes', () => {
      const wrapper = factoryShallowMount({
        to: {
          name: 'TestNuxtView',
        },
        label: 'Just nuxt-link link',
        as: 'nuxt-link',
      })

      expect(wrapper.findComponent(RouterLinkStub).props().to).toStrictEqual({
        name: 'TestNuxtView',
      })
      expect(wrapper.text()).toBe('Just nuxt-link link')
    })
  })
})
