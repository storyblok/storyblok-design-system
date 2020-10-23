import { factoryMountComponent } from '../utils'

import { SbMenu, SbMenuButton } from '..'

describe('SbMenuButton component', () => {
  it('should perform toggle menu open state', async () => {
    const onClick = jest.fn()
    // @vue/component
    const wrapperComponent = {
      components: {
        SbMenu,
        SbMenuButton
      },

      data: () => ({
        isOpen: false
      }),

      methods: {
        onClick: onClick
      },

      template: `
        <SbMenu v-model="isOpen">
          <SbMenuButton label="Combo button" @click="onClick" />
        </SbMenu>
      `
    }

    const wrapper = factoryMountComponent(wrapperComponent)

    expect(wrapper.text()).toBe('Combo button')

    // when the SbMenuButton is mounted
    // we need just one element
    const buttonComponent = wrapper.find('[aria-haspopup="true"]')
    expect(buttonComponent.attributes('aria-expanded')).toBeUndefined()

    // when the button triggers
    await buttonComponent.trigger('click')

    expect(onClick).toHaveBeenCalled()

    await buttonComponent.vm.$nextTick()

    // states related when the to menu is opened
    expect(wrapper.vm.isOpen).toBeTruthy()
    expect(buttonComponent.attributes('aria-expanded')).toBe('true')

    // when the button triggers again
    await buttonComponent.trigger('click')

    await buttonComponent.vm.$nextTick()

    // should return to previous state
    expect(wrapper.vm.isOpen).toBeFalsy()
    expect(buttonComponent.attributes('aria-expanded')).toBeUndefined()
  })

  it('should render one buttons with hasIconOnly property', async () => {
    const onClick = jest.fn()
    // @vue/component
    const wrapperComponent = {
      components: {
        SbMenu,
        SbMenuButton
      },

      methods: {
        onClick: onClick
      },

      template: `
        <SbMenu>
          <SbMenuButton has-icon-only @click="onClick" />
        </SbMenu>
      `
    }

    const wrapper = factoryMountComponent(wrapperComponent)

    expect(wrapper.text()).toBe('')

    const buttonComponent = wrapper.find('[aria-haspopup="true"]')

    // when the SbMenuButton is mounted
    // we need just one element
    expect(buttonComponent.attributes('aria-expanded')).toBeUndefined()

    // when the button triggers
    await buttonComponent.trigger('click')

    expect(onClick).toHaveBeenCalled()

    await buttonComponent.vm.$nextTick()

    // states related when the to menu is opened
    expect(buttonComponent.attributes('aria-expanded')).toBe('true')

    // when the button triggers again
    await buttonComponent.trigger('click')

    await buttonComponent.vm.$nextTick()

    // should return to previous state
    expect(buttonComponent.attributes('aria-expanded')).toBeUndefined()
  })
})
