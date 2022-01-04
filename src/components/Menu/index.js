import './menu.scss'

import { SbPopover } from '../Popover'
import SbButton from '../Button'
import SbIcon from '../Icon'

import { sharedProps } from '../Button/lib'
import {
  randomString,
  getFocusableElements,
  canUseDOM,
  isVueComponent,
} from '../../utils'

/**
 * @vue/component
 *
 * SbMenuItem is the item component for SbMenuList
 * This component implements the navigation using keyboard like specified in W3C documentation about WAI-ARIA practices: https://www.w3.org/TR/wai-aria-practices/#menu
 */
const SbMenuItem = {
  name: 'SbMenuItem',

  inject: ['menuContext'],

  props: {
    auxText: {
      type: String,
      default: null,
    },
    icon: {
      type: String,
      default: null,
    },
    isDisabled: Boolean,
    label: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: null,
    },
  },

  computed: {
    context() {
      return this.menuContext()
    },
  },

  methods: {
    /**
     * handles click event and close menu
     * @param {Event} event
     */
    handleClick(event) {
      const { closeMenu, preventClose } = this.context

      this.$emit('click', event)

      if (this.isDisabled) {
        event.preventDefault()
        event.stopPropagation()
      }

      if (!preventClose) {
        closeMenu()
      }
    },

    /**
     * handles keydown event and close menu
     * @param {Event} event
     */
    handleKeyDown(event) {
      const { closeMenu } = this.context

      this.$emit('keydown', event)

      if (this.isDisabled) return

      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()

        // handle keydown as click event
        this.$emit('click')

        closeMenu()
      }
    },
  },

  render(h) {
    const renderIcon = () => {
      return h(SbIcon, {
        props: {
          name: this.icon,
          size: 'normal',
        },
      })
    }

    const renderLabel = () => {
      if (this.label) {
        return h('span', this.label)
      }

      return this.$slots.default
    }

    const renderAuxText = () => {
      if (this.auxText) {
        return h('small', this.auxText)
      }
    }

    const typeClass = this.type ? `sb-menu-item--${this.type}` : null
    const iconClass = this.icon ? `sb-menu-item--has-icon` : null
    const isDisabled = this.isDisabled ? `sb-menu-item--disabled` : null
    const auxText = this.auxText ? `sb-menu-item--aux-text` : null

    return h(
      'button',
      {
        staticClass: 'sb-menu-item',
        class: [typeClass, iconClass, isDisabled, auxText],
        attrs: {
          ...this.$attrs,
          role: 'menuitemradio',
          disabled: this.isDisabled,
        },
        on: {
          ...this.$listeners,
          click: this.handleClick,
          keydown: this.handleKeyDown,
        },
      },
      [this.icon && renderIcon(), renderLabel(), renderAuxText()]
    )
  },
}

/**
 * @vue/component
 *
 * SbMenuSeparator is just a separator
 */
const SbMenuSeparator = {
  name: 'SbMenuSeparator',

  functional: true,

  render(h) {
    return h('hr', {
      staticClass: 'sb-menu-separator',
    })
  },
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
      default: '',
    },
    isTitleBold: {
      type: Boolean,
    },
  },

  render(h) {
    return h(
      'div',
      {
        attrs: {
          role: 'group',
        },
      },
      [
        this.title.length
          ? h(
              'p',
              {
                staticClass: 'sb-menu-group__title',
                class: { 'sb-menu-group__title--bold': this.isTitleBold },
              },
              this.title
            )
          : null,
        ...this.$slots.default,
      ]
    )
  },
}

/**
 * @vue/component
 *
 * SbMenuList is a component to list SbMenuItems
 */
