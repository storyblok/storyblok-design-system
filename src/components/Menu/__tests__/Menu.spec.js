import { factoryMountComponent } from '../utils'
import * as MenuComponents from '..'

describe('SbMenu component', () => {
  const onSelectOption = jest.fn()

  // @vue/component
  const Component = {
    components: {
      ...MenuComponents,
    },

    methods: {
      onSelectOption: onSelectOption,
    },

    template: `
      <div>
        <SbMenu>
          <SbMenuButton
            label="Combo button"
            data-testid="trigger-button"
          />

          <SbMenuList
            placement="bottom-start"
            data-testid="menu-list"
            :custom-class="'menu-list-options'"
          >
            <SbMenuGroup title="Actions">
              <SbMenuItem> Option 1 </SbMenuItem>
              <SbMenuItem @click="onSelectOption"> Option 2 </SbMenuItem>
            </SbMenuGroup>

            <SbMenuSeparator />

            <SbMenuGroup title="More">
              <SbMenuItem> Option 3 </SbMenuItem>

              <SbMenuItem type="negative"> Delete </SbMenuItem>
            </SbMenuGroup>
          </SbMenuList>
        </SbMenu>
      </div>
    `,
  }

  const wrapper = factoryMountComponent(Component)

  it('should perform show/hide in menu when click on button', async () => {
    const buttonComponent = wrapper.find('[data-testid="trigger-button"]')
    const menuListComponent = wrapper.find('[role="menu"]')

    // when clicks the button
    await buttonComponent.trigger('click')

    await wrapper.vm.$nextTick()

    // should menu is visible
    expect(menuListComponent.isVisible()).toBeTruthy()

    // when clicks the button again
    await buttonComponent.trigger('click')

    // should menu is not visible anymore
    expect(menuListComponent.isVisible()).toBeFalsy()
  })

  it('should perform the navigation using the arrow keys', async () => {
    const buttonComponent = wrapper.find('[data-testid="trigger-button"]')
    const menuListComponent = wrapper.find('[role="menu"]')

    // when press the ArrowUp key when the button is focused
    await buttonComponent.trigger('keydown', {
      key: 'ArrowUp',
    })

    await wrapper.vm.$nextTick()

    // should menu is visible
    expect(menuListComponent.isVisible()).toBeTruthy()

    // and should move the focus to the last item
    expect(wrapper.findAll('[role="menuitemradio"]')[3].element).toHaveFocus()

    // when continues press the ArrowUp key
    await menuListComponent.trigger('keydown', {
      key: 'ArrowUp',
    })

    await wrapper.vm.$nextTick()

    // should move the focus to the third item
    expect(wrapper.findAll('[role="menuitemradio"]')[2].element).toHaveFocus()

    // when press the ArrowDown key
    await menuListComponent.trigger('keydown', {
      key: 'ArrowDown',
    })

    await wrapper.vm.$nextTick()

    // should back the focus to the last item
    expect(wrapper.findAll('[role="menuitemradio"]')[3].element).toHaveFocus()

    // when press the Escape key
    await menuListComponent.trigger('keydown', {
      key: 'Escape',
    })

    await wrapper.vm.$nextTick()

    // should close the menu
    expect(menuListComponent.isVisible()).toBeFalsy()

    // and back to focus to button
    expect(buttonComponent.element).toHaveFocus()

    // when press the ArrowDown key when the button is focused
    await buttonComponent.trigger('keydown', {
      key: 'ArrowDown',
    })

    await wrapper.vm.$nextTick()

    // should menu is visible
    expect(menuListComponent.isVisible()).toBeTruthy()

    // and should move the focus to the first item
    expect(wrapper.findAll('[role="menuitemradio"]')[0].element).toHaveFocus()

    await menuListComponent.trigger('keydown', {
      key: 'Escape',
    })

    // when press the Escape key
    await menuListComponent.trigger('keydown', {
      key: 'Escape',
    })

    await wrapper.vm.$nextTick()

    // should close the menu
    expect(menuListComponent.isVisible()).toBeFalsy()

    // and back to focus to button
    expect(buttonComponent.element).toHaveFocus()
  })

  it('should perform the navigation using the Home and End keys', async () => {
    const buttonComponent = wrapper.find('[data-testid="trigger-button"]')
    const menuListComponent = wrapper.find('[role="menu"]')

    // when clicks on the button
    await buttonComponent.trigger('click')

    await wrapper.vm.$nextTick()

    // should open the menu
    expect(menuListComponent.isVisible()).toBeTruthy()

    // when press the End key
    await menuListComponent.trigger('keydown', {
      key: 'End',
    })

    await wrapper.vm.$nextTick()

    // should move the focus to the last item
    expect(wrapper.findAll('[role="menuitemradio"]')[3].element).toHaveFocus()

    // when press the Home key
    await menuListComponent.trigger('keydown', {
      key: 'Home',
    })

    await wrapper.vm.$nextTick()

    // should move the focus to the first item
    expect(wrapper.findAll('[role="menuitemradio"]')[0].element).toHaveFocus()

    // when press the Escape key
    await menuListComponent.trigger('keydown', {
      key: 'Escape',
    })

    await wrapper.vm.$nextTick()

    // should close the menu
    expect(menuListComponent.isVisible()).toBeFalsy()

    // and back to focus to button
    expect(buttonComponent.element).toHaveFocus()
  })

  it('should close the menu when clicks on item', async () => {
    const buttonComponent = wrapper.find('[data-testid="trigger-button"]')
    const menuListComponent = wrapper.find('[role="menu"]')

    // when clicks the button
    await buttonComponent.trigger('click')

    await wrapper.vm.$nextTick()

    // should menu is visible
    expect(menuListComponent.isVisible()).toBeTruthy()

    // when select a specific item
    await wrapper.findAll('[role="menuitemradio"]')[1].trigger('click')

    // the clicks should be triggered
    expect(onSelectOption).toHaveBeenCalled()

    // and the menu should be closed
    expect(menuListComponent.isVisible()).toBeFalsy()

    // and the focus should be move to the button
    expect(buttonComponent.element).toHaveFocus()
  })

  it('should exist the custom class', async () => {
    const menuListComponent = wrapper.find('[role="menu"]')

    expect(menuListComponent.classes('menu-list-options')).toBe(true)
  })
})
