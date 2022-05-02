import { mount } from '@vue/test-utils'

import Accordion from '..'

import SbTextField from '../../TextField'

const factory = (propsData) => {
  return mount(Accordion, {
    propsData,
    slots: {
      default: `<SbTextField />`,
    },
    stubs: {
      SbTextField,
    },
  })
}

describe('Accordion component', () => {
  describe('when in default behavior', () => {
    const wrapper = factory({
      title: 'Group Name',
    })

    it('should render the Accordion component', () => {
      expect(wrapper.findComponent(Accordion).exists()).toBe(true)
    })

    it('should render a title with "Group Name" text', () => {
      const title = wrapper
        .findComponent(Accordion)
        .find('.sb-accordion__title')
      expect(title.exists()).toBe(true)
      expect(title.text()).toBe('Group Name')
    })
  })

  describe('with a icon', () => {
    const wrapper = factory({
      legend: 'Group Name 2',
      icon: 'settings',
    })

    it('should render the Accordion component', () => {
      expect(wrapper.findComponent(Accordion).exists()).toBe(true)
    })

    it('should render a title with "Group Name 2" text', () => {
      const title = wrapper
        .findComponent(Accordion)
        .find('.sb-accordion__title')
      expect(title.exists()).toBe(true)
      expect(title.text()).toBe('Group Name 2')
    })

    it('should render an icon element', () => {
      const icon = wrapper.findComponent(Accordion).find('.sb-accordion__icon')

      expect(icon.exists()).toBe(true)
    })

    it('should render the SbTextField component in default slot', () => {
      expect(wrapper.findComponent(SbTextField).exists()).toBe(true)
    })
  })
})
