import { mount } from '@vue/test-utils'

import SbTag from '..'
import SbIcon from '../../Icon'

const factory = (propsData) => {
  return mount(SbTag, {
    propsData,
  })
}

describe('SbTag component', () => {
  describe('when define a type and label properties', () => {
    const label = 'Tag label'
    const wrapper = factory({
      type: 'primary',
      label,
    })

    it('should have the properly class', () => {
      expect(wrapper.classes('sb-tag--primary')).toBe(true)
    })

    it('should have a text with the correct label', () => {
      expect(wrapper.text()).toBe(label)
    })
  })

  describe('when define label as a default slot', () => {
    it('should have a text with the correct label', () => {
      const label = 'Tag label'
      const wrapper = mount(SbTag, {
        propsData: {
          type: 'primary',
          label,
        },
        slots: {
          default: [label],
        },
      })

      expect(wrapper.text()).toBe(label)
    })
  })

  describe('when define the closable property', () => {
    const label = 'Tag closable'
    const wrapper = factory({
      type: 'info',
      label,
      closable: true,
    })

    const IconComponent = wrapper.findComponent(SbIcon)

    it('should have the properly class', () => {
      expect(wrapper.classes('sb-tag--closable')).toBe(true)
    })

    it('should have an icon with close name', () => {
      expect(IconComponent.props('name')).toBe('close')
    })

    it('should trigger a close custom event when the icon was clicked', async () => {
      await IconComponent.vm.$emit('click')

      await wrapper.vm.$nextTick()

      expect(wrapper.emitted().close).toBeTruthy()
    })
  })
})
