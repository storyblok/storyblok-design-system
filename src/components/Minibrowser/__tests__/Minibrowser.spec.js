import { mount } from '@vue/test-utils'

import { waitMs } from '../../../utils/tests-utils'
import { SbMinibrowser, SbMinibrowserList, SbMinibrowserListHeader } from '..'
import { WithGroupsSlot, MOCK_DATA } from '../Minibrowser.stories.js'

import SbIcon from '../../Icon'

describe('SbMinibrowser component', () => {
  const itemClass = '.sb-minibrowser__list-item-name'
  const breadcrumbClass = '.sb-breadcrumbs__item'

  it('should perform the correct navigation', async () => {
    const wrapper = mount(SbMinibrowser, {
      props: {
        breadcrumbs: [],
        options: [...MOCK_DATA.FIRST_LEVEL],
      },
      global: {
        stubs: {
          SbIcon,
        },
      },
    })

    // PROCESS FOR FIRST LEVEL
    const firstElement = wrapper.findAll(itemClass)[0]

    expect(firstElement.text()).toBe('Landing Page')

    await firstElement.trigger('click')
    await wrapper.vm.$nextTick()

    // getting the first parameter from first execution
    const result = wrapper.emitted('select-item')[0][0]
    expect(result.label).toBe('Landing Page')
    expect(result.value).toBe('1.0')

    await wrapper.setProps({
      breadcrumbs: [{ label: 'Landing Page' }],
      options: [...MOCK_DATA.SECOND_LEVEL],
    })

    // PROCESS FOR SECOND LEVEL
    const newFirstElement = wrapper.findAll(itemClass)[0]
    expect(newFirstElement.text()).toBe('PPC')

    await newFirstElement.trigger('click')

    // getting the first parameter from second execution
    const newResult = wrapper.emitted('select-item')[1][0]
    expect(newResult.label).toBe('PPC')
    expect(newResult.value).toBe('2.0')

    await wrapper.setProps({
      breadcrumbs: [{ label: 'Landing Page' }, { label: 'PPC' }],
      options: [...MOCK_DATA.THIRD_LEVEL],
    })

    // PROCESS FOR THIRD LEVEL
    // checking if, in the third level, we have the correct item in the first position
    const thirdElement = wrapper.findAll(itemClass)[0]
    expect(thirdElement.text()).toBe('e-commerce')

    // checking the breadcrumbs
    const breadcrumbsWrapper = wrapper.findAll(breadcrumbClass)
    const globalBreadcrumb = breadcrumbsWrapper[0]
    const globalBreadcrumbIcon = globalBreadcrumb.findComponent(SbIcon)

    expect(globalBreadcrumbIcon.exists()).toBe(true)
    expect(globalBreadcrumbIcon.props('name')).toBe('home')

    await globalBreadcrumb.find('a').trigger('click')
    expect(wrapper.emitted('clear-navigation')).toBeTruthy()

    const landingPageBreadcrumb = breadcrumbsWrapper[1]
    expect(landingPageBreadcrumb.text()).toBe('Landing Page')

    // when clicking in the Landing Page breadcrumbs,
    // it should emit the 0 index
    await landingPageBreadcrumb.find('a').trigger('click')
    expect(wrapper.emitted('navigate')[0]).toEqual([0])

    const ppcBreadcrumb = breadcrumbsWrapper[2]
    expect(ppcBreadcrumb.text()).toBe('PPC')

    expect(breadcrumbsWrapper.length).toBe(3)
  })

  it('should filter the items by using the search input', async () => {
    const wrapper = mount(SbMinibrowser, {
      props: {
        options: [...MOCK_DATA.FIRST_LEVEL],
      },
    })

    await wrapper.find('input[type="search"]').setValue('Jobs')

    await wrapper.vm.$nextTick()

    await waitMs(300)

    expect(wrapper.emitted('filter')[0]).toEqual([
      {
        value: 'Jobs',
      },
    ])
  })

  it('should emit the single selected element when press enter in the search input', async () => {
    const wrapper = mount(SbMinibrowser, {
      props: {
        options: [...MOCK_DATA.FIRST_LEVEL],
      },
    })

    const jobsItem = {
      label: 'Jobs',
      subtitle: 'jobs',
      value: '1.2',
    }

    const searchInput = wrapper.find('input[type="search"]')

    await searchInput.setValue('Jobs')

    await wrapper.vm.$nextTick()

    await waitMs(300)

    await wrapper.setProps({
      options: [jobsItem],
    })

    await searchInput.trigger('keydown', {
      key: 'Enter',
    })

    expect(wrapper.emitted('select-item')[0]).toEqual([jobsItem])
  })

  it('should do not emit the single selected element when press enter in the search input if the preventEnterOnSearch is true', async () => {
    const wrapper = mount(SbMinibrowser, {
      props: {
        options: [...MOCK_DATA.FIRST_LEVEL],
        preventEnterOnSearch: true,
      },
    })

    const jobsItem = {
      label: 'Jobs',
      subtitle: 'jobs',
      value: '1.2',
    }

    const searchInput = wrapper.find('input[type="search"]')

    await searchInput.setValue('Jobs')

    await wrapper.vm.$nextTick()

    await waitMs(300)

    await wrapper.setProps({
      options: [jobsItem],
    })

    await searchInput.trigger('keydown', {
      key: 'Enter',
    })

    expect(wrapper.emitted('select-item')).toBeUndefined()
  })

  it('should clear the search input when an item is clicked', async () => {
    const wrapper = mount(SbMinibrowser, {
      props: {
        options: [...MOCK_DATA.FIRST_LEVEL],
        clearOnSelect: true,
      },
    })

    const searchInput = await wrapper.find('input[type="search"]')
    searchInput.setValue('case')

    const firstElement = wrapper.findAll(itemClass)[3]
    await firstElement.trigger('click')

    wrapper.vm.selectItem(MOCK_DATA.FIRST_LEVEL[0])
    expect(wrapper.vm.searchInput).toBe('')
  })

  it('should keep the value of the search input when an item is clicked', async () => {
    const wrapper = mount(SbMinibrowser, {
      props: {
        options: [...MOCK_DATA.SECOND_LEVEL],
        clearOnSelect: false,
      },
    })

    const searchInput = await wrapper.find('input[type="search"]')
    searchInput.setValue('case')

    const firstElement = wrapper.findAll(itemClass)[3]
    await firstElement.trigger('click')

    wrapper.vm.selectItem(MOCK_DATA.SECOND_LEVEL[1])
    expect(wrapper.vm.searchInput).toBe('case')
  })

  it('should clear the search input when the item clicked is a folder', async () => {
    const wrapper = mount(SbMinibrowser, {
      props: {
        options: [...MOCK_DATA.SECOND_LEVEL],
        clearOnSelect: false,
      },
    })

    const searchInput = await wrapper.find('input[type="search"]')
    searchInput.setValue('case')

    const firstElement = wrapper.findAll(itemClass)[1]
    await firstElement.trigger('click')

    wrapper.vm.selectItem(MOCK_DATA.SECOND_LEVEL[0])
    expect(wrapper.vm.searchInput).toBe('')
  })

  it('should show a not found message', async () => {
    const wrapper = mount(SbMinibrowser, {
      props: {
        options: [],
      },
    })

    await wrapper.find('input[type="search"]').setValue('foobar')

    await wrapper.vm.$nextTick()

    expect(wrapper.find('.sb-minibrowser__not-found').text()).toBe(
      'No matches for "foobar"',
    )
  })

  it('should clear the input element when clicks on Escape key', async () => {
    const wrapper = mount(SbMinibrowser, {
      props: {
        options: [...MOCK_DATA.FIRST_LEVEL],
      },
    })

    const searchInput = wrapper.find('input[type="search"]')

    searchInput.setValue('foobar')

    searchInput.trigger('focus')

    await wrapper.vm.$nextTick()

    await searchInput.trigger('keydown', {
      key: 'Escape',
    })

    expect(wrapper.find(itemClass).text()).toBe('Landing Page')

    expect(wrapper.vm.searchInput).toBe('')
  })

  describe('using slots', () => {
    let wrapper = null
    const onSelectItem = vi.fn()
    const onClick = vi.fn()

    beforeAll(() => {
      wrapper = mount({
        components: {
          SbMinibrowser,
          SbMinibrowserList,
          SbMinibrowserListHeader,
        },

        data: () => ({
          options: [...WithGroupsSlot.args.options],
        }),

        methods: {
          onSelectItem,
          onClick,
        },

        template: `
          <SbMinibrowser
            :options="options"
            @select-item="onSelectItem"
          >
            <template v-slot:list="slotProps">
              <SbMinibrowserList v-bind="slotProps">
                <template v-if="slotProps.title" v-slot:header="{ title }">
                  <SbMinibrowserListHeader :title="title">
                    <template v-slot:right>
                      <button data-testid="test-button" @click="onClick"> Test button </button>
                    </template>
                  </SbMinibrowserListHeader>
                </template>
              </SbMinibrowserList>
            </template>
          </SbMinibrowser>
        `,
      })
    })

    it('should render a content inside the slots', () => {
      expect(wrapper.findAll('[data-testid="test-button"]').length).toBe(2)
    })

    it('should execute the onClick from the button inside the slot', async () => {
      await wrapper.findAll('[data-testid="test-button"]')[0].trigger('click')

      expect(onClick).toHaveBeenCalled()
    })

    it('should execute the onSelectItem from a list item', async () => {
      // get the item with name "Case Studies" (the first os the second group)
      const firstElement = wrapper.findAll(itemClass)[3]

      await firstElement.trigger('click')

      // get the first argument from the first call
      const item = onSelectItem.mock.calls[0][0]

      expect(onSelectItem).toHaveBeenCalled()
      expect(item.label).toBe('Case Studies')
    })
  })
})