const SbMenuList = {
  name: 'SbMenuList',

  inject: ['menuContext'],

  props: {
    items: {
      type: Array,
      default: () => [],
    },
    offset: {
      type: Array,
      default: () => [0, 5],
    },
    placement: {
      type: String,
      default: 'bottom-end',
    },
    // eslint-disable-next-line
    reference: [String, Object, Element],
    usePortal: {
      type: Boolean,
    },
    zIndex: {
      type: Number,
      default: 5,
    },
    customClass: {
      type: String,
      default: '',
    },
  },

  computed: {
    context() {
      return this.menuContext()
    },
    isOpen() {
      return this.context.isOpen
    },
    referenceEl() {
      if (this.reference) {
        return isVueComponent(this.reference)
          ? this.reference.$el
          : this.reference
      }

      return `#${this.context.menuButtonId}`
    },
  },

  methods: {
    /**
     * listen to keydown event and handle with keys to perform the navigation
     * @param {Event} event
     */
    handleKeyDown(event) {
      const {
        activeIndex,
        focusAtIndex,
        focusOnFirstItem,
        focusOnLastItem,
        closeMenu,
        focusableElements,
      } = this.context
      const count = focusableElements.length

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault()
          focusAtIndex((activeIndex + 1) % count)
          break
        case 'ArrowUp':
          event.preventDefault()
          focusAtIndex((activeIndex - 1 + count) % count)
          break
        case 'Home':
          focusOnFirstItem()
          break
        case 'End':
          focusOnLastItem()
          break
        case 'Tab':
          event.preventDefault()
          break
        case 'Escape':
          closeMenu()
          break
        default:
          break
      }

      this.$emit('keydown', event)
    },
  },

  render(h) {
    const { menuListId, menuButtonId, closeMenu } = this.context

    const items = this.items || []

    const renderMenuItems = (menuItems) => {
      return menuItems.map((menuItem) => {
        if (menuItem.separator) {
          return h(SbMenuSeparator)
        }

        if (menuItem.group && menuItem.group.title) {
          const { group } = menuItem

          return h(
            SbMenuGroup,
            {
              props: {
                title: group.title,
              },
            },
            renderMenuItems(group.items)
          )
        }

        return h(SbMenuItem, {
          props: {
            ...menuItem,
          },
        })
      })
    }

    return h(
      SbPopover,
      {
        props: {
          isOpen: this.isOpen,
          offset: this.offset,
          placement: this.placement,
          reference: this.referenceEl,
          usePortal: this.usePortal,
          zIndex: this.zIndex,
        },

        on: {
          hide: closeMenu,
        },

        ref: 'popover',
      },
      [
        h(
          'div',
          {
            staticClass: 'sb-menu-list',
            attrs: {
              ...this.$attrs,
              id: menuListId,
              role: 'menu',
              'aria-labelledby': menuButtonId,
            },
            class: this.customClass,
            on: {
              keydown: this.handleKeyDown,
            },
          },
          [
            this.$slots.top,
            !!items.length && renderMenuItems(items),
            this.$slots.default,
          ]
        ),
      ]
    )
  },
}

/**
 * @vue/component
 *
 * SbMenuButton is a button component to trigger the Dropdown
 */
const SbMenuButton = {
  name: 'SbMenuButton',

  inject: ['menuContext'],

  props: {
    // button shared props
    ...sharedProps,

    // only apply when uses the hasIconOnly property
    hasIconOnly: Boolean,
    isRounded: Boolean,
    iconName: {
      type: String,
      default: null,
    },

    iconSize: {
      type: String,
      default: 'normal',
    },

    // only apply when does not use the hasIconOnly property
    label: {
      type: String,
      default: null,
    },

    isBorderless: Boolean,
  },

  computed: {
    context() {
      return this.menuContext()
    },
    isOpen() {
      return this.context.isOpen || false
    },
  },

  methods: {
    /**
     * triggers a click event and toggle menu state
     * @param {Event} event
     */
    handleClick(event) {
      const { closeMenu, openMenu } = this.context

      this.$emit('click', event)

      event.preventDefault()

      if (this.isOpen) {
        closeMenu()
      } else {
        openMenu()
      }
    },

    /**
     * triggers a keydown event
     * @param {Event} event
     */
    handleKeyDown(event) {
      const { focusOnFirstItem, focusOnLastItem } = this.context

      this.$emit('keydown', event)

      if (event.key === 'ArrowUp') {
        event.preventDefault()
        focusOnLastItem()
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault()
        focusOnFirstItem()
      }
    },
  },

  render(h) {
    const { isOpen, menuButtonId } = this.context

    if (this.hasIconOnly) {
      return h(SbButton, {
        staticClass: 'sb-menu-button',
        attrs: {
          ...this.$attrs,
          id: menuButtonId,
          'aria-controls': this.menuListId,
          'aria-haspopup': 'true',
          'aria-expanded': isOpen ? 'true' : null,
        },
        props: {
          isRounded: this.isRounded,
          hasIconOnly: true,
          icon: this.iconName || 'menu-vertical',
          variant: this.variant,
          size: this.size,
          iconSize: this.iconSize,
        },
        on: {
          ...this.$listeners,
          click: this.handleClick,
          keydown: this.handleKeyDown,
        },
        class: {
          'sb-menu-button-borderless': this.isBorderless,
        },
      })
    }

    return h(
      SbButton,
      {
        attrs: {
          ...this.$attrs,
          id: menuButtonId,
          'aria-haspopup': 'true',
          'aria-expanded': isOpen ? 'true' : null,
        },
        props: {
          iconRight: 'chevron-down',
          label: this.label,
          isRounded: this.isRounded,
          variant: this.variant,
          size: this.size,
          iconSize: this.iconSize,
        },
        on: {
          ...this.$listeners,
          click: this.handleClick,
          keydown: this.handleKeyDown,
        },
        class: {
          'sb-menu-button-borderless': this.isBorderless,
        },
      },
      this.$slots.default
    )
  },
}

/**
 * @vue/component
 *
 * SbMenu is the Menu component that triggers with a button
 */
