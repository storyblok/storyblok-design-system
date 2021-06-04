import { mount, RouterLinkStub } from '@vue/test-utils'
import { SbBreadcrumbItem } from '../BreadcrumItem'
import SbIcon from '../../Icon'

const factory = (propsData = {}, mountOptions = {}) => {
  return mount(SbBreadcrumbItem, {
    stubs: {
      RouterLink: RouterLinkStub,
      NuxtLink: RouterLinkStub,
      SbIcon,
    },
    propsData,
    ...mountOptions,
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

    it('should render a tooltip with the long label at the bottom position', async () => {
      await wrapper.trigger('mouseover')

      const tooltip = document.querySelector('[role="tooltip"]')

      expect(tooltip.innerText).toBe(label)
      expect(tooltip.getAttribute('data-popper-placement')).toBe('bottom')
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
      const wrapper = factory({
        to: {
          name: 'TestView',
        },
        label: 'Just router-link link',
        as: 'router-link',
      })

      expect(wrapper.findComponent(RouterLinkStub).props().to).toStrictEqual({
        name: 'TestView',
      })
      expect(wrapper.text()).toBe('Just router-l...')
    })

    it('should render a <nuxt-link> tag with the correct attributes', () => {
      const wrapper = factory({
        to: {
          name: 'TestNuxtView',
        },
        label: 'Just nuxt-link link',
        as: 'nuxt-link',
      })

      expect(wrapper.findComponent(RouterLinkStub).props().to).toStrictEqual({
        name: 'TestNuxtView',
      })
      expect(wrapper.text()).toBe('Just nuxt-lin...')
    })
  })

  describe('when use the default slot', () => {
    it('should render the text in the default slot', () => {
      const wrapper = factory(
        {},
        {
          slots: {
            default: ['In default slot'],
          },
        }
      )

      const linkTag = wrapper.find('a')
      expect(linkTag.text()).toBe('In default slot')
    })

    it('should render a component inside default slot', () => {
      const wrapper = factory(
        {},
        {
          slots: {
            default: ['<SbIcon name="home" />'],
          },
        }
      )

      const iconComponent = wrapper.findComponent(SbIcon)
      expect(iconComponent.exists()).toBe(true)
      expect(iconComponent.props('name')).toBe('home')
    })

    it('should allow to render a component and a text inside default slot', () => {
      const wrapper = factory(
        {
          href: '/testing',
        },
        {
          slots: {
            default: [
              '<SbIcon name="calendar" />',
              '<span>Link using default slot</span>',
            ],
          },
        }
      )

      const iconComponent = wrapper.findComponent(SbIcon)
      expect(iconComponent.exists()).toBe(true)
      expect(iconComponent.props('name')).toBe('calendar')

      const spanTag = wrapper.find('span')
      expect(spanTag.text()).toBe('Link using default slot')

      const linkTag = wrapper.find('a')
      expect(linkTag.attributes('href')).toBe('/testing')
    })

    it('should allow to render a component and a text inside default slot using a router tag', () => {
      const mountOptions = {
        propsData: {
          to: {
            name: 'TestNuxtView',
          },
          as: 'nuxt-link',
        },
        slots: {
          default: [
            '<SbIcon name="calendar" />',
            '<span>Link using default slot</span>',
          ],
        },
      }
      const wrapper = factory({}, mountOptions)

      expect(wrapper.findComponent(RouterLinkStub).props().to).toStrictEqual({
        name: 'TestNuxtView',
      })

      const iconComponent = wrapper.findComponent(SbIcon)
      expect(iconComponent.exists()).toBe(true)
      expect(iconComponent.props('name')).toBe('calendar')

      const spanTag = wrapper.find('span')
      expect(spanTag.text()).toBe('Link using default slot')
    })
  })
})
