<template>
  <div class="sb-select-list-search">
    <input
      ref="input"
      type="search"
      :placeholder="placeholder"
      :value="modelValue"
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

<script lang="ts">
import SbIcon from '../../Icon'

export default {
  name: 'SbSelectListSearch',

  components: { SbIcon },

  props: {
    modelValue: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: 'Filter Options',
    },
  },

  emits: ['update:modelValue'],

  computed: {
    hasValue() {
      return this.modelValue && this.modelValue.length > 0
    },
  },

  methods: {
    /**
     * handle with input event forward this event with correct value from input
     * @param {Event} event
     */
    handleInput(event) {
      this.$emit('update:modelValue', event.target.value)
    },

    /**
     * handle with clear icon that clears the search input
     * @param {Event} event
     */
    handleClear(event) {
      event.stopPropagation()
      this.$emit('update:modelValue', '')
    },
  },
}
</script>
