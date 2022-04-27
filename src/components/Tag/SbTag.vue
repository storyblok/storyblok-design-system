<template>
  <div
    :class="[staticClass, { 'sb-tag--closable': this.closable }]"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot>{{ label }}</slot>
    <SbIcon
      v-if="closable"
      v-tooltip="{
        label: 'Remove',
        position: 'bottom',
      }"
      name="close"
      size="small"
      @click="onClose"
    />
  </div>
</template>
<script>
import SbIcon from '../Icon'
import { Tooltip } from '../../directives'
import { includes } from '../../utils'
import { tagTypes } from './lib'

export default {
  name: 'SbTag',
  directives: {
    tooltip: Tooltip,
  },
  components: {
    SbIcon,
  },
  props: {
    closable: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: 'light',
      validator: (type) => includes(tagTypes, type),
    },
  },
  computed: {
    staticClass() {
      return `sb-tag sb-tag--${this.type}`
    },
  },
  methods: {
    onClose(event) {
      this.$emit('close', event)
    },
  },
}
</script>
<style lang="scss" src="./tag.scss" />
