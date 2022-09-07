<template>
  <div class="sb-menu" v-bind="$attrs">
    <slot
      name="button"
      :isOpen="isOpen"
      :menuListId="menuListId"
      :menuButtonId="menuButtonId"
    />
    <slot />
  </div>
</template>

<script>
import { randomString, getFocusableElements, canUseDOM } from '../../utils'

export default {
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

    focusWhenOpen: {
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

          this.updateTabIndex(this.activeIndex)
        })

        return
      }

      if (this.focusWhenOpen) {
        this.$nextTick(() => {
          this.focusButton()
          this.resetTabIndex()
        })
      }
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

    this.loadListItems()
  },

  methods: {
    closeMenu() {
      if (!this.isOpen) return

      this.isOpen = false
      if (this.focusWhenClose) this.activeIndex = -1

      this.$emit('close')
    },

    openMenu() {
      if (this.isOpen) return

      this.isOpen = true

      this.$emit('open')
    },

    toggleMenu() {
      if (this.isOpen) {
        this.closeMenu()
      } else {
        this.openMenu()
      }
    },

    focusOnFirstItem() {
      this.openMenu()

      this.activeIndex = 0
    },

    focusOnLastItem() {
      this.openMenu()

      this.activeIndex = this.focusableElements.length - 1
    },

    focusAtIndex(index) {
      this.updateTabIndex(index)

      this.activeIndex = index
    },

    updateTabIndex(index) {
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

    resetTabIndex() {
      if (this.focusableElements.length > 0) {
        this.focusableElements.forEach((node) => {
          node.setAttribute('tabindex', -1)
        })
      }
    },

    focusButton() {
      if (canUseDOM && document.querySelector(`#${this.menuButtonId}`)) {
        document.querySelector(`#${this.menuButtonId}`).focus()
      }
    },

    loadListItems() {
      const menuNode =
        canUseDOM && document.querySelector(`#${this.menuListId}`)

      if (this.menuListId && menuNode) {
        this.focusableElements = getFocusableElements(menuNode).filter((node) =>
          ['menuitemradio'].includes(node.getAttribute('role'))
        )
      }
    },
  },
}
</script>
