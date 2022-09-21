<template>
  <div
    class="sb-group-button"
    :class="{ 'sb-group-button--has-spaces': hasSpaces }"
  >
    <component
      :is="element.componentOptions.tag"
      v-for="(element, index) in getButtons()"
      :key="index"
      v-bind="getButtonsAttrs(element)"
    />
  </div>
</template>

<script>
import './group-button.scss'
import SbButton from '../Button'

import { sharedProps } from '../Button/lib'

export default {
  name: 'SbGroupButton',
  components: {
    SbButton,
  },
  props: {
    hasSpaces: {
      type: Boolean,
    },
    ...sharedProps,
  },
  methods: {
    getButtonsAttrs(element) {
      return {
        ...element.componentOptions.propsData,
        ...this.$props,
      }
    },
    getButtons() {
      return this.$slots.default.filter(({ tag }) => tag)
    },
  },
}
</script>
