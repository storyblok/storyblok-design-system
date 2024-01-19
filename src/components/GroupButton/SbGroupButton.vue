<template>
  <div class="sb-group-button" :class="activeClasses" v-bind="$attrs">
    <VNodes :vnodes="activeSlots()" />
  </div>
</template>

<script lang="ts">
import { sharedProps } from '../Button/lib'
import VNodes from '../../utils/VNodes'

export default {
  name: 'SbGroupButton',
  components: {
    VNodes,
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
  },
  methods: {
    activeSlots() {
      const children = this.$slots.default && this.$slots.default()
      return children
        .filter((b) => b.__v_isVNode)
        .map((button) => {
          button.props = {
            ...button.props,
            ...this.$props,
          }
          return button
        })
    },
  },
}
</script>
