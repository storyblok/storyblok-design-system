<template>
  <div class="sb-select-list">
    <ul>
      <SbSelectListItem
        v-for="(option, key) in options"
        :key="key"
        v-bind="option"
        :selected="option.value === value"
        @emit-value="handleEmitValue"
      />
    </ul>
  </div>
</template>

<script>
import SbSelectListItem from './SelectListItem'

export default {
  name: 'SbSelectInner',

  components: { SbSelectListItem },

  props: {
    innerSelectElement: {
      type: HTMLElement,
      default: null
    },

    value: {
      type: [String, Number],
      default: null
    },

    options: {
      type: Array,
      required: true,
      default: () => []
    }
  },

  methods: {
    /**
     * forward the 'emit-value' event
     */
    handleEmitValue (value) {
      this.$emit('emit-value', value)
    }
  }
}
</script>
