import { mount } from '@vue/test-utils'

import { waitMs } from '../../../utils/tests-utils'
import { SbMinibrowser } from '..'
import { browserOptionsData } from '../Minibrowser.stories.js'

describe('SbMinibrowser component', () => {
  const itemClass = '.sb-minibrowser__list-item-name'

  it('should perform the correct navigation', async () => {
    const wrapper = mount(SbMinibrowser, {
      propsData: {
        options: [...browserOptionsData]
      }
    })

    // PROCESS FOR FIRST LEVEL
    const firstElement = wrapper.findAll(itemClass).at(0)

    expect(firstElement.text()).toBe('Landing Page')

    await firstElement.trigger('click')

    // getting the first parameter from first execution
    const result = wrapper.emitted('navigate')[0][0]
    expect(result.label).toEqual('Landing Page')

    // PROCESS FOR SECOND LEVEL
    const newFirstElement = wrapper.findAll(itemClass).at(0)
    expect(newFirstElement.text()).toBe('PPC')

    await newFirstElement.trigger('click')

    // getting the first parameter from second execution
    const newResult = wrapper.emitted('navigate')[1][0]
    expect(newResult.label).toBe('PPC')

    // PROCESS FOR THIRD LEVEL
    // checking if, in the third level, we have the correct item in the first position
    const thirdElement = wrapper.findAll(itemClass).at(0)
    expect(thirdElement.text()).toBe('e-commerce')
  })

  it('should filter the items by using the search input', async () => {
    const wrapper = mount(SbMinibrowser, {
      propsData: {
        options: [...browserOptionsData]
      }
    })

    await wrapper
      .find('input[type="search"]')
      .setValue('Jobs')

    await wrapper.vm.$nextTick()

    await waitMs(300)

    expect(wrapper.vm.searchInput).toBe('Jobs')

    expect(wrapper.find(itemClass).text()).toBe('Jobs')
  })

  it('should show a not found message', async () => {
    const wrapper = mount(SbMinibrowser, {
      propsData: {
        options: [...browserOptionsData]
      }
    })

    await wrapper
      .find('input[type="search"]')
      .setValue('foobar')

    await wrapper.vm.$nextTick()

    expect(
      wrapper.find('.sb-minibrowser__not-found').text()
    ).toBe('No matches for "foobar"')
  })

  it('should clear the input element when clicks on Escape key', async () => {
    const wrapper = mount(SbMinibrowser, {
      propsData: {
        options: [...browserOptionsData]
      }
    })

    const searchInput = wrapper.find('input[type="search"]')

    searchInput.setValue('foobar')

    expect(wrapper.vm.searchInput).toBe('foobar')

    searchInput.element.focus()

    await searchInput.trigger('keydown', {
      key: 'Escape'
    })

    expect(wrapper.find(itemClass).text()).toBe('Landing Page')

    expect(wrapper.vm.searchInput).toBe('')
  })

  it('should execute the lazyLoadMethod function properly', async () => {
    const lazyLoadMethod = jest.fn((_, resolve) => {
      resolve([
        {
          label: 'Test Lazy 1'
        }
      ])
    })

    const wrapper = mount(SbMinibrowser, {
      propsData: {
        options: [...browserOptionsData],
        lazyLoadMethod
      }
    })

    await wrapper.findAll(itemClass).at(0).trigger('click')

    expect(lazyLoadMethod).toHaveBeenCalled()

    const execution = lazyLoadMethod.mock.calls[0]

    expect(execution[0].label).toBe('Landing Page')

    expect(wrapper.findAll(itemClass).at(0).text()).toBe('Test Lazy 1')
  })
})
