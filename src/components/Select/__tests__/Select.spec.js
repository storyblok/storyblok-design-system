import { SbMinibrowser } from '../../Minibrowser'
import { mountAttachingComponent, waitMs } from '../../../utils/tests-utils'
import { MOCK_DATA } from '../../Minibrowser/Minibrowser.stories'

import { SbSelect } from '..'
import SbIcon from '../../Icon'
import SbTag from '../../Tag'
import SbAvatar from '../../Avatar'

import {
  defaultSelectOptionsData,
  selectOptionsDataWithAllOption,
  defaultAvatarsData,
  defaultOptionsWithCaptionData,
} from '../Select.stories'

describe('SbSelect component', () => {
  describe('default behavior (single option)', () => {
    const wrapper = mountAttachingComponent(SbSelect, {
      props: {
        label: 'Choose an option',
        options: [...defaultSelectOptionsData],
        value: null,
      },
    })

    const innerElement = wrapper.find('.sb-select-inner')
    const innerInput = wrapper.find('.sb-select-inner__input')

    it('should have the inner select with correct text', () => {
      expect(innerInput.element.placeholder).toBe('Choose an option')
    })

    it('should toggle the list by clicking on the inner element', async () => {
      // turn the list visible
      await innerElement.trigger('click')

      // check if has an ul element in the document
      expect(wrapper.vm.isOpen).toBe(true)

      // check if the first element on the list exists
      const firstElement = wrapper.findAll('li')[0]
      expect(firstElement.text()).toBe('Option 1')

      // turn the list not visible
      await innerElement.trigger('click')

      // check if has an ul element in the document
      expect(wrapper.vm.isOpen).toBe(false)
    })

    it('should be emit an input event when click on element on list', async () => {
      // turn the list visible
      await innerElement.trigger('click')

      // find the first element and click on it
      wrapper.findAll('li')[1].trigger('click')

      // check if the value of the element was emitted
      expect(wrapper.emitted('update:modelValue')[0]).toEqual([2])
    })

    it('should emit null when click on Clear all values button using clearable property', async () => {
      const wrapper = mountAttachingComponent(SbSelect, {
        props: {
          label: 'Choose an option',
          options: [...defaultSelectOptionsData],
          modelValue: 6,
          clearable: true,
        },
      })

      const buttonComponent = wrapper.find('[aria-label="Clear all values"]')

      await buttonComponent.trigger('click')

      expect(wrapper.emitted('update:modelValue')[0][0]).toEqual(null)
    })
  })

  describe('multiple option logic', () => {
    const defaultsprops = {
      label: 'Choose an option',
      options: [...defaultSelectOptionsData],
      multiple: true,
    }

    const getFirstValue = (wrapper, event) => wrapper.emitted(event)[0][0]

    it('should emit an input event with an array of values', async () => {
      const wrapper = mountAttachingComponent(SbSelect, {
        props: {
          ...defaultsprops,
          modelValue: [],
        },
      })

      const innerElement = wrapper.find('.sb-select-inner')

      // opens the items menu
      await innerElement.trigger('click')

      // clicking on the element1
      await wrapper.findAll('li')[1].trigger('click')

      // should continue the list visible
      expect(wrapper.find('ul').exists()).toBe(true)

      // should emit the input event with the correct value
      expect(getFirstValue(wrapper, 'update:modelValue')).toEqual([2])
    })

    it('should emit appended array with the new element that was selected', async () => {
      const wrapper = mountAttachingComponent(SbSelect, {
        props: {
          ...defaultsprops,
          modelValue: [2],
        },
      })

      const innerElement = wrapper.find('.sb-select-inner')

      // opens the items menu
      await innerElement.trigger('click')

      // clicking on the fourth element on the list
      await wrapper.findAll('li')[3].trigger('click')

      // should continue the list visible
      expect(wrapper.find('ul').exists()).toBe(true)

      // should emit the input event with the correct value
      expect(getFirstValue(wrapper, 'update:modelValue')).toEqual([2, 4])
    })

    it('should emit an array without a previous element when it is selected', async () => {
      const wrapper = mountAttachingComponent(SbSelect, {
        props: {
          ...defaultsprops,
          modelValue: [2, 4],
        },
      })

      const innerElement = wrapper.find('.sb-select-inner')

      // opens the items menu
      await innerElement.trigger('click')

      // clicking on the fourth element on the list
      await wrapper.findAll('li')[3].trigger('click')

      // should continue the list visible
      expect(wrapper.find('ul').exists()).toBe(true)

      // should emit the input event with the correct value
      expect(getFirstValue(wrapper, 'update:modelValue')).toEqual([2])
    })

    it('should change the select inner with the value', async () => {
      const wrapper = mountAttachingComponent(SbSelect, {
        props: {
          ...defaultsprops,
          modelValue: [1, 2],
        },
      })

      expect(wrapper.findAllComponents(SbTag)[0].text()).toBe('Option 1')

      expect(wrapper.findAllComponents(SbTag)[1].text()).toBe('Option 2')
    })

    it('should remove the tag from value when click on it', async () => {
      const wrapper = mountAttachingComponent(SbSelect, {
        props: {
          label: 'Choose an option',
          options: [...defaultSelectOptionsData],
          modelValue: [1, 4, 6],
          multiple: true,
        },
      })

      const tagComponent = wrapper.findAllComponents(SbTag)[1]

      await tagComponent.findComponent(SbIcon).trigger('click')

      expect(wrapper.emitted('update:modelValue')[0][0]).toEqual([1, 6])
    })

    it('should remove all values when click on Clear all values button', async () => {
      const wrapper = mountAttachingComponent(SbSelect, {
        props: {
          label: 'Choose an option',
          options: [...defaultSelectOptionsData],
          modelValue: [1, 4, 6],
          multiple: true,
          clearable: true,
        },
      })

      const buttonComponent = wrapper.find('[aria-label="Clear all values"]')

      await buttonComponent.trigger('click')

      expect(wrapper.emitted('update:modelValue')[0][0]).toEqual([])
    })

    it('should not show a tag if the value are not included in the list of available options to choose', () => {
      const wrapper = mountAttachingComponent(SbSelect, {
        props: {
          ...defaultsprops,
          modelValue: [10902],
        },
      })

      expect(wrapper.findAllComponents(SbTag)).toHaveLength(0)
    })
  })

  describe('Multiselect with a "all" option', () => {
    const defaultsprops = {
      label: 'Choose an option',
      options: [...selectOptionsDataWithAllOption],
      firstValueIsAllValue: true,
      multiple: true,
    }

    const getFirstValue = (wrapper, event) => wrapper.emitted(event)[0][0]

    it('should uncheck the "all option" when other options are selected', async () => {
      const wrapper = mountAttachingComponent(SbSelect, {
        props: {
          ...defaultsprops,
          modelValue: [0],
        },
      })

      const innerElement = wrapper.find('.sb-select-inner')
      await innerElement.trigger('click')
      await wrapper.findAll('li')[1].trigger('click')
      expect(wrapper.find('ul').exists()).toBe(true)
      expect(getFirstValue(wrapper, 'update:modelValue')).toEqual([1])
    })

    it('should uncheck all other option when "all option" is selected', async () => {
      const wrapper = mountAttachingComponent(SbSelect, {
        props: {
          ...defaultsprops,
          modelValue: [1, 2],
        },
      })

      const innerElement = wrapper.find('.sb-select-inner')
      await innerElement.trigger('click')
      await wrapper.findAll('li')[0].trigger('click')
      expect(getFirstValue(wrapper, 'update:modelValue')).toEqual([0])
    })
  })

  describe('leftIcon property', () => {
    const wrapper = mountAttachingComponent(SbSelect, {
      props: {
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
      const wrapper = mountAttachingComponent(SbSelect, {
        props: {
          label: 'Choose an option',
          options: [...defaultSelectOptionsData],
          modelValue: null,
          leftIcon: 'calendar',
          filterable: true,
        },
      })

      // making the options list visible
      wrapper.vm.showList()

      await wrapper.vm.$nextTick()

      // get the input component
      const inputComponent = wrapper.find('.sb-select-inner__input')

      // type a value on it
      await inputComponent.setValue('option 2')

      const listItems = wrapper.findAll('li')

      // it should have just one list item
      expect(listItems.length).toBe(1)

      // with the expected text
      expect(listItems[0].text()).toBe('Option 2')
    })

    it('should select the first item when pressing the enter key and there is not other element in list when filtering', async () => {
      const wrapper = mountAttachingComponent(SbSelect, {
        props: {
          label: 'Choose an option',
          options: [...defaultSelectOptionsData],
          modelValue: null,
          leftIcon: 'calendar',
          filterable: true,
        },
      })

      // making the options list visible
      wrapper.vm.showList()

      await wrapper.vm.$nextTick()

      // get the input component
      const inputComponent = wrapper.find('.sb-select-inner__input')

      // type a value on it
      await inputComponent.setValue('option 2')

      await inputComponent.trigger('keydown', {
        key: 'Enter',
      })

      expect(wrapper.vm.isOpen).toBe(false)

      expect(wrapper.emitted('update:modelValue')[0][0]).toBe(2)
    })

    it('should just close the list when pressing the enter key and there are more than one element in list when filtering', async () => {
      const wrapper = mountAttachingComponent(SbSelect, {
        props: {
          label: 'Choose an option',
          options: [...defaultSelectOptionsData],
          modelValue: null,
          leftIcon: 'calendar',
          filterable: true,
        },
      })

      // making the options list visible
      wrapper.vm.showList()

      await wrapper.vm.$nextTick()

      // get the input component
      const inputComponent = wrapper.find('.sb-select-inner__input')

      // type a value on it
      await inputComponent.setValue('opt')

      await inputComponent.trigger('keydown', {
        key: 'Enter',
      })

      expect(wrapper.vm.isOpen).toBe(false)

      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })
  })

  describe('useAvatars option', () => {
    it('should have the correct list of Avatars', async () => {
      const wrapper = mountAttachingComponent(SbSelect, {
        props: {
          label: 'Choose an option',
          options: [...defaultAvatarsData],
          modelValue: null,
          leftIcon: 'calendar',
          filterable: true,
          useAvatars: true,
        },
      })

      wrapper.vm.showList()

      await wrapper.vm.$nextTick()

      expect(wrapper.findAllComponents(SbAvatar).length).toBe(3)
    })

    it('should have the correct selected Avatar', async () => {
      const wrapper = mountAttachingComponent(SbSelect, {
        props: {
          label: 'Choose an option',
          options: [...defaultAvatarsData],
          modelValue: '001',
          leftIcon: 'calendar',
          useAvatars: true,
        },
      })

      wrapper.vm.showList()

      await wrapper.vm.$nextTick()

      const avatarComponent = wrapper.findComponent(SbAvatar)

      expect(avatarComponent.props('name')).toBe('Dominik Angerer')
    })

    it('should filter the list using the name', async () => {
      const wrapper = mountAttachingComponent(SbSelect, {
        props: {
          label: 'Choose an option',
          options: [...defaultAvatarsData],
          modelValue: null,
          leftIcon: 'calendar',
          filterable: true,
          useAvatars: true,
        },
      })

      wrapper.vm.showList()

      await wrapper.vm.$nextTick()

      const inputComponent = wrapper.find('.sb-select-inner__input')

      await inputComponent.setValue('Alex')

      await wrapper.vm.$nextTick()

      const listComponent = wrapper.find('.sb-select-list')

      expect(listComponent.findAllComponents(SbAvatar).length).toBe(1)

      expect(listComponent.findAllComponents(SbAvatar)[0].props('name')).toBe(
        'Alexander Feiglstorfer'
      )
    })
  })

  describe('inline option', () => {
    it('should have the correct class on wrapper', async () => {
      const wrapper = mountAttachingComponent(SbSelect, {
        props: {
          label: 'Choose an option',
          options: [...defaultAvatarsData],
          modelValue: null,
          leftIcon: 'calendar',
          inline: true,
        },
      })

      expect(wrapper.classes('sb-select--inline')).toBeTruthy()
    })
  })

  describe('using minibrowser component', () => {
    const wrapper = mountAttachingComponent(SbSelect, {
      props: {
        label: 'Choose an option',
        options: [...defaultSelectOptionsData],
        value: null,
      },
      slots: {
        minibrowser: `<SbMinibrowser :options="browserOptionsData" />`,
      },
      global: {
        stubs: {
          SbMinibrowser: SbMinibrowser,
          SbIcon: SbIcon,
        },
        mocks: {
          browserOptionsData: [...MOCK_DATA.FIRST_LEVEL],
        },
      },
    })

    it('should render the SbMinibroser component in minibrowser slot', () => {
      expect(wrapper.findComponent(SbMinibrowser).exists()).toBeTruthy()
    })
  })

  describe('keyboard navigation (single option)', () => {
    const innerClass = '.sb-select-inner'
    const listClass = '.sb-select-list'
    it('should open the list when press Enter and close with Escape', async () => {
      const wrapper = mountAttachingComponent(SbSelect, {
        props: {
          label: 'Choose an option',
          options: [...defaultSelectOptionsData],
          modelValue: null,
        },
      })

      const innerElement = wrapper.find('.sb-select-inner')

      // when press the Enter key in the innerElement
      await innerElement.trigger('keydown', {
        key: 'Enter',
      })

      // should change the isOpen state
      expect(wrapper.vm.isOpen).toBe(true)

      const firstElement = wrapper.findAll('li')[0]

      // and the focus should change to the first element
      expect(firstElement.attributes('tabindex')).toBe('0')

      // when press the Escape key
      await wrapper.find('.sb-select-list').trigger('keydown', {
        key: 'Escape',
      })

      // should change the isOpen state
      expect(wrapper.vm.isOpen).toBe(false)

      // and the focus should change to inner element
      expect(innerElement.attributes('tabindex')).toBe('0')
    })

    it('should emit an input event when press Enter in a list option', async () => {
      const wrapper = mountAttachingComponent(SbSelect, {
        props: {
          label: 'Choose an option',
          options: [...defaultSelectOptionsData],
          modelValue: null,
        },
      })

      const innerElement = wrapper.find(innerClass)

      await innerElement.trigger('keydown', {
        key: 'Enter',
      })

      // when press the Escape key
      await wrapper.find(listClass).trigger('keydown', {
        key: 'ArrowDown',
      })

      const secondElement = wrapper.findAll('li')[1]

      // should change the focus to second element
      expect(secondElement.attributes('tabindex')).toBe('0')

      await secondElement.trigger('keydown', {
        key: 'Enter',
      })

      // should emit the input event
      expect(wrapper.emitted('update:modelValue')).toEqual([[2]])

      // and should close the list
      expect(wrapper.vm.isOpen).toBe(false)
    })

    it(`should return value when the options don't have 'label'`, async () => {
      const options = [
        {
          itemLabel: 'Item Label 1',
          itemValue: 'Option 1',
        },
        {
          itemLabel: 'Item Label 2',
          itemValue: 'Option 2',
        },
      ]
      const wrapper = mountAttachingComponent(SbSelect, {
        props: {
          label: 'Choose an option',
          options: options,
          itemLabel: 'itemLabel',
          itemValue: 'itemValue',
        },
      })

      const innerElement = wrapper.findComponent(innerClass)

      await innerElement.trigger('keydown', {
        key: 'Enter',
      })

      // when press the Escape key
      await wrapper.find(listClass).trigger('keydown', {
        key: 'ArrowDown',
      })

      const secondElement = wrapper.findAll('li')[1]

      // should change the focus to second element
      expect(secondElement.attributes('tabindex')).toBe('0')

      await secondElement.trigger('keydown', {
        key: 'Enter',
      })

      expect(innerElement.vm.isInnerSearchVisible).toBe(true)

      expect(wrapper.emitted('update:modelValue')).toEqual([['Option 2']])

      await wrapper.setProps({
        modelValue: 'Option 2',
      })

      await wrapper.vm.$nextTick()

      expect(innerElement.vm.innerLabel).toBe(options[1].itemLabel)
    })

    it('should move focus to first element when press ArrowDown', async () => {
      const wrapper = mountAttachingComponent(SbSelect, {
        props: {
          label: 'Choose an option',
          options: [...defaultSelectOptionsData],
          modelValue: null,
        },
      })

      const innerElement = wrapper.find(innerClass)

      await innerElement.trigger('keydown', {
        key: 'ArrowDown',
      })

      // should change the focus to second element
      expect(wrapper.findAll('li')[0].attributes('tabindex')).toBe('0')
    })

    it('should move focus to last element when press ArrowUp', async () => {
      const wrapper = mountAttachingComponent(SbSelect, {
        props: {
          label: 'Choose an option',
          options: [...defaultSelectOptionsData],
          modelValue: null,
        },
      })

      const innerElement = wrapper.find(innerClass)

      await innerElement.trigger('keydown', {
        key: 'ArrowUp',
      })

      // should change the focus to second element
      expect(wrapper.findAll('li')[6].attributes('tabindex')).toBe('0')
    })
  })

  describe('keyboard navigation (multiple option)', () => {
    const innerClass = '.sb-select-inner'
    // const listClass = '.sb-select-list'

    it('should remove the SbTag item when press Enter', async () => {
      const wrapper = mountAttachingComponent(SbSelect, {
        props: {
          label: 'Choose an option',
          options: [...defaultSelectOptionsData],
          modelValue: [1, 3],
          multiple: true,
        },
      })

      // when press Enter on a tag
      await wrapper.findAllComponents(SbTag)[0].trigger('keydown', {
        key: 'Enter',
      })

      expect(wrapper.emitted('update:modelValue')[0]).toEqual([[3]])

      // and the focus should change to inner element
      expect(wrapper.find(innerClass).attributes('tabindex')).toBe('0')
    })
  })

  describe('isLoading option', () => {
    const factory = () => {
      const wrapper = mountAttachingComponent(SbSelect, {
        props: {
          label: 'Choose an option',
          options: [...defaultSelectOptionsData],
          modelValue: null,
          isLoading: true,
        },
      })

      return wrapper
    }

    it('should have an icon with loading name', async () => {
      const wrapper = factory()

      const LoadingComponent = wrapper.findComponent(SbIcon)

      expect(LoadingComponent.props('name')).toBe('loading')
    })

    it('should change the placeholder of input to loading text', async () => {
      const wrapper = factory()
      const innerInput = wrapper.find('.sb-select-inner__input')

      expect(innerInput.element.placeholder).toBe('Loading...')

      await wrapper.setProps({
        loadingLabel: 'Loading label from test...',
      })

      expect(innerInput.element.placeholder).toBe('Loading label from test...')
    })

    it('should show the label element when it has value', async () => {
      const wrapper = factory()
      const innerInput = wrapper.find('.sb-select-inner__input')

      expect(innerInput.attributes().placeholder).toBe('Loading...')

      await wrapper.setProps({
        modelValue: 'Option 1',
      })

      const valueElement = wrapper.find('.sb-select-inner__value')

      expect(innerInput.attributes().placeholder).toBe('Loading...')
      expect(valueElement.text()).toBe('Option 1')
    })

    it('should clear the placeholder if an item is selected', async () => {
      const wrapper = factory()
      const innerInput = wrapper.find('.sb-select-inner__input')

      expect(innerInput.attributes().placeholder).toBe('Loading...')

      await wrapper.setProps({
        modelValue: 'Option 1',
      })

      expect(innerInput.attributes().placeholder).toBe('Loading...')
    })
  })

  describe('disable internal search and implement a one itself', () => {
    const wrapper = mountAttachingComponent(SbSelect, {
      props: {
        label: 'Choose an option',
        options: [...defaultSelectOptionsData],
        modelValue: null,
        disableInternalFilter: true,
        filterable: true,
      },
    })

    const innerInput = wrapper.find('.sb-select-inner__input')

    it('should emit the filter event', async () => {
      await innerInput.setValue('option 2')

      await waitMs(500)

      expect(wrapper.emitted('search-input')[0][0]).toBe('option 2')
    })

    it('should not filter the list', async () => {
      await innerInput.setValue('option 2')

      await waitMs(500)

      expect(wrapper.findAll('.sb-select-list__item')).toHaveLength(7)
    })
  })

  describe('emitOption option', () => {
    it('should emit the whole object by default', async () => {
      const wrapper = mountAttachingComponent(SbSelect, {
        props: {
          label: 'Choose an option',
          options: [
            {
              label: 'Option 1',
              value: 1,
            },
            {
              label: 'Option 2',
              value: 2,
            },
            {
              label: 'Option 3',
              value: 3,
            },
          ],
          modelValue: null,
          emitOption: true,
        },
      })

      const innerElement = wrapper.find('.sb-select-inner')

      await innerElement.trigger('click')

      const listElement = wrapper.findAll('li')[1]

      expect(listElement.text()).toBe('Option 2')

      await listElement.trigger('click')

      expect(wrapper.emitted('update:modelValue')[0]).toEqual([
        {
          label: 'Option 2',
          value: 2,
        },
      ])
    })

    it('should emit a list of objects in multiple', async () => {
      const wrapper = mountAttachingComponent(SbSelect, {
        props: {
          label: 'Choose an option',
          options: [
            {
              label: 'Option 1',
              value: 1,
            },
            {
              label: 'Option 2',
              value: 2,
            },
            {
              label: 'Option 3',
              value: 3,
            },
          ],
          modelValue: [],
          emitOption: true,
          multiple: true,
        },
      })

      const innerElement = wrapper.find('.sb-select-inner')

      await innerElement.trigger('click')

      wrapper.findAll('li')[1].trigger('click')

      expect(wrapper.emitted('update:modelValue')[0]).toEqual([
        [
          {
            label: 'Option 2',
            value: 2,
          },
        ],
      ])
    })

    it('should clear a selected element in multiple', async () => {
      const wrapper = mountAttachingComponent(SbSelect, {
        props: {
          label: 'Choose an option',
          options: [
            {
              label: 'Option 1',
              value: 1,
            },
            {
              label: 'Option 2',
              value: 2,
            },
            {
              label: 'Option 3',
              value: 3,
            },
          ],
          modelValue: [
            {
              label: 'Option 1',
              value: 1,
            },
            {
              label: 'Option 2',
              value: 2,
            },
          ],
          emitOption: true,
          multiple: true,
        },
      })

      const innerElement = wrapper.find('.sb-select-inner')

      await innerElement.trigger('click')

      const tagComponent = wrapper.findAllComponents(SbTag)[0]

      expect(tagComponent.html().includes('Option 1')).toBe(true)

      await tagComponent.findComponent(SbIcon).trigger('click')

      expect(wrapper.emitted('update:modelValue')[0]).toEqual([
        [
          {
            label: 'Option 2',
            value: 2,
          },
        ],
      ])
    })

    it('should allow to search and select a single item when use the filterable property', async () => {
      const wrapper = mountAttachingComponent(SbSelect, {
        props: {
          label: 'Choose an option',
          options: [
            {
              label: 'Option 1',
              value: 1,
            },
            {
              label: 'Option 2',
              value: 2,
            },
            {
              label: 'Option 3',
              value: 3,
            },
          ],
          modelValue: [
            {
              label: 'Option 1',
              value: 1,
            },
            {
              label: 'Option 2',
              value: 2,
            },
          ],
          filterable: true,
          emitOption: true,
          multiple: true,
        },
      })

      // making the options list visible
      wrapper.vm.showList()

      await wrapper.vm.$nextTick()

      // get the input component
      const inputComponent = wrapper.find('.sb-select-inner__input')

      // type a value on it
      await inputComponent.setValue('option 3')

      const listItems = wrapper.findAll('li')

      // it should have just one list item
      expect(listItems.length).toBe(1)

      // with the expected text
      expect(listItems[0].text()).toBe('Option 3')

      await listItems[0].trigger('click')

      expect(wrapper.emitted('update:modelValue')[0]).toEqual([
        [
          {
            label: 'Option 1',
            value: 1,
          },
          {
            label: 'Option 2',
            value: 2,
          },
          {
            label: 'Option 3',
            value: 3,
          },
        ],
      ])
    })
  })

  describe('Show caption on list option', () => {
    it('should render a single option list with caption', async () => {
      const wrapper = mountAttachingComponent(SbSelect, {
        props: {
          label: 'Choose an option',
          options: [...defaultOptionsWithCaptionData],
          showCaption: true,
          emitOption: true,
          modelValue: null,
        },
      })

      const innerElement = wrapper.find('.sb-select-inner')

      // turn the list visible
      await innerElement.trigger('click')

      const firstElement = wrapper.findAll('li')[0]

      // check if the first element on the list has the name and the caption
      expect(firstElement.text()).toBe('Option 1en/folder-text/us')

      // cliking on the first element of the list
      await firstElement.trigger('click')

      // check if the emit has the caption on the response
      expect(wrapper.emitted('update:modelValue')[0][0]).toEqual({
        label: 'Option 1',
        caption: 'en/folder-text/us',
        value: 1,
      })
    })

    it('should render a multi option list with caption', async () => {
      const wrapper = mountAttachingComponent(SbSelect, {
        props: {
          label: 'Choose an option',
          options: [...defaultOptionsWithCaptionData],
          showCaption: true,
          multi: true,
          emitOption: true,
          modelValue: null,
        },
      })

      const innerElement = wrapper.find('.sb-select-inner')

      // turn the list visible
      await innerElement.trigger('click')

      const firstElement = wrapper.findAll('li')[0]
      const secondElement = wrapper.findAll('li')[1]

      // check if the elements has the correct values
      expect(firstElement.text()).toBe('Option 1en/folder-text/us')

      expect(secondElement.text()).toBe('Option 2en/folder-text/us')

      // cliking on the two elements
      await firstElement.trigger('click')
      await secondElement.trigger('click')

      // check if the emit has the caption on the response
      expect(wrapper.emitted('update:modelValue')[0][0]).toEqual({
        label: 'Option 1',
        caption: 'en/folder-text/us',
        value: 1,
      })

      expect(wrapper.emitted('update:modelValue')[1][0]).toEqual({
        label: 'Option 2',
        caption: 'en/folder-text/us',
        value: 2,
      })
    })
  })

  describe('Show custom selection', () => {
    const wrapper = mountAttachingComponent(SbSelect, {
      props: {
        label: 'Choose an option',
        options: [...defaultSelectOptionsData],
        modelValue: [1, 2, 3],
        multiple: true,
      },
      slots: {
        selection: `
          <template #selection="{ item, remove }">
            <span class="custom-selection" @click="remove">
              label: {{ item.label }}, value: {{ item.value }}
            </span>
          </template>
        `,
      },
    })

    it('should render the selection slot for selected items', () => {
      const customSelectionItems = wrapper.findAll('.custom-selection')
      expect(customSelectionItems.length).toBe(3)
    })

    it('should pass the item in the scope', () => {
      const customSelection = wrapper.find('.custom-selection')
      expect(customSelection.text()).toBe('label: Option 1, value: 1')
    })

    it('should pass the remove function in the scope', async () => {
      const customSelection = wrapper.find('.custom-selection')
      await customSelection.trigger('click')
      expect(wrapper.emitted('update:modelValue')[0]).toEqual([[2, 3]])
    })
  })

  describe('Show custom list item', () => {
    const wrapper = mountAttachingComponent(SbSelect, {
      props: {
        label: 'Choose an option',
        options: [...defaultSelectOptionsData],
        modelValue: null,
      },
      slots: {
        'list-item': `
          <template #list-item="{ item }">
            <span class="custom-item">
              Custom: {{ item.label }}
            </span>
          </template>
        `,
      },
    })

    it('should render the list-item slot for each item', () => {
      const customItems = wrapper.findAll('.custom-item')
      expect(customItems.length).toBe(7)
    })

    it('should pass the item in the scope', () => {
      const customItem = wrapper.find('.custom-item')
      expect(customItem.text()).toBe('Custom: Option 1')
    })
  })
})
