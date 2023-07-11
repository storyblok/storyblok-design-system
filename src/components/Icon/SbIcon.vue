<template>
  <component
    :is="lucideIcon"
    v-if="lucideIcon"
    :color="color"
    :stroke-width="strokeWidth"
    :class="classes"
    :fill="computedFill"
  />
  <svg
    v-else-if="hasViewBox"
    :class="classes"
    :role="role ? role : 'presentation'"
    :viewBox="iconDeff.viewBox"
    v-bind="$attrs"
    v-html="iconDeff.path"
  ></svg>
</template>

<script>
import { getSvgIcon, customIconNames } from './utils'
import { availableColors } from '../../utils'
import * as lucideIcons from 'lucide-vue-next'

export default {
  name: 'SbIcon',
  props: {
    color: {
      type: String,
      default: null,
    },
    backgroundColor: {
      type: String,
      default: null,
      validator: (color) => availableColors.indexOf(color) !== -1,
    },
    name: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      default: 'presentation',
    },
    size: {
      type: [Number, String],
      default: null,
    },
    strokeWidth: {
      type: Number,
      default: 2,
    },
    isFilled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    iconDeff() {
      if (customIconNames.includes(this.name)) {
        return getSvgIcon(this.name)
      }
      return null
    },
    hasViewBox() {
      return this.iconDeff && this.iconDeff?.viewBox?.length > 0
    },
    classes() {
      return {
        'sb-icon': true,
        'sb-icon--custom': !this.isLucideIcon,
        'sb-icon--lucide': this.isLucideIcon,
        'sb-icon--fill': this.isFilled,
        'sb-icon--no-fill': !this.isLucideIcon && this.iconDeff?.fill,
        [`sb-icon--${this.size}`]: this.size,
        [`sb-icon--color-${this.color}`]: this.color,
        [`sb-icon--bg-${this.backgroundColor}`]: this.backgroundColor,
      }
    },
    computedFill() {
      return this.isFilled ? 'currentColor' : 'none'
    },
    isLucideIcon() {
      return Object.keys(lucideIcons).includes(this.lucideIconName)
    },
    lucideIconName() {
      if (!this.name) return
      const pascalIcon = this.name.replace(/-(.)/g, (_, char) =>
        char.toUpperCase()
      )
      return pascalIcon?.charAt(0).toUpperCase() + pascalIcon?.slice(1)
    },
    lucideIcon() {
      return this.isLucideIcon ? lucideIcons[this.lucideIconName] : null
    },
  },
}
</script>
