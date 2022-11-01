<template>
  <svg
    class="sb-icon"
    :class="[sizeClass, colorClass, bgClass, fillClass]"
    :role="role ? role : 'presentation'"
    :viewBox="iconDeff.viewBox"
    v-on="$listeners"
    v-html="iconDeff.path"
  ></svg>
</template>

<script>
import { getSvgIcon, iconSizes } from './utils'
import { availableColors } from '../../utils'

export default {
  name: 'SbIcon',
  props: {
    color: {
      type: String,
      default: null,
      validator: (color) => availableColors.indexOf(color) !== -1,
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
      type: String,
      default: null,
      validator: (size) => iconSizes.indexOf(size) !== -1,
    },
  },
  computed: {
    iconDeff() {
      return getSvgIcon(this.name)
    },
    fillClass() {
      return this.iconDeff?.fill ? 'sb-icon--no-fill' : null
    },
    sizeClass() {
      return this.size ? `sb-icon--${this.size}` : null
    },
    colorClass() {
      return this.color ? `sb-icon--color-${this.color}` : null
    },
    bgClass() {
      return this.backgroundColor ? `sb-icon--bg-${this.backgroundColor}` : null
    },
  },
}
</script>
