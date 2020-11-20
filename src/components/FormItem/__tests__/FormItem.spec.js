import { mount } from '@vue/test-utils'

import SbFormItem from '..'

import SbTextField from '../../TextField'

const factory = (propsData) => {
  return mount(SbFormItem, {
    propsData,
    slots: {
      default: `<SbTextField />`,
    },
    stubs: {
      SbTextField,
    },
  })
}

describe('SbFormItem component', () => {
  describe('when in default behavior', () => {
    const wrapper = factory({
      label: 'Label',
    })

    it('should render the SbFormItem component', () => {
      expect(wrapper.findComponent(SbFormItem).exists()).toBe(true)
    })

    it('should render a label with "Label" text', () => {
      const label = wrapper
        .findComponent(SbFormItem)
        .find('.sb-form-item__label')
      expect(label.exists()).toBe(true)
      expect(label.text()).toBe('Label')
    })

    it('should render the SbTextField component in default slot', () => {
      expect(wrapper.findComponent(SbTextField).exists()).toBe(true)
    })
  })

  describe('without label', () => {
    const wrapper = factory()

    it('should render the SbFormItem component', () => {
      expect(wrapper.findComponent(SbFormItem).exists()).toBe(true)
    })

    it('should not render a label element', () => {
      expect(
        wrapper.findComponent(SbFormItem).find('.sb-form-item__label').exists()
      ).toBe(false)
    })

    it('should render the SbTextField component in default slot', () => {
      expect(wrapper.findComponent(SbTextField).exists()).toBe(true)
    })
  })
})
