<template>
  <div
    class="sb-select-inner"
    :class="{
      'sb-select-inner--with-value': hasValue
    }"
    v-on="$listeners"
  >
    <span>{{ innerLabel }}</span>

    <SbIcon
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
      default: ''
    },

    multiple: Boolean,

    value: {
      type: [String, Number, Array],
      default: null
    }
  },

  computed: {
    hasValue () {
      if (this.multiple || isArray(this.value)) {
        return this.value.length > 0
      }

      return this.value !== null
    },

    innerLabel () {
      if (!this.hasValue) {
        return this.label
      }

      return this.multiple ? this.itemsValue : this.value
    },

    itemsValue () {
      return isArray(this.value) && this.value.join(', ')
    }
  }
}
</script>
