<template>
  <div :class="computedClass" v-bind="$attrs">
    <span class="sb-tag__label">
      <slot>
        {{ label }}
      </slot>
    </span>
    <SbIcon
      v-if="closable"
      v-tooltip="{
        label: 'Remove',
        position: 'bottom',
      }"
      name="x"
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
      default: 'light-grey',
      validator: (type) => includes(tagTypes, type),
    },
  },

  emits: ['close'],
  computed: {
    computedClass() {
      return [
        `sb-tag sb-tag--${this.type}`,
        { 'sb-tag--closable': this.closable },
      ]
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
