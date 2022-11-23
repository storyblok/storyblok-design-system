<template>
  <component
    :is="as"
    class="sb-menu-item"
    :class="computedClasses"
    :disabled="isDisabled"
    role="menuitemradio"
    @click="handleClick"
    @keydown="handleKeyDown"
  >
    <SbIcon v-if="icon" :name="icon" size="normal" />
    <span v-if="label">{{ label }}</span>
    <slot v-else />
    <small v-if="auxText">{{ auxText }}</small>
  </component>
</template>

<script>
import SbIcon from '../Icon'
export default {
  name: 'SbMenuItem',

  components: {
    SbIcon,
  },

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
    as: {
      type: String,
      default: 'button',
    },
  },

  emits: ['click', 'keydown'],

  computed: {
    context() {
      return this.menuContext()
    },
    computedClasses() {
      return {
        [`sb-menu-item--${this.type}`]: !!this.type,
        'sb-menu-item--has-icon': !!this.icon,
        'sb-menu-item--disabled': this.isDisabled,
        'sb-menu-item--aux-text': !!this.auxText,
        'sb-menu-item--is-link': this.as === 'a',
      }
    },
  },

  methods: {
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

    handleKeyDown(event) {
      const { closeMenu } = this.context

      this.$emit('keydown', event)

      if (this.isDisabled) return

      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()

        this.$emit('click')

        closeMenu()
      }
    },
  },
}
</script>
