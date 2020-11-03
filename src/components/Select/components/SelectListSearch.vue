<template>
  <div class="sb-select-list-search">
    <input
      ref="input"
      type="search"
      :placeholder="placeholder"
      :value="value"
      @input="handleInput"
    />

    <SbIcon size="small" name="search" />
  </div>
</template>

<script>
import SbIcon from '../../Icon'

export default {
  name: 'SbSelectListSearch',

  components: { SbIcon },

  props: {
    value: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: 'Filter Options',
    },
  },

  methods: {
    handleInput(event) {
      this.$emit('input', event.target.value)
    },
  },
}
</script>

<style></style>
