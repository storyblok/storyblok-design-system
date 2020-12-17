import { mount } from '@vue/test-utils'
import { SbSidebar, SbSidebarListItem } from '..'
import SbButton from '../../Button'
import { listItemsData, userData } from '../Sidebar.stories'

describe('Test SbSidebar component', () => {
  describe('when in default behavior', () => {
    const wrapper = mount(SbSidebar, {
      propsData: {
        user: { ...userData },
        listItems: [...listItemsData],
      },
      slots: {
        bottom: `
          <SbSidebarListItem
            data-testid="bottom-link"
            href="#"
            icon="sidebar-report"
            label="Report a problem"
          />
        `,
      },
      stubs: {
        SbSidebarListItem: SbSidebarListItem,
        SbButton: true,
      },
    })

    it('should have a navigation with the correct links', () => {
      expect(wrapper.find('[role="navigation"]').exists()).toBe(true)

      expect(
        wrapper.findAll('[role="navigation"] .sb-sidebar-link').length
      ).toBe(listItemsData.length)
    })

    it('should have the bottom link with correct props', () => {
      const bottomLink = wrapper.find('[data-testid="bottom-link"]')

      expect(bottomLink.exists()).toBe(true)
      expect(bottomLink.text()).toBe('Report a problem')
      expect(bottomLink.attributes('href')).toBe('#')
    })
  })

  describe('when in minimized state', () => {
    const wrapper = mount(SbSidebar, {
      propsData: {
        user: { ...userData },
        listItems: [...listItemsData],
        minimize: true,
      },
      slots: {
        bottom: `
          <SbSidebarListItem
            data-testid="bottom-link"
            href="#"
            icon="sidebar-report"
            label="Report a problem"
          />
        `,
      },
      stubs: {
        SbSidebarListItem: SbSidebarListItem,
        SbButton: SbButton,
        SbFragment: true,
        MountingPortal: true,
      },
    })

    it('should have the --minimize class', () => {
      expect(wrapper.classes('sb-sidebar--minimize')).toBe(true)
    })

    it('should have a SbButton to collapse the Sidebar and a SbTooltip with Collapse and Expand Sidebar messages', async () => {
      const button = wrapper.findComponent(SbButton)

      const tooltip = wrapper.find('.sb-tooltip')

      expect(button.exists()).toBe(true)
      expect(tooltip.exists()).toBe(true)

      button.vm.$emit('click')

      expect(wrapper.emitted('update:minimize')).toBeTruthy()
      expect(wrapper.emitted('update:minimize')).toEqual([[false]])
      expect(tooltip.text()).toBe('Expand Sidebar')

      await wrapper.setProps({
        minimize: false,
      })

      button.vm.$emit('click')

      expect(wrapper.emitted('update:minimize')).toEqual([[false], [true]])
      expect(tooltip.text()).toBe('Collapse Sidebar')
    })
  })
})
