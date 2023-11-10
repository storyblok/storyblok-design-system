import { mount } from '@vue/test-utils'

import SbHeading from '..'

const factory = (options) => {
  return mount(SbHeading, {
    ...options,
  })
}

describe('Test SbHeading Component', () => {
  it('should render the default h1 tag', () => {
    const wrapper = factory()

    expect(wrapper.find('h1').exists()).toBeTruthy()
  })

  describe('when a tag name is passed to the `as` prop', () => {
    it('should render tag element', () => {
      const options = {
        props: {
          as: 'h2',
        },
      }
      const wrapper = factory(options)

      expect(wrapper.find('h2').exists()).toBeTruthy()
    })
  })

  describe('when `font-weight` prop is passed', () => {
    it('should render font-weight class correctly', () => {
      const options = {
        props: {
          fontWeight: 'medium',
        },
      }
      const wrapper = factory(options)

      expect(wrapper.find('h1').classes()[1]).toBe('font-medium')
    })
  })

  describe('when `customFontSize` props is passed', () => {
    it('should render font-size style correctly', () => {
      const options = {
        props: {
          customFontSize: '14px',
        },
      }
      const wrapper = factory(options)

      expect(wrapper.attributes().style).toBe('font-size: 14px;')
    })
  })

  describe('when node is passed into default slot', () => {
    it('should render text node correctly', () => {
      const options = {
        slots: {
          default: 'Main Content',
        },
      }
      const wrapper = factory(options)

      expect(wrapper.text()).toMatch(/Main Content/i)
    })
    it('should render element node correctly', () => {
      const options = {
        slots: {
          default: '<div class="header-title">Main Content</div>',
        },
      }
      const wrapper = factory(options)

      expect(wrapper.find('.header-title').html()).toBe(
        '<div class="header-title">Main Content</div>'
      )
    })
  })
})
