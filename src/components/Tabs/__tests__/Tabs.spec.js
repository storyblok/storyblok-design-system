import { mount } from '@vue/test-utils'
import { SbTabs, SbTab } from '..'

describe('Test SbTabs', () => {
  describe('when default behavior', () => {
    const onInput = vi.fn()
    const Wrapper = {
      components: {
        SbTabs,
        SbTab,
      },
      data: () => ({
        currentTab: 'first',
      }),
      methods: {
        onInput,
      },
      template: `
        <SbTabs v-model="currentTab" @input="onInput">
          <SbTab label="First" name="first" />
          <SbTab label="Second" name="second" />
          <SbTab label="Third" name="third" />
        </SbTabs>
      `,
    }

    const wrapper = mount(Wrapper)

    it('should have three SbTab components', () => {
      expect(wrapper.findAllComponents(SbTab).length).toBe(3)
    })

    it('should have a SbTab component active', () => {
      const tabActive = wrapper.findComponent('[aria-selected="true"]')

      expect(tabActive.exists()).toBe(true)
      expect(tabActive.props('label')).toBe('First')
      expect(tabActive.props('name')).toBe('first')
    })

    it('should emit an input event and change the select tab', async () => {
      const secondTab = wrapper.findAllComponents(SbTab)[1]

      secondTab.trigger('click')

      await wrapper.vm.$nextTick()

      expect(secondTab.emitted('activate-tab')).toEqual([['second']])

      const tabActive = wrapper.findComponent('[aria-selected="true"]')
      expect(tabActive.props('label')).toBe('Second')
      expect(tabActive.props('name')).toBe('second')
    })
  })

  describe('when use the showAddButton property', () => {
    const onInput = vi.fn()
    const onNewTab = vi.fn()

    const Wrapper = {
      components: {
        SbTabs,
        SbTab,
      },
      data: () => ({
        currentTab: 'first',
      }),
      methods: {
        onInput,
        onNewTab,
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
      `,
    }

    const wrapper = mount(Wrapper)

    // select the button to create the new tag
    const buttonComponent = wrapper.find(
      '[data-testid="new-tab-container"] button'
    )

    it('should exists the add button', () => {
      expect(buttonComponent.exists()).toBe(true)
    })

    it('should perform the create a new tab function', async () => {
      await buttonComponent.trigger('click')

      // like we have three tabs,
      // when we click the add button
      // we should have a fourth tab with 'New tab' inside a input
      const newTab = wrapper.findAllComponents(SbTab)[2]

      expect(newTab.exists()).toBe(true)

      const inputElement = wrapper.find('input')
      expect(inputElement.element.value).toBe('New tab')

      // defining a new value for this input
      await inputElement.setValue('New value from test')

      // and, when it triggers an enter
      await inputElement.trigger('keydown', {
        key: 'Enter',
      })

      // the SbTabs should emit a new-tab event with the correct data from input
      expect(onNewTab.mock.calls[0][0]).toEqual({
        label: 'New value from test',
        name: 'new-tab',
      })
    })

    it('should perform the cancel when try to create tab function', async () => {
      await buttonComponent.trigger('click')

      // like we have three tabs,
      // when we click the add button
      // we should have a fourth tab with 'New tab' inside a input
      const newTab = wrapper.findAllComponents(SbTab)[3]

      const inputElement = wrapper.find('input')
      expect(newTab.props('label')).toBe('New tab')

      // defining a new value for this input
      await inputElement.setValue('New value from test')

      // and, when it triggers an enter
      await inputElement.trigger('keydown', {
        key: 'Escape',
      })

      // the SbTabs should not emit the new-tab event
      // and the fourth tab still have the same label
      expect(newTab.props('label')).toBe('New tab')
    })
  })

  describe('when perform the navigation using arrows', () => {
    afterEach(() => {
      vi.clearAllMocks()
    })

    const onInput = vi.fn()
    const ComponentWrapper = {
      components: {
        SbTabs,
        SbTab,
      },
      data: () => ({
        currentTab: 'first',
        orientation: 'horizontal',
      }),
      methods: {
        onInput,
      },
      template: `
        <SbTabs
          v-model="currentTab"
          :orientation="orientation"
          @input="onInput"
        >
          <SbTab label="First" name="first" />
          <SbTab label="Second" name="second" />
        </SbTabs>
      `,
    }

    const wrapper = mount(ComponentWrapper)

    it('should move to right', async () => {
      let tabActive
      await wrapper.setData({
        currentTab: 'first',
      })
      const firstTab = wrapper.findComponent('[aria-selected="true"]')

      // it should move to second tab
      await firstTab.trigger('keydown', {
        key: 'ArrowRight',
      })

      await wrapper.vm.$nextTick()

      expect(firstTab.emitted()).toHaveProperty('keydown')

      tabActive = wrapper.findComponent('[aria-selected="true"]')
      expect(tabActive.props('name')).toBe('second')

      // it should move to first tab
      await tabActive.trigger('keydown', {
        key: 'ArrowRight',
      })

      await wrapper.vm.$nextTick()

      expect(firstTab.emitted()).toHaveProperty('keydown')

      tabActive = wrapper.findComponent('[aria-selected="true"]')
      expect(tabActive.props('name')).toBe('first')
    })

    it('should move to left', async () => {
      let tabActive
      await wrapper.setData({
        currentTab: 'first',
      })
      const firstTab = wrapper.findComponent('[aria-selected="true"]')

      // it should move to second tab
      await firstTab.trigger('keydown', {
        key: 'ArrowLeft',
      })

      await wrapper.vm.$nextTick()

      expect(firstTab.emitted()).toHaveProperty('keydown')

      tabActive = wrapper.findComponent('[aria-selected="true"]')
      expect(tabActive.props('name')).toBe('second')

      // it should move to first tab
      await tabActive.trigger('keydown', {
        key: 'ArrowLeft',
      })

      await wrapper.vm.$nextTick()

      expect(firstTab.emitted()).toHaveProperty('keydown')

      tabActive = wrapper.findComponent('[aria-selected="true"]')
      expect(tabActive.props('name')).toBe('first')
    })

    it('should move to up', async () => {
      let tabActive
      await wrapper.setData({
        currentTab: 'first',
        orientation: 'vertical',
      })
      const firstTab = wrapper.findComponent('[aria-selected="true"]')

      // it should move to second tab
      await firstTab.trigger('keydown', {
        key: 'ArrowUp',
      })

      await wrapper.vm.$nextTick()

      expect(firstTab.emitted()).toHaveProperty('keydown')

      tabActive = wrapper.findComponent('[aria-selected="true"]')
      expect(tabActive.props('name')).toBe('second')

      // it should move to first tab
      await tabActive.trigger('keydown', {
        key: 'ArrowUp',
      })

      await wrapper.vm.$nextTick()

      expect(tabActive.emitted()).toHaveProperty('keydown')

      tabActive = wrapper.findComponent('[aria-selected="true"]')
      expect(tabActive.props('name')).toBe('first')
    })

    it('should move to down', async () => {
      let tabActive
      await wrapper.setData({
        currentTab: 'first',
        orientation: 'vertical',
      })
      const firstTab = wrapper.findComponent('[aria-selected="true"]')

      // it should move to second tab
      await firstTab.trigger('keydown', {
        key: 'ArrowDown',
      })

      await wrapper.vm.$nextTick()

      expect(firstTab.emitted()).toHaveProperty('keydown')

      tabActive = wrapper.findComponent('[aria-selected="true"]')
      expect(tabActive.props('name')).toBe('second')

      // it should move to first tab
      await tabActive.trigger('keydown', {
        key: 'ArrowDown',
      })

      await wrapper.vm.$nextTick()

      expect(tabActive.emitted()).toHaveProperty('keydown')

      tabActive = wrapper.findComponent('[aria-selected="true"]')
      expect(tabActive.props('name')).toBe('first')
    })
  })

  describe('when perform the navigation Home and End keys', () => {
    afterEach(() => {
      vi.clearAllMocks()
    })

    const onInput = vi.fn()
    const ComponentWrapper = {
      components: {
        SbTabs,
        SbTab,
      },
      data: () => ({
        currentTab: 'first',
        orientation: 'horizontal',
      }),
      methods: {
        onInput,
      },
      template: `
        <SbTabs
          v-model="currentTab"
          :orientation="orientation"
          @input="onInput"
        >
          <SbTab label="First" name="first" />
          <SbTab label="Second" name="second" />
          <SbTab label="Third" name="third" />
        </SbTabs>
      `,
    }

    const wrapper = mount(ComponentWrapper)

    it('should move to first tab when it clicks in Home key', async () => {
      await wrapper.setData({
        currentTab: 'third',
      })
      const thirdTab = wrapper.findComponent('[aria-selected="true"]')

      // it should move to first tab
      await thirdTab.trigger('keydown', {
        key: 'Home',
      })

      await wrapper.vm.$nextTick()

      expect(thirdTab.emitted()).toHaveProperty('keydown')

      const tabActive = wrapper.findComponent('[aria-selected="true"]')
      expect(tabActive.props('name')).toBe('first')
    })

    it('should move to last tab when it clicks in End key', async () => {
      await wrapper.setData({
        currentTab: 'first',
      })
      const firstTab = wrapper.findComponent('[aria-selected="true"]')

      // it should move to first tab
      await firstTab.trigger('keydown', {
        key: 'End',
      })

      await wrapper.vm.$nextTick()

      expect(firstTab.emitted()).toHaveProperty('keydown')

      const tabActive = wrapper.findComponent('[aria-selected="true"]')
      expect(tabActive.props('name')).toBe('third')
    })
  })
})
