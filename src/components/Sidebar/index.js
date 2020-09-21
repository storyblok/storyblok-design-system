// assets
import './sidebar.scss'

import {
  SbSidebarList,
  SbSidebarLogo,
  SbSidebarUser,
  SbSidebarLink
} from './components'

/**
 * SbSidebar component
 *
 * Render a Sidebar container, that's a part of Storyblok UI structure
 */
const SbSidebar = {
  name: 'SbSidebar',

  props: {
    listItems: {
      type: Array,
      default: () => []
    },
    user: {
      type: Object
    }
  },

  render (h) {
    const renderSidebarTop = () => {
      return h('div', {
        staticClass: 'sb-sidebar__top'
      }, [
        h(SbSidebarLogo),
        h(SbSidebarUser, {
          props: {
            ...this.user || {}
          }
        })
      ])
    }

    const renderList = () => {
      const children = this.listItems.map(listItem => {
        return h('li', {
          staticClass: 'sb-sidebar-item',
          class: {
            'sb-sidebar-item--active': listItem.active
          },
          attrs: {
            'aria-label': listItem.ariaLabel
          }
        }, [
          h(SbSidebarLink, {
            props: {
              ...listItem
            }
          })
        ])
      })

      return h(SbSidebarList, children)
    }

    const renderSidebarBottom = () => {
      return h('div', {
        staticClass: 'sb-sidebar__bottom'
      }, [
        this.$slots.bottom
      ])
    }

    return h('aside', {
      staticClass: 'sb-sidebar'
    }, [
      renderSidebarTop(),

      renderList(),

      renderSidebarBottom()
    ])
  }
}

export {
  SbSidebar,
  SbSidebarLink
}
