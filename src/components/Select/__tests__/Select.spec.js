import { mount } from '@vue/test-utils'

import { SbSelect } from '..'
import SbIcon from '../../Icon'

import { defaultSelectOptionsData } from '../Select.stories'

describe('SbSelect component', () => {
  describe('default behavior (single option)', () => {
    const wrapper = mount(SbSelect, {
      propsData: {
        label: 'Choose an option',
        options: [...defaultSelectOptionsData],
        value: null,
      },
    })

    const innerElement = wrapper.find('.sb-select-inner')

    it('should have the inner select with correct text', () => {
      expect(innerElement.text()).toBe('Choose an option')
    })

    it('should be toggle the list by clicking on the inner element', async () => {
      // turn the list visible
      await innerElement.trigger('click')

      // check if has an ul element in the document
      expect(wrapper.find('ul').exists()).toBe(true)

      // check if the first element on the list exists
      expect(wrapper.findAll('li').at(0).text()).toBe('Option 1')

      // turn the list not visible
      await innerElement.trigger('click')

      // check if has an ul element in the document
      expect(wrapper.find('ul').exists()).toBe(false)
    })

    it('should be emit an input event when click on element on list', async () => {
      // turn the list visible
      await innerElement.trigger('click')

      // find the first element and click on it
      wrapper.findAll('li').at(0).trigger('click')

      // check if the value of the element was emitted
      expect(wrapper.emitted('input')[0]).toEqual(['Option 1'])
    })

    it('should make visible the value in the inner element', async () => {
      await wrapper.setProps({
        value: 'Option 3',
      })

      expect(innerElement.text()).toBe('Option 3')
    })
  })

  describe('multiple option logic', () => {
    const defaultsPropsData = {
      label: 'Choose an option',
      options: [...defaultSelectOptionsData],
      multiple: true,
    }

    const getFirstValue = (wrapper, event) => wrapper.emitted(event)[0][0]

    it('should emit an input event with an array of values', async () => {
      const wrapper = mount(SbSelect, {
        propsData: {
          ...defaultsPropsData,
          value: [],
        },
      })

      const innerElement = wrapper.find('.sb-select-inner')

      // opens the items menu
      await innerElement.trigger('click')

      // clicking on the element1
      await wrapper.findAll('li').at(1).trigger('click')

      // should continue the list visible
      expect(wrapper.find('ul').exists()).toBe(true)

      // should emit the input event with the correct value
      expect(getFirstValue(wrapper, 'input')).toEqual(['Option 2'])
    })

    it('should emit appended array with the new element that was selected', async () => {
      const wrapper = mount(SbSelect, {
        propsData: {
          ...defaultsPropsData,
          value: ['Option 2'],
        },
      })

      const innerElement = wrapper.find('.sb-select-inner')

      // opens the items menu
      await innerElement.trigger('click')

      // clicking on the fourth element on the list
      await wrapper.findAll('li').at(3).trigger('click')

      // should continue the list visible
      expect(wrapper.find('ul').exists()).toBe(true)

      // should emit the input event with the correct value
      expect(getFirstValue(wrapper, 'input')).toEqual(['Option 2', 'Option 4'])
    })

    it('should emit an array without a previous element when it is selected', async () => {
      const wrapper = mount(SbSelect, {
        propsData: {
          ...defaultsPropsData,
          value: ['Option 2', 'Option 4'],
        },
      })

      const innerElement = wrapper.find('.sb-select-inner')

      // opens the items menu
      await innerElement.trigger('click')

      // clicking on the fourth element on the list
      await wrapper.findAll('li').at(3).trigger('click')

      // should continue the list visible
      expect(wrapper.find('ul').exists()).toBe(true)

      // should emit the input event with the correct value
      expect(getFirstValue(wrapper, 'input')).toEqual(['Option 2'])
    })

    it('should change the select inner with the value', async () => {
      const wrapper = mount(SbSelect, {
        propsData: {
          ...defaultsPropsData,
          value: ['Option 1', 'Option 4'],
        },
      })

      expect(wrapper.find('.sb-select-inner').text()).toBe('Option 1, Option 4')
    })
  })

  describe('leftIcon property', () => {
    const wrapper = mount(SbSelect, {
      propsData: {
        label: 'Choose an option',
        options: [...defaultSelectOptionsData],
        value: null,
        leftIcon: 'calendar',
      },
    })

    it('should have the inner select with correct text', () => {
      expect(wrapper.findComponent(SbIcon).exists()).toBeTruthy()
    })
  })
})
