<template>
  <li
    class="sb-select-list__item"
    :class="{
      'sb-select-list__item--selected': isSelected
    }"
    @click="handleClick"
  >
    <input
      v-if="multiple"
      type="checkbox"
      :checked="isSelected"
    >
    <span class="sb-select-list__item-name">{{ label }}</span>
  </li>
</template>

<script>
import { includes, isArray } from '../../../utils'

export default {
  name: 'SbSelectInner',

  props: {
    inputValue: {
      type: [String, Number, Array],
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    multiple: Boolean,
    value: {
      type: [String, Number],
      default: ''
    }
  },

  computed: {
    isSelected () {
      return isArray(this.inputValue)
        ? includes(this.inputValue, this.value)
        : this.value === this.inputValue
    }
  },

  methods: {
    /**
     * emits the 'emit-value' event
     */
    handleClick () {
      this.$emit('emit-value', this.value)
    }
  }
}
</script>
