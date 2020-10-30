import { mount } from '@vue/test-utils'

import { SbSelect } from '..'
import SbIcon from '../../Icon'
import SbTag from '../../Tag'
import SbAvatar from '../../Avatar'

import { defaultSelectOptionsData, defaultAvatarsData } from '../Select.stories'

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

      expect(wrapper.findAllComponents(SbTag).at(0).text()).toBe('Option 1')

      expect(wrapper.findAllComponents(SbTag).at(1).text()).toBe('Option 4')
    })

    it('should remove the tag from value when click on it', async () => {
      const wrapper = mount(SbSelect, {
        propsData: {
          label: 'Choose an option',
          options: [...defaultSelectOptionsData],
          value: ['Option 1', 'Option 4', 'Option 6'],
          multiple: true,
        },
      })

      const tagComponent = wrapper.findAllComponents(SbTag).at(1)

      await tagComponent.findComponent(SbIcon).trigger('click')

      expect(wrapper.emitted('input')[0][0]).toEqual(['Option 1', 'Option 6'])
    })

    it('should remove all values when click on Clear all values button', async () => {
      const wrapper = mount(SbSelect, {
        propsData: {
          label: 'Choose an option',
          options: [...defaultSelectOptionsData],
          value: ['Option 1', 'Option 4', 'Option 6'],
          multiple: true,
        },
      })

      const buttonComponent = wrapper.find('button')

      await buttonComponent.trigger('click')

      expect(wrapper.emitted('input')[0][0]).toEqual([])
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

  describe('filterable property', () => {
    it('should change the list when type in the input', async () => {
      const wrapper = mount(SbSelect, {
        propsData: {
          label: 'Choose an option',
          options: [...defaultSelectOptionsData],
          value: null,
          leftIcon: 'calendar',
          filterable: true,
        },
      })

      // making the options list visible
      wrapper.vm.show()

      await wrapper.vm.$nextTick()

      // get the input component
      const inputComponent = wrapper.find('input[type="search"]')

      // type a value on it
      await inputComponent.setValue('option 1')

      const listItems = wrapper.findAll('li')

      // it should have just one list item
      expect(listItems.length).toBe(1)

      // with the expected text
      expect(listItems.at(0).text()).toBe('Option 1')
    })

    it('should change the placeholder using filterPlaceholder property', async () => {
      const wrapper = mount(SbSelect, {
        propsData: {
          label: 'Choose an option',
          options: [...defaultSelectOptionsData],
          value: null,
          leftIcon: 'calendar',
          filterable: true,
          filterPlaceholder: 'Filter Tags',
        },
      })

      // making the options list visible
      wrapper.vm.show()

      await wrapper.vm.$nextTick()

      // make the assert on placeholder attribute
      expect(
        wrapper.find('input[type="search"]').attributes('placeholder')
      ).toBe('Filter Tags')
    })
  })

  describe('useAvatars option', () => {
    it('should have the correct list of Avatars', async () => {
      const wrapper = mount(SbSelect, {
        propsData: {
          label: 'Choose an option',
          options: [...defaultAvatarsData],
          value: null,
          leftIcon: 'calendar',
          filterable: true,
          useAvatars: true,
        },
      })

      wrapper.vm.show()

      await wrapper.vm.$nextTick()

      expect(wrapper.findAllComponents(SbAvatar).length).toBe(3)
    })

    it('should have the correct selected Avatar', async () => {
      const wrapper = mount(SbSelect, {
        propsData: {
          label: 'Choose an option',
          options: [...defaultAvatarsData],
          value: '001',
          leftIcon: 'calendar',
          filterable: true,
          useAvatars: true,
        },
      })

      wrapper.vm.show()

      await wrapper.vm.$nextTick()

      const avatarComponent = wrapper
        .find('.sb-select-inner')
        .findComponent(SbAvatar)

      expect(avatarComponent.props('name')).toBe('Dominik Angerer')
    })

    it('should filter the list using the name', async () => {
      const wrapper = mount(SbSelect, {
        propsData: {
          label: 'Choose an option',
          options: [...defaultAvatarsData],
          value: '001',
          leftIcon: 'calendar',
          filterable: true,
          useAvatars: true,
        },
      })

      wrapper.vm.show()

      await wrapper.vm.$nextTick()

      const listComponent = wrapper.find('.sb-select-list')

      wrapper.find('input[type="search"]').setValue('Alex')

      await wrapper.vm.$nextTick()

      expect(listComponent.findAllComponents(SbAvatar).length).toBe(1)

      expect(
        listComponent.findAllComponents(SbAvatar).at(0).props('name')
      ).toBe('Alexander Feiglstorfer')
    })
  })

  describe('inline option', () => {
    it('should have the correct class on wrapper', async () => {
      const wrapper = mount(SbSelect, {
        propsData: {
          label: 'Choose an option',
          options: [...defaultAvatarsData],
          value: null,
          leftIcon: 'calendar',
          filterable: true,
          inline: true,
        },
      })

      expect(wrapper.classes('sb-select--inline')).toBeTruthy()
    })
  })
})