const SbMenu = {
  name: 'SbMenu',

  provide() {
    return {
      menuContext: () => this.menuContext,
    }
  },

  props: {
    preventClose: {
      type: Boolean,
      default: false,
    },

    value: {
      type: Boolean,
      default: false,
    },

    focusWhenClose: {
      type: Boolean,
      default: true,
    },
  },

  data: () => ({
    activeIndex: -1,
    focusableElements: [],
    isOpen: false,
    menuListId: `sb-menu-list-${randomString(4)}`,
    menuButtonId: `sb-menu-button-${randomString(4)}`,
  }),

  computed: {
    menuContext() {
      return {
        // controls the state of menu
        isOpen: this.isOpen,
        preventClose: this.preventClose,

        // references identifiers
        menuListId: this.menuListId,
        menuButtonId: this.menuButtonId,

        // controls elements
        activeIndex: this.activeIndex,
        focusableElements: this.focusableElements,

        // methods to control the menu state
        closeMenu: this.closeMenu,
        openMenu: this.openMenu,
        toggleMenu: this.toggleMenu,
        focusAtIndex: this.focusAtIndex,
        focusOnFirstItem: this.focusOnFirstItem,
        focusOnLastItem: this.focusOnLastItem,
      }
    },
  },

  watch: {
    activeIndex(index) {
      if (index !== -1) {
        this.$nextTick(() => {
          this.focusableElements[this.activeIndex] &&
            this.focusableElements[this.activeIndex].focus()

          this.$_updateTabIndex(this.activeIndex)
        })

        return
      }

      this.$nextTick(() => {
        this.$_focusButton()

        this.$_resetTabIndex()
      })
    },

    isOpen(state) {
      this.$emit('input', state)
    },

    value(state) {
      if (state) {
        this.focusOnFirstItem()
      } else {
        this.closeMenu()
      }
    },
  },

  mounted() {
    this.isOpen = this.value || false

    this.$_loadListItems()
  },

  methods: {
    /**
     * toggle menu state
     */
    closeMenu() {
      if (!this.isOpen) return

      this.isOpen = false
      if (this.focusWhenClose) this.activeIndex = -1

      this.$emit('close')
    },

    /**
     * opens menu
     */
    openMenu() {
      if (this.isOpen) return

      this.isOpen = true

      this.$emit('open')
    },

    /**
     * toggle menu state
     */
    toggleMenu() {
      if (this.isOpen) {
        this.closeMenu()
      } else {
        this.openMenu()
      }
    },

    /**
     * set focus to first menu item
     */
    focusOnFirstItem() {
      this.openMenu()

      this.activeIndex = 0
    },

    /**
     * set focus to last menu item
     */
    focusOnLastItem() {
      this.openMenu()

      this.activeIndex = this.focusableElements.length - 1
    },

    /**
     * set focus a specific menu item index
     * @param {Number} index Position index of menu list item
     */
    focusAtIndex(index) {
      this.$_updateTabIndex(index)

      this.activeIndex = index
    },

    /**
     * updates tab index for menu items
     * @param {Number} index Position index of menu list item
     */
    $_updateTabIndex(index) {
      if (this.focusableElements.length > 0) {
        const nodeAtIndex = this.focusableElements[index]
        this.focusableElements.forEach((node) => {
          if (node !== nodeAtIndex) {
            node.setAttribute('tabindex', -1)
          }
        })
        nodeAtIndex.setAttribute('tabindex', 0)
      }
    },

    /**
     * set all menu items to tabindex -1
     */
    $_resetTabIndex() {
      if (this.focusableElements.length > 0) {
        this.focusableElements.forEach((node) => {
          node.setAttribute('tabindex', -1)
        })
      }
    },

    /**
     * set focus to trigger button element
     */
    $_focusButton() {
      if (canUseDOM && document.querySelector(`#${this.menuButtonId}`)) {
        document.querySelector(`#${this.menuButtonId}`).focus()
      }
    },

    /**
     * get all menu item elements
     */
    $_loadListItems() {
      const menuNode =
        canUseDOM && document.querySelector(`#${this.menuListId}`)

      if (this.menuListId && menuNode) {
        this.focusableElements = getFocusableElements(menuNode).filter((node) =>
          ['menuitemradio'].includes(node.getAttribute('role'))
        )
      }
    },
  },

  render(h) {
    return h(
      'div',
      {
        staticClass: 'sb-menu',
        attrs: {
          ...this.$attrs,
        },
      },
      [
        this.$scopedSlots.button &&
          this.$scopedSlots.button({
            isOpen: this.isOpen,
            menuListId: this.menuListId,
            menuButtonId: this.menuButtonId,
          }),
        ...this.$slots.default,
      ]
    )
  },
}

export {
  SbMenu,
  SbMenuButton,
  SbMenuList,
  SbMenuSeparator,
  SbMenuGroup,
  SbMenuItem,
}
