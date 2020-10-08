import './menu.scss'

import { SbPopover } from '../Popover'
import SbButton from '../Button'
import SbIcon from '../Icon'

import { sharedProps } from '../Button/lib'
import { randomString } from '../../utils'

/**
 * @vue/component
 *
 * SbMenuItem is the item component for SbMenuList
 */
const SbMenuItem = {
  name: 'SbMenuItem',

  props: {
    icon: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: null
    }
  },

  render (h) {
    const renderIcon = () => {
      return h(SbIcon, {
        props: {
          name: this.icon,
          size: 'small'
        }
      })
    }

    const renderLabel = () => {
      const children = this.$slots.default[0] || {}

      const label = children.text || this.label

      return h('span', label)
    }

    const typeClass = this.type ? `sb-menu-item--${this.type}` : null

    return h('button', {
      staticClass: 'sb-menu-item',
      class: [typeClass],
      attrs: {
        role: 'menuitemradio'
      }
    }, [
      this.icon && renderIcon(),
      renderLabel()
    ])
  }
}

/**
 * @vue/component
 *
 * SbMenuSeparator is just a separator
 */
const SbMenuSeparator = {
  name: 'SbMenuSeparator',

  functional: true,

  render (h) {
    return h('hr', {
      staticClass: 'sb-menu-separator'
    })
  }
}

/**
 * @vue/component
 *
 * SbMenuGroup is a component to group SbMenuItems
 */
const SbMenuGroup = {
  name: 'SbMenuGroup',

  props: {
    title: {
      type: String,
      required: true
    }
  },

  render (h) {
    return h('div', {
      attrs: {
        role: 'group'
      }
    }, [
      h('p', {
        staticClass: 'sb-menu-group__title'
      }, this.title),
      ...this.$slots.default
    ])
  }
}

/**
 * @vue/component
 *
 * SbMenuList is a component to list SbMenuItems
 */
const SbMenuList = {
  name: 'SbMenuList',

  inject: ['$MenuContext'],

  props: {
    placement: {
      type: String,
      default: 'bottom-end'
    }
  },

  computed: {
    context () {
      return this.$MenuContext()
    },
    isOpen () {
      return this.context.isOpen
    }
  },

  watch: {
    isOpen (state) {
      if (state) {
        this.$refs.popover.show()
      } else {
        this.$refs.popover.hide()
      }
    }
  },

  render (h) {
    const { menuListId, menuButtonId } = this.context

    return h(SbPopover, {
      staticClass: 'sb-menu-list',

      props: {
        offset: [0, 5],
        placement: this.placement,
        reference: `#${menuListId}`
      },

      ref: 'popover'
    }, [
      h('div', {
        attrs: {
          role: 'menu',
          'aria-labelledby': menuButtonId
        }
      }, this.$slots.default)
    ])
  }
}

/**
 * @vue/component
 *
 * SbMenuButton is a button component to trigger the Dropdown
 */
const SbMenuButton = {
  name: 'SbMenuButton',

  inject: ['$MenuContext'],

  props: {
    // button shared props
    ...sharedProps,
    type: {
      type: String,
      default: 'ghost'
    },

    // only apply when uses the hasIconOnly property
    hasIconOnly: Boolean,
    isRounded: Boolean,

    // only apply when does not use the hasIconOnly property
    label: {
      type: String,
      default: null
    }
  },

  computed: {
    context () {
      return this.$MenuContext()
    },
    menuListId () {
      return this.context.menuListId
    }
  },

  render (h) {
    const { isOpen, toggleMenu } = this.context

    if (this.hasIconOnly) {
      return h(SbButton, {
        attrs: {
          ...this.$attrs,
          id: this.menuListId,
          'aria-controls': this.menuListId,
          'aria-haspopup': 'true',
          'aria-expanded': isOpen ? 'true' : null
        },
        props: {
          isRounded: this.isRounded,
          hasIconOnly: true,
          icon: 'overflow-menu-vertic',
          type: this.type
        },
        on: {
          ...this.$listeners,
          click: (event) => {
            this.$emit('click', event)

            toggleMenu()
          }
        }
      })
    }

    return h(SbButton, {
      attrs: {
        ...this.$attrs,
        id: this.menuListId,
        'aria-haspopup': 'true',
        'aria-expanded': isOpen ? 'true' : null
      },
      props: {
        iconRight: 'chevron-down',
        label: this.label,
        type: this.type
      },
      on: {
        ...this.$listeners,
        click: (event) => {
          this.$emit('click', event)

          toggleMenu()
        }
      }
    }, this.$slots.default)
  }
}

/**
 * @vue/component
 *
 * SbMenu is the Menu component that triggers with a button
 */
const SbMenu = {
  name: 'SbMenu',

  provide () {
    return {
      $MenuContext: () => this.MenuContext
    }
  },

  data: () => ({
    isOpen: false,
    menuListId: `sb-menu-list-${randomString(4)}`,
    menuButtonId: `sb-menu-button-${randomString(4)}`
  }),

  computed: {
    MenuContext () {
      return {
        isOpen: this.isOpen,
        menuListId: this.menuListId,
        closeMenu: this.closeMenu,
        openMenu: this.openMenu,
        toggleMenu: this.toggleMenu
      }
    }
  },

  methods: {
    /**
     * toggle menu state
     */
    closeMenu () {
      this.isOpen = false
    },

    /**
     * opens menu
     */
    openMenu () {
      this.isOpen = true
    },

    /**
     * toggle menu state
     */
    toggleMenu () {
      if (this.isOpen) {
        this.closeMenu()
      } else {
        this.openMenu()
      }
    }
  },

  render (h) {
    return h('div', {
      staticClass: 'sb-menu'
    }, this.$slots.default)
  }
}

export {
  SbMenu,
  SbMenuButton,
  SbMenuList,
  SbMenuSeparator,
  SbMenuGroup,
  SbMenuItem
}
