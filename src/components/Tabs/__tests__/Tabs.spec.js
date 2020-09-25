import { mount } from '@vue/test-utils'
import { SbTabs, SbTab } from '..'

describe('Test SbTabs', () => {
  describe('when default behavior', () => {
    const onInput = jest.fn()
    const Wrapper = {
      components: {
        SbTabs,
        SbTab
      },
      data: () => ({
        currentTab: 'first'
      }),
      methods: {
        onInput
      },
      template: `
        <SbTabs v-model="currentTab" @input="onInput">
          <SbTab label="First" name="first" />
          <SbTab label="Second" name="second" />
          <SbTab label="Third" name="third" />
        </SbTabs>
      `
    }

    const wrapper = mount(Wrapper)

    it('should have three SbTab components', () => {
      expect(wrapper.findAllComponents(SbTab).length).toBe(3)
    })

    it('should have a SbTab component active', () => {
      const tabActive = wrapper.find('[aria-selected="true"]')

      expect(tabActive.exists()).toBe(true)
      expect(tabActive.props('label')).toBe('First')
      expect(tabActive.props('name')).toBe('first')
    })

    it('should emit an input event and change the select tab', async () => {
      const secondTab = wrapper.findAllComponents(SbTab).at(1)

      secondTab.trigger('click')

      await wrapper.vm.$nextTick()

      expect(Wrapper.methods.onInput.mock.calls).toEqual([['second']])

      const tabActive = wrapper.find('[aria-selected="true"]')
      expect(tabActive.props('label')).toBe('Second')
      expect(tabActive.props('name')).toBe('second')
    })
  })

  describe('when use the showAddButton property', () => {
    const onInput = jest.fn()
    const onNewTab = jest.fn()

    const Wrapper = {
      components: {
        SbTabs,
        SbTab
      },
      data: () => ({
        currentTab: 'first'
      }),
      methods: {
        onInput,
        onNewTab
      },
      template: `
        <SbTabs
          show-add-button
          v-model="currentTab"
          @input="onInput"
          @new-tab="onNewTab"
        >
          <SbTab label="First" name="first" />
          <SbTab label="Second" name="second" />
          <SbTab label="Third" name="third" />
        </SbTabs>
      `
    }

    const wrapper = mount(Wrapper)

    // select the button to create the new tag
    const buttonComponent = wrapper.find('[data-testid="new-tab-container"] button')

    it('should exists the add button', () => {
      expect(buttonComponent.exists()).toBe(true)
    })

    it('should perform the create a new tab function', async () => {
      await buttonComponent.trigger('click')

      // like we have three tabs,
      // when we click the add button
      // we should have a fourth tab with 'New tab' inside a input
      const newTab = wrapper.findAllComponents(SbTab).at(3)

      expect(newTab.exists()).toBe(true)

      const inputElement = newTab.find('input')
      expect(inputElement.element.value).toBe('New tab')

      // defining a new value for this input
      await inputElement.setValue('New value from test')

      // and, when it triggers an enter
      await inputElement.trigger('keydown', {
        key: 'Enter'
      })

      // the SbTabs should emit a new-tab event with the correct data from input
      expect(onNewTab.mock.calls[0][0]).toEqual({
        label: 'New value from test',
        name: 'new-tab'
      })
    })

    it('should perform the cancel when try to create tab function', async () => {
      await buttonComponent.trigger('click')

      // like we have three tabs,
      // when we click the add button
      // we should have a fourth tab with 'New tab' inside a input
      const newTab = wrapper.findAllComponents(SbTab).at(3)

      const inputElement = newTab.find('input')

      expect(newTab.props('label')).toBe('New tab')

      // defining a new value for this input
      await inputElement.setValue('New value from test')

      // and, when it triggers an enter
      await inputElement.trigger('keydown', {
        key: 'Escape'
      })

      // the SbTabs should not emit the new-tab event
      // and the fourth tab still have the same label
      expect(newTab.props('label')).toBe('New tab')
    })
  })
})
