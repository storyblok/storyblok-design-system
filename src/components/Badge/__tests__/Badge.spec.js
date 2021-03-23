import { mount } from '@vue/test-utils'

import SbIcon from '../../Icon'
import SbBadge from '..'

const factory = (propsData) => {
  return mount(SbBadge, {
    propsData,
  })
}

describe('SbBadge component', () => {
  describe('default behavior, when just pass type and label properties', () => {
    const wrapper = factory({
      type: 'negative',
      label: 'Badge error label',
    })

    it('should have a properly type class', () => {
      expect(wrapper.attributes('class')).toBe('sb-badge sb-badge--negative')
    })

    it('should have a properly icon name', () => {
      const IconComponent = wrapper.findComponent(SbIcon)

      expect(IconComponent.props('name')).toBe('square-error')
    })

    it('should have the correct label', () => {
      expect(wrapper.text()).toBe('Badge error label')
    })
  })

  describe('when it uses the slot for text', () => {
    it('should have the correct label', () => {
      const label = 'Badge from slot'
      const wrapper = mount(SbBadge, {
        propsData: {
          type: 'positive',
        },
        slots: {
          default: [label],
        },
      })

      expect(wrapper.text()).toBe(label)
    })
  })

  describe('when it uses the contract property', () => {
    const wrapper = factory({
      contract: true,
      type: 'info',
      label: 'Badge info label',
    })

    it('should have the correct type class', () => {
      expect(wrapper.classes('sb-badge--info')).toBe(true)
    })

    it('should have the properly class', () => {
      expect(wrapper.classes('sb-badge--contract')).toBe(true)
    })

    it('should does not render the SbIcon component', () => {
      expect(wrapper.findComponent(SbIcon).exists()).toBe(false)
    })

    it('should does not render any label', () => {
      expect(wrapper.text()).toBe('')
    })
  })

  describe('when it uses the onlyIcon property', () => {
    const wrapper = factory({
      type: 'info',
      onlyIcon: true,
      label: 'Badge info label',
    })

    it('should have the correct type class', () => {
      expect(wrapper.classes('sb-badge--info')).toBe(true)
    })

    it('should have the properly class', () => {
      expect(wrapper.classes('sb-badge--only-icon')).toBe(true)
    })

    it('should render the SbIcon component', () => {
      expect(wrapper.findComponent(SbIcon).exists()).toBe(true)
    })

    it('should does not render any label', () => {
      expect(wrapper.text()).toBe('')
    })
  })

  describe('when it uses the inlineLabel property', () => {
    const label = 'Badge warning label'
    const wrapper = factory({
      type: 'warning',
      inlineLabel: true,
      label,
    })

    it('should have the correct type class', () => {
      expect(wrapper.classes('sb-badge--warning')).toBe(true)
    })

    it('should have the properly class', () => {
      expect(wrapper.classes('sb-badge--inline-label')).toBe(true)
    })

    it('should render the SbIcon component', () => {
      expect(wrapper.findComponent(SbIcon).exists()).toBe(true)
    })

    it('should render the correct label', () => {
      expect(wrapper.text()).toBe(label)
    })
  })

  describe('when it uses the number property', () => {
    const number = 0

    const wrapper = factory({
      type: 'warning',
      inlineLabel: true,
      number,
    })

    it('should have the correct type class', () => {
      expect(wrapper.classes('sb-badge--warning')).toBe(true)
    })

    it('should does not render the SbIcon component', () => {
      expect(wrapper.findComponent(SbIcon).exists()).toBe(false)
    })

    it('should render the correct number', () => {
      expect(wrapper.text()).toBe(number.toString())
    })
  })
})
