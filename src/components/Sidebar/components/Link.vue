<template>
  <component
    :is="as"
    class="sb-sidebar-link"
    :class="computedClasses"
    v-bind="computedAttrs"
    v-on="$listeners"
  >
    <SbIcon v-if="icon" :name="icon" size="small" />
    <span v-if="label" class="sb-sidebar-link__label">
      {{ label }}
    </span>
    <span v-else-if="$slots.default" class="sb-sidebar-link__label">
      <slot />
    </span>
  </component>
</template>

<script>
import SbIcon from '../../Icon'

export default {
  name: 'SbSidebarLink',

  components: {
    SbIcon,
  },

  props: {
    active: {
      type: Boolean,
      default: false,
    },
    ariaLabel: {
      type: String,
      default: null,
    },
    as: {
      type: String,
      default: 'a',
    },
    label: {
      type: String,
      default: null,
    },
    href: {
      type: String,
      default: null,
    },
    icon: {
      type: String,
      default: null,
    },
    to: {
      type: String,
      default: null,
    },
  },

  computed: {
    computedAttrs() {
      const ariaLabel = this.active
        ? this.ariaLabel + ', Current Page'
        : this.ariaLabel

      return {
        ...this.attrs,
        'aria-label': ariaLabel || null,
        'aria-current': this.active && this.active + '',
        href: this.href || null,
      }
    },
    computedClasses() {
      return {
        'sb-sidebar-link--active': this.active,
      }
    },
  },
}
</script>
