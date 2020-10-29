<template>
  <div
    class="sb-select-inner"
    :class="{
      'sb-select-inner--with-value': hasValue,
    }"
    v-on="$listeners"
  >
    <SbIcon
      v-if="leftIcon"
      class="sb-select-inner__icon-left"
      :name="leftIcon"
      size="small"
    />

    <span>{{ innerLabel }}</span>

    <SbIcon
      class="sb-select-inner__icon-right"
      name="chevron-down"
      size="small"
    />
  </div>
</template>

<script>
import { isArray } from '../../../utils'
import SbIcon from '../../Icon'

export default {
  name: 'SbSelectInner',

  components: { SbIcon },

  props: {
    label: {
      type: String,
      default: '',
    },

    leftIcon: {
      type: String,
      default: null,
    },

    multiple: Boolean,

    value: {
      type: [String, Number, Array],
      default: null,
    },
  },

  computed: {
    hasValue() {
      if (this.multiple || isArray(this.value)) {
        return this.value.length > 0
      }

      return this.value !== null
    },

    innerLabel() {
      if (!this.hasValue) {
        return this.label
      }

      return this.multiple ? this.itemsValue : this.value
    },

    itemsValue() {
      return isArray(this.value) && this.value.join(', ')
    },
  },
}
</script>
