import { mount } from '@vue/test-utils'

import { SbSelect } from '..'

import { defaultSelectOptionsData } from '../Select.stories'

describe('SbSelect component', () => {
  describe('default behavior (single option)', () => {
    const wrapper = mount(SbSelect, {
      propsData: {
        label: 'Choose an option',
        options: [...defaultSelectOptionsData],
        value: null
      }
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
        value: 'Option 3'
      })

      expect(innerElement.text()).toBe('Option 3')
    })
  })

  describe('multiple option logic', () => {
    const wrapper = mount({
      components: {
        SbSelect
      },

      data: () => ({
        label: 'Choose an option',
        options: [...defaultSelectOptionsData],
        value: [],
        multiple: true
      }),

      template: `
        <SbSelect
          v-bind="{
            label,
            options,
            multiple
          }"
          v-model="value"
        />
      `
    })

    const innerElement = wrapper.find('.sb-select-inner')

    it('should perform a multiple selection', async () => {
      // opens the items menu
      await innerElement.trigger('click')

      // get three elements
      const element1 = wrapper.findAll('li').at(1)
      const element2 = wrapper.findAll('li').at(3)
      const element3 = wrapper.findAll('li').at(5)

      // clicking on the element1
      await element1.trigger('click')

      // should continue the list visible
      expect(wrapper.find('ul').exists()).toBe(true)

      // should emit the input event with the correct value
      expect(wrapper.vm.value).toEqual([
        'Option 2'
      ])

      // clicking on the element1
      await element2.trigger('click')

      // should emit the input event with the correct value
      expect(wrapper.vm.value).toEqual([
        'Option 2',
        'Option 4'
      ])

      // clicking on the element1
      await element3.trigger('click')

      // should emit the input event with the correct value
      expect(wrapper.vm.value).toEqual([
        'Option 2',
        'Option 4',
        'Option 6'
      ])

      // clicking on the element1
      await element2.trigger('click')

      // should emit the input event with the correct value
      expect(wrapper.vm.value).toEqual([
        'Option 2',
        'Option 6'
      ])
    })

    it('should change the select inner with the value', async () => {
      await wrapper.setData({
        value: ['Option 1', 'Option 4']
      })

      expect(innerElement.text()).toBe('Option 1, Option 4')
    })
  })
})
