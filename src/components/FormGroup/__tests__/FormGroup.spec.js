import { mount } from '@vue/test-utils'

import SbFormGroup from '..'

import SbTextField from '../../TextField'

const factory = (propsData) => {
  return mount(SbFormGroup, {
    propsData,
    slots: {
      default: `<SbTextField />`,
    },
    stubs: {
      SbTextField,
    },
  })
}

describe('SbFormGroup component', () => {
  describe('when in default behavior', () => {
    const wrapper = factory({
      legend: 'Group Name',
    })

    it('should render the SbFormGroup component', () => {
      expect(wrapper.findComponent(SbFormGroup).exists()).toBe(true)
    })

    it('should render a legend with "Group Name" text', () => {
      const legend = wrapper
        .findComponent(SbFormGroup)
        .find('.sb-form-group__legend')
      expect(legend.exists()).toBe(true)
      expect(legend.text()).toBe('Group Name')
    })

    it('should not render a description element', () => {
      const description = wrapper
        .findComponent(SbFormGroup)
        .find('.sb-form-group__description')

      expect(description.exists()).toBe(false)
    })

    it('should render the SbTextField component in default slot', () => {
      expect(wrapper.findComponent(SbTextField).exists()).toBe(true)
    })
  })

  describe('with a description', () => {
    const wrapper = factory({
      legend: 'Group Name 2',
      description: 'Optional description for group',
    })

    it('should render the SbFormGroup component', () => {
      expect(wrapper.findComponent(SbFormGroup).exists()).toBe(true)
    })

    it('should render a legend with "Group Name 2" text', () => {
      const legend = wrapper
        .findComponent(SbFormGroup)
        .find('.sb-form-group__legend')
      expect(legend.exists()).toBe(true)
      expect(legend.text()).toBe('Group Name 2')
    })

    it('should render a description element', () => {
      const description = wrapper
        .findComponent(SbFormGroup)
        .find('.sb-form-group__description')

      expect(description.exists()).toBe(true)
      expect(description.text()).toBe('Optional description for group')
    })

    it('should render the SbTextField component in default slot', () => {
      expect(wrapper.findComponent(SbTextField).exists()).toBe(true)
    })
  })
})
