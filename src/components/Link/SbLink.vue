<template>
  <component
    :is="as"
    class="sb-link"
    :class="classes"
    :title="title"
    :href="href"
    :to="to"
    v-on="$listeners"
  >
    <SbIcon v-if="icon" :name="icon" />
    <span v-if="label" class="sb-link__label">{{ label }}</span>
    <span v-if="$slots.default" class="sb-link__label">
      <slot></slot>
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
    classes() {
      return [
        this.icon && 'sb-link--has-icon',
        this.iconRight && 'sb-link--has-icon-right',
        this.variant && `sb-link--${this.variant}`,
      ]
    },
  },
}
</script>
