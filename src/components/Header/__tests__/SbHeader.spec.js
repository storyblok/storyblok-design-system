import { mount } from '@vue/test-utils'

import SbButton from '../../Button'
import SbHeader from '..'

const factory = (props) => {
  return mount(SbHeader, {
    props,
  })
}

describe('SbHeader component', () => {
  describe('default behavior, when just pass title property', () => {
    const wrapper = factory({
      title: 'Example title',
    })

    it('should have a properly type class', () => {
      expect(wrapper.attributes('class')).toBe('sb-header')
    })

    it('should have the correct title', () => {
      expect(wrapper.text()).toBe('Example title')
    })
  })

  describe('default behavior, when pass hasButton property', () => {
    const wrapper = factory({
      title: 'Example title',
      hasButton: true,
      buttonLabel: 'Example button label',
      buttonIcon: 'plus',
      buttonVariant: 'primary',
    })

    it('should have a button', () => {
      expect(wrapper.findComponent(SbButton).exists()).toBeTruthy()
    })

    it('should have a button text', () => {
      expect(wrapper.find('button').text()).toBe('Example button label')
    })

    it('should have a variant button primary', () => {
      expect(wrapper.find('button').attributes('class')).toBe(
        'sb-button sb-button--primary sb-button--small sb-button--has-icon'
      )
    })
  })
})
