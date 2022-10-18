import { mount } from '@vue/test-utils'

import SbFormItem from '..'

import SbIcon from '../../Icon'
import SbTextField from '../../TextField'

const localVue = global.localVue

const factory = (props) => {
  return mount(SbFormItem, {
    props,
    slots: {
      default: `<SbTextField />`,
    },
    global: {
      stubs: {
        SbTextField,
      },
    },
    localVue,
  })
}

describe('SbFormItem component', () => {
  describe('when in default behavior', () => {
    const wrapper = factory({
      label: 'Label',
      helperIconText: 'Helper icon text',
      helperText: 'Helper text',
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

    it('should render a helper with "Helper text"', () => {
      const label = wrapper
        .findComponent(SbFormItem)
        .find('.sb-form-item__helper-text')
      expect(label.exists()).toBe(true)
      expect(label.text()).toBe('Helper text')
    })

    it('should render a helper with "Helper icon text"', async () => {
      const icon = wrapper.findComponent(SbIcon)

      await icon.trigger('mouseover')

      const tooltip = document.querySelector('[role="tooltip"]')

      expect(tooltip.innerText).toBe('Helper icon text')
    })

    it('should render the SbTextField component in default slot', () => {
      expect(wrapper.findComponent(SbTextField).exists()).toBe(true)
    })
  })

  describe('without label and helper texts', () => {
    const wrapper = factory()

    it('should render the SbFormItem component', () => {
      expect(wrapper.findComponent(SbFormItem).exists()).toBe(true)
    })

    it('should not render a label element', () => {
      expect(
        wrapper.findComponent(SbFormItem).find('.sb-form-item__label').exists()
      ).toBe(false)
    })

    it('should not render a helper text', () => {
      expect(
        wrapper
          .findComponent(SbFormItem)
          .find('.sb-form-item__helper-text')
          .exists()
      ).toBe(false)
    })

    it('should not render a helper icon text', () => {
      expect(
        wrapper
          .findComponent(SbFormItem)
          .find('.sb-form-item__helper-icon-text')
          .exists()
      ).toBe(false)
    })

    it('should render the SbTextField component in default slot', () => {
      expect(wrapper.findComponent(SbTextField).exists()).toBe(true)
    })
  })
})
