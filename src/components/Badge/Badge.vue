<template>
  <div>
    <div class="sb-badge" :class="`${isInline()} sb-badge--${type}`">
      <SbIcon :name="getIconType()" @click.stop="$emit('icon-click')" />
      <span v-if="onlyIcon" class="sb-badge__label">{{ renderLabel() }} </span>
    </div>
  </div>
</template>

<script>
import { isValidNumber } from '../../utils'
import SbIcon from '../Icon'
import { mapIconByTypes } from './lib'
export default {
  components: {
    SbIcon,
  },
  props: {
    inlineLabel: {
      type: Boolean,
      default: false,
    },
    contract: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: 'Badge Labels',
    },
    number: {
      type: Number,
      default: null,
    },
    onlyIcon: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      required: true,
      // 1
    },
  },
  methods: {
    isInline() {
      return this.inlineLabel ? 'sb-badge--inline-label' : ''
    },
    renderLabel() {
      return isValidNumber(this.number) ? this.number : this.label
    },
    getIconType() {
      return mapIconByTypes[this.type]
    },
  },
}
</script>
