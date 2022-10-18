<template>
  <div class="sb-select-list-search">
    <input
      ref="input"
      type="search"
      :placeholder="placeholder"
      :value="value"
      @input="handleInput"
    />

    <button
      v-if="hasValue"
      class="sb-select-list-search__clear"
      @click="handleClear"
    >
      <SbIcon name="x-clear" color="light-gray" />
    </button>
    <SbIcon
      v-else
      class="sb-select-list-search__icon"
      name="search"
      color="light-gray"
    />
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

  emits: ['input'],

  computed: {
    hasValue() {
      return this.value && this.value.length > 0
    },
  },

  methods: {
    /**
     * handle with input event forward this event with correct value from input
     * @param {Event} event
     */
    handleInput(event) {
      this.$emit('input', event.target.value)
    },

    /**
     * handle with clear icon that clears the search input
     * @param {Event} event
     */
    handleClear(event) {
      event.stopPropagation()
      this.$emit('input', '')
    },
  },
}
</script>
