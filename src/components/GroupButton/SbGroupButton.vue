<template>
  <div class="sb-group-button" :class="activeClasses">
    <slot v-bind="activSlots" />
  </div>
</template>

<script>
import { sharedProps } from '../Button/lib'

export default {
  name: 'SbGroupButton',
  props: {
    hasSpaces: {
      type: Boolean,
    },
    ...sharedProps,
  },
  computed: {
    activeClasses() {
      return {
        'sb-group-button--has-spaces': this.hasSpaces,
      }
    },
    activSlots() {
      return this.$slots.default
        .filter((b) => b.tag)
        .map((button) => {
          button.componentOptions.propsData = {
            ...button.componentOptions.propsData,
            ...this._props,
          }
          return button
        })
    },
  },
}
</script>
