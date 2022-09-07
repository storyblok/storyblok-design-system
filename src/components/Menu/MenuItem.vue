<template>
  <component
    :is="as"
    class="sb-menu-item"
    :class="{
      [`sb-menu-item--${type}`]: !!type,
      'sb-menu-item--has-icon': !!icon,
      'sb-menu-item--disabled': isDisabled,
      'sb-menu-item--aux-text': !!auxText,
      'sb-menu-item--is-link': as === 'a',
    }"
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

  computed: {
    context() {
      return this.menuContext()
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
