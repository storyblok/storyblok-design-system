<template>
  <div
    class="sb-group-button"
    :class="{ 'sb-group-button--has-spaces': hasSpaces }"
  >
    <component
      :is="element.componentOptions.tag"
      v-for="element of buttons"
      :key="element.name"
      v-bind="getButtonsAttrs(element)"
    />
  </div>
</template>

<script>
import './group-button.scss'

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
    buttons() {
      return this.$slots.default.filter(({ tag }) => tag)
    },
  },
  methods: {
    getButtonsAttrs(element) {
      return {
        ...element.componentOptions.propsData,
        size: this.size,
        variant: this.variant,
      }
    },
  },
}
</script>
