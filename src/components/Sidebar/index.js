// assets
import './sidebar.scss'

import {
  SbSidebarList,
  SbSidebarLogo,
  SbSidebarUser,
  SbSidebarLink
} from './components'

import SbButton from '../Button'
import SbTooltip from '../Tooltip'

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
    },
    minimize: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    toggleMinimizedState () {
      this.$emit('update:minimize', !this.minimize)
    }
  },

  render (h) {
    const renderSidebarTop = () => {
      return h('div', {
        staticClass: 'sb-sidebar__top'
      }, [
        h(SbSidebarLogo, {
          props: {
            minimize: this.minimize
          }
        }),
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
        this.$slots.bottom,
        h(SbTooltip, {
          props: {
            label: this.minimize ? 'Expand Sidebar' : 'Collapse Sidebar',
            position: 'right'
          }
        }, [
          h(SbButton, {
            props: {
              icon: this.minimize ? 'chevron-right' : 'chevron-left',
              size: 'small',
              hasIconOnly: true,
              isRounded: true
            },
            on: {
              click: this.toggleMinimizedState
            }
          })
        ])
      ])
    }

    return h('aside', {
      staticClass: 'sb-sidebar',
      class: {
        'sb-sidebar--minimize': this.minimize
      }
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
