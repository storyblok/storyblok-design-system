import { mount } from '@vue/test-utils'
import { SbSidebar, SbSidebarLink } from '..'
import SbAvatar from '../../Avatar'
import { listItemsData, userData } from '../Sidebar.stories'

describe('Test SbSidebar component', () => {
  describe('when in default behavior', () => {
    const wrapper = mount(SbSidebar, {
      propsData: {
        user: { ...userData },
        listItems: [...listItemsData]
      },
      slots: {
        bottom: `
          <SbSidebarLink
            data-testid="bottom-link"
            href="#"
            icon="sidebar-report"
            label="Report a problem"
          />
        `
      },
      stubs: {
        SbSidebarLink: SbSidebarLink
      }
    })

    const avatarUser = wrapper.findComponent(SbAvatar)

    it('should have a navigation with the correct links', () => {
      expect(wrapper.find('[role="navigation"]').exists()).toBe(true)

      expect(
        wrapper.findAll('[role="navigation"] .sb-sidebar-link').length
      ).toBe(listItemsData.length)
    })

    it('should have a SbAvatar component with the correct properties', () => {
      expect(avatarUser.exists()).toBe(true)
      expect(avatarUser.props('name')).toBe(userData.name)
      expect(avatarUser.props('src')).toBe(userData.src)
    })

    it('should have the bottom link with correct props', () => {
      const bottomLink = wrapper.find('[data-testid="bottom-link"')

      expect(bottomLink.exists()).toBe(true)
      expect(bottomLink.text()).toBe('Report a problem')
      expect(bottomLink.attributes('href')).toBe('#')
    })

    it('should toggle dropdown when clicks on SbAvatar', async () => {
      await avatarUser.trigger('click')

      expect(
        wrapper.find('[data-testid="sidebar-user-dropdown"]').isVisible()
      ).toBe(true)

      await avatarUser.trigger('click')

      expect(
        wrapper.find('[data-testid="sidebar-user-dropdown"]').isVisible()
      ).toBe(true)
    })
  })

  describe('when in minimized state', () => {
    const wrapper = mount(SbSidebar, {
      propsData: {
        user: { ...userData },
        listItems: [...listItemsData],
        minimize: true
      },
      slots: {
        bottom: `
          <SbSidebarLink
            data-testid="bottom-link"
            href="#"
            icon="sidebar-report"
            label="Report a problem"
          />
        `
      },
      stubs: {
        SbSidebarLink: SbSidebarLink
      }
    })

    it('should have the --minimize class', () => {
      expect(wrapper.classes('sb-sidebar--minimize')).toBe(true)
    })
  })
})
