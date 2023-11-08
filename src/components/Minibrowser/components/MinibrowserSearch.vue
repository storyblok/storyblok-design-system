<template>
  <div
    class="sb-minibrowser__input-container"
    :class="{
      'sb-minibrowser__input-container--loading': isLoading,
    }"
  >
    <input
      ref="input"
      class="sb-textfield__input sb-textfield__input--default sb-textfield__input--ghost-light"
      type="search"
      :data-testid="`${dataTestid}-input`"
      :value="modelValue"
      :placeholder="placeholder"
      @input="handleSearchInput"
      @keydown="handleSearchKeydown"
    />

    <button
      v-if="showCloseIcon"
      :aria-label="clearSearchLabel"
      class="sb-minibrowser__input-container-clear"
      @click="clearSearchInputValue"
    >
      <SbIcon name="x-clear"
color="light-gray" />
    </button>

    <SbIcon class="sb-minibrowser__input-container-icon"
v-bind="icon" />
  </div>
</template>

<script>
import SbIcon from '../../Icon'

export default {
  name: 'SbMinibrowserSearch',

  components: {
    SbIcon,
  },

  inject: ['browserContext'],

  props: {
    clearSearchLabel: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: null,
    },
    modelValue: {
      type: String,
      required: true,
    },
  },

  emits: ['update:modelValue', 'keydown'],

  computed: {
    dataTestid() {
      return this.$attrs['data-testid'] || 'sb-mini-browser-search'
    },

    context() {
      return this.browserContext()
    },

    icon() {
      return {
        name: this.isLoading ? 'loading' : 'search',
        color: this.isLoading ? 'primary' : null,
      }
    },

    isLoading() {
      return this.context.isLoading
    },

    hasValue() {
      return typeof this.modelValue === 'string' && this.modelValue.length > 0
    },

    showCloseIcon() {
      return this.hasValue && !this.isLoading
    },
  },

  watch: {
    isLoading() {
      this.$refs.input.focus()
    },
  },

  mounted() {
    this.$refs.input.focus()
  },

  methods: {
    /**
     * emits an input event with the empty state
     * @param {Event} event
     */
    clearSearchInputValue(event) {
      event.stopPropagation()
      this.$emit('update:modelValue', '')
    },

    /**
     * handles input event in search input
     * @param {Event} event
     */
    handleSearchInput(event) {
      this.$emit('update:modelValue', event.target.value)
    },

    /**
     * handles input event in search input
     * @param {Event} event
     */
    handleSearchKeydown(event) {
      if (event.key === 'Escape') {
        if (this.modelValue.length) {
          this.clearSearchInputValue(event)
          return
        }
      }
      this.$emit('keydown', event)
    },
  },
}
</script>
