import { mount } from '@vue/test-utils'

import Accordion from '..'
import SbTextField from '../../TextField'
import { h } from 'vue'

const factory = (props, slots = {}) => {
  return mount(Accordion, {
    props,
    slots: {
      ...slots,
      default: h(SbTextField),
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
      title: 'Group Name 2',
      icon: 'settings',
      isOpen: true,
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

describe('with content info', () => {
  it('should render the "4 items" html element in the  content info slot', () => {
    const wrapper = factory(
      { title: 'Group Name 2' },
      { contentInfo: '<i>4 items</i>' },
    )

    const info = wrapper
      .findComponent(Accordion)
      .find('.sb-accordion__content-info')
    expect(info.exists()).toBe(true)
    expect(info.text()).toBe('4 items')
  })

  it('should not render the content info wrapper', () => {
    const wrapper = factory({
      title: 'Group Name 2',
    })

    const info = wrapper
      .findComponent(Accordion)
      .find('.sb-accordion__content-info')
    expect(info.exists()).toBe(false)
  })
})
