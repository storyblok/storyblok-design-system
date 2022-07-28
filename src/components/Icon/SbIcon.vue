<template>
  <svg
    :class="classes"
    :role="role || 'presentation'"
    :viewBox="icon.viewBox"
    v-on="$listeners"
    v-html="icon.path"
  ></svg>
</template>

<script>
import iconPaths from '../../lib/internal-icons'
import { availableColors } from '../../utils'
import { iconSizes } from './utils'

export default {
  name: 'SbIcon',
  props: {
    backgroundColor: {
      type: String,
      default: null,
      validator: (color) => availableColors.indexOf(color) !== -1,
    },
    color: {
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
    classes() {
      return [
        'sb-icon',
        this.backgroundColor ? `sb-icon--bg-${this.backgroundColor}` : null,
        this.color ? `sb-icon--color-${this.color}` : null,
        this.size ? `sb-icon--${this.size}` : null,
      ]
    },
    icon() {
      const iconDeff = iconPaths[this.name]

      if (!iconDeff) {
        console.warn(`[SbIcon] - this ${this.name} icon does not exists`)
      }

      return {
        path: iconDeff ? iconDeff.path : '',
        viewBox: iconDeff ? iconDeff.viewbox || '0 0 24 24' : '',
      }
    },
  },
}
</script>

<style lang="scss">
@import './icon';
</style>
