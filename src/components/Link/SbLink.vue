<template>
  <component
    :is="as"
    class="sb-link"
    :class="computedClasses"
    :to="to"
    v-bind="computedAttributes"
  >
    <SbIcon v-if="icon" :name="icon" />
    <span v-if="label" class="sb-link__label">
      {{ label }}
    </span>
    <span v-else-if="$slots.default" class="sb-link__label">
      <slot />
    </span>
    <SbIcon v-if="iconRight" :name="iconRight" />
  </component>
</template>

<script>
import SbIcon from '../Icon'
export default {
  name: 'SbLink',
  components: {
    SbIcon,
  },
  props: {
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
    iconRight: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    to: {
      type: [String, Object],
      default: null,
    },
    variant: {
      type: String,
      default: '',
    },
  },
  computed: {
    computedClasses() {
      return {
        'sb-link--has-icon': this.icon,
        'sb-link--has-icon-right': this.iconRight,
        [`sb-link--${this.variant}`]: this.variant,
      }
    },
    computedAttributes() {
      if (this.to) {
        return {
          to: this.to,
          title: this.title,
        }
      }
      return {
        href: this.href,
        title: this.title,
      }
    },
  },
}
</script>
