<template>
  <component
    :is="as"
    :class="computedClass"
    :style="{ fontSize: customFontSize }"
  >
    <slot />
  </component>
</template>

<script>
import { availableHeadingTags, availableHeadingWeights } from './lib'

export default {
  name: 'SbHeading',

  props: {
    as: {
      type: String,
      default: 'h1',
      validator(tag) {
        return availableHeadingTags.includes(tag)
      },
    },
    fontWeight: {
      type: String,
      default: 'bold',
      validator(weight) {
        return availableHeadingWeights.includes(weight)
      },
    },
    customFontSize: {
      type: String,
      default: null,
    },
  },

  computed: {
    computedClass() {
      const tagClassName = `sb-heading-${this.as}`
      const fontWeightClass = `font-${this.fontWeight}`

      return [tagClassName, fontWeightClass]
    },
  },
}
</script>
