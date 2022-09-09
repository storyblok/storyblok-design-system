<template>
  <div class="sb-group-button" :class="activeClasses" v-bind="$attrs">
    <VNodes :vnodes="activeSlots" />
  </div>
</template>

<script>
import { sharedProps } from '../Button/lib'

export default {
  name: 'SbGroupButton',
  components: {
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes,
    },
  },
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
    activeSlots() {
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
