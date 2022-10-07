<template>
  <SbButton
    :id="context.menuButtonId"
    :aria-controls="context.menuListId"
    aria-haspopup="true"
    :aria-expanded="isOpen ? 'true' : null"
    v-bind="{
      icon: hasIconOnly ? activeIconName || 'menu-vertical' : activeIconName,
      iconColor,
      iconRight: hasIconOnly ? '' : iconRight,
      label,
      isRounded,
      variant,
      size,
      iconSize,
      hasIconOnly,
    }"
    :class="{
      'sb-menu-button-borderless': isBorderless,
      'sb-menu-button': hasIconOnly,
    }"
    @click="handleClick"
    @keydown="handleKeyDown"
  >
    <slot v-if="!hasIconOnly" />
  </SbButton>
</template>

<script>
import { sharedProps } from '../Button/lib'
import SbButton from '../Button'

export default {
  name: 'SbMenuButton',

  components: {
    SbButton,
  },

  inject: ['menuContext'],

  props: {
    // button shared props
    ...sharedProps,

    // only apply when uses the hasIconOnly property
    hasIconOnly: Boolean,
    isRounded: Boolean,
    icon: {
      type: String,
      default: null,
    },
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

    iconRight: {
      type: String,
      default: 'chevron-down',
    },

    iconColor: {
      type: String,
      default: null,
    },
  },

  computed: {
    context() {
      return this.menuContext()
    },
    isOpen() {
      return this.context.isOpen || false
    },
    activeIconName() {
      return this.icon || this.iconName
    },
  },

  methods: {
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
}
</script>
