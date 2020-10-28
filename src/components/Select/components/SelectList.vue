<template>
  <div class="sb-select-list">
    <ul>
      <SbSelectListItem
        v-for="(option, key) in options"
        :key="key"
        v-bind="option"
        :input-value="value"
        :multiple="multiple"
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
    value: {
      type: [String, Number, Array],
      default: null
    },

    multiple: Boolean,

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
