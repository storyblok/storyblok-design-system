<template>
  <li
    class="sb-select-list__item"
    :class="{
      'sb-select-list__item--selected': this.selected
    }"
    @click="handleClick"
  >
    <span>{{ label }}</span>
  </li>
</template>

<script>
export default {
  name: 'SbSelectInner',

  props: {
    selected: Boolean,
    label: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number],
      default: ''
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
