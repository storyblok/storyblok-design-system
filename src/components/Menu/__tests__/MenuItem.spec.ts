import { factoryMountComponent } from '../utils'
import { waitMs } from '@utils/tests-utils'

import * as MenuComponents from '..'
import SbIcon from '../../Icon'

describe('SbMenuItem component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const onSelectOptionFirst = vi.fn()
  const onSelectOptionSecond = vi.fn()

  // @vue/component
  const Component = {
    components: {
      ...MenuComponents,
    },

    data: () => ({
      isOpen: true,
    }),

    methods: {
      onSelectOptionFirst: onSelectOptionFirst,
      onSelectOptionSecond: onSelectOptionSecond,
    },

    template: `
      <div>
        <SbMenu v-model="isOpen">
          <SbMenuButton
            label="Combo button"
            data-testid="trigger-button"
          />

          <SbMenuList
            placement="bottom-start"
            data-testid="menu-list"
          >
            <SbMenuItem @click="onSelectOptionFirst"> Option 1 </SbMenuItem>
            <SbMenuItem @click="onSelectOptionSecond" is-disabled> Option 2 </SbMenuItem>
            <SbMenuItem icon="plus"> Option 3 </SbMenuItem>
          </SbMenuList>
        </SbMenu>
      </div>
    `,
  }

  const wrapper = factoryMountComponent(Component)

  it('should have a SbIcon when use the icon property', async () => {
    // get the third element
    const itemComponent = wrapper.findAll('[role="menuitemradio"]')[2]

    expect(itemComponent.findComponent(SbIcon).exists()).toBe(true)
  })

  it('should have the correct text', async () => {
    expect(wrapper.findAll('[role="menuitemradio"]')[0].text()).toBe('Option 1')
  })

  it('should not emit the click event when is disabled', async () => {
    const itemComponent = wrapper.findAllComponents('[role="menuitemradio"]')[1]

    // check if the element has the isDisabled property marked as true
    expect(itemComponent.props('isDisabled')).toBe(true)

    // when try to click in a disabled button
    await itemComponent.trigger('click')

    // should not emit the click event
    expect(onSelectOptionFirst).not.toHaveBeenCalled()

    // and should not close the menu
    await waitMs()
    expect(wrapper.vm.isOpen).toBe(true)

    // when try to press the Enter key in a disabled button
    await itemComponent.trigger('keydown', {
      keydown: 'Enter',
    })

    // should not emit the click event
    expect(onSelectOptionFirst).not.toHaveBeenCalled()

    // when try to press the Space key in a disabled button
    await itemComponent.trigger('keydown', {
      keydown: 'Space',
    })

    // should not emit the click event
    expect(onSelectOptionFirst).not.toHaveBeenCalled()

    // and should not close the menu
    await waitMs()
    expect(wrapper.vm.isOpen).toBe(true)
  })

  it('should emit the click event when press Enter and Space keys', async () => {
    const itemComponent = wrapper.findAllComponents('[role="menuitemradio"]')[0]

    // check if the element has the isDisabled property marked as false
    expect(itemComponent.props('isDisabled')).toBe(false)

    // when try to press the Enter key
    await itemComponent.trigger('keydown', {
      key: 'Enter',
    })

    // should emit the click event
    expect(onSelectOptionFirst).toHaveBeenCalled()

    // and should close the menu
    expect(wrapper.vm.isOpen).toBe(false)

    // changing the state to menu open
    await wrapper.setData({
      isOpen: true,
    })

    // when try to press the Space key
    await itemComponent.trigger('keydown', {
      key: ' ',
    })

    // should emit the click event
    expect(onSelectOptionFirst).toHaveBeenCalled()

    // and should close the menu
    expect(wrapper.vm.isOpen).toBe(false)
  })

  it('should render a link when pass a tag `a` in the prop', async () => {
    const MenuComponent = {
      components: {
        ...MenuComponents,
      },

      data: () => ({
        isOpen: true,
      }),

      methods: {
        onSelectOptionFirst: onSelectOptionFirst,
        onSelectOptionSecond: onSelectOptionSecond,
      },

      template: `
      <div>
        <SbMenu v-model="isOpen">
          <SbMenuButton
            label="Combo button"
          />

          <SbMenuList
            placement="bottom-start"
          >
            <SbMenuItem as="a" href="https://storyblok.com"> Go for Storyblok </SbMenuItem>
          </SbMenuList>
        </SbMenu>
      </div>
    `,
    }

    const menuWrapper = factoryMountComponent(MenuComponent)
    const link = menuWrapper.find('a')

    expect(link.exists()).toBe(true)
    expect(link.attributes('href')).toBe('https://storyblok.com')
    expect(link.attributes('class')).toBe('sb-menu-item sb-menu-item--is-link')
  })
})
