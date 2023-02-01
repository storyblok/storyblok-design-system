<template>
  <SbPopover
    ref="popover"
    v-bind="{
      isOpen,
      offset,
      placement,
      reference: referenceEl,
      usePortal,
      zIndex,
    }"
    @hide="context.closeMenu"
  >
    <div
      :id="context.menuListId"
      role="menu"
      :aria-labelledby="context.menuButtonId"
      class="sb-menu-list"
      :class="customClass"
      @keydown="handleKeyDown"
    >
      <slot name="top" />
      <SbMenuListItems :items="items" />
      <slot />
    </div>
  </SbPopover>
</template>

<script>
import SbMenuListItems from './MenuListItems'
import SbPopover from '../Popover'

import { isVueComponent } from '../../utils'
export default {
  name: 'SbMenuList',

  components: {
    SbMenuListItems,
    SbPopover,
  },

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
    reference: [String, Element, Object],
    usePortal: Boolean,
    zIndex: {
      type: Number,
      default: 5,
    },
    customClass: {
      type: String,
      default: '',
    },
  },

  emits: ['keydown'],

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
    handleKeyDown(event) {
      const {
        activeIndex,
        focusAtIndex,
        focusOnFirstItem,
        focusOnLastItem,
        closeMenu,
        focusableCount,
      } = this.context
      const count = focusableCount

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
          focusAtIndex((activeIndex + 1) % count)
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
}
</script>
