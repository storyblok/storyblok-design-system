<template>
  <div
    class="sb-minibrowser__input-container"
    :class="{
      'sb-minibrowser__input-container--loading': isLoading,
    }"
  >
    <input
      ref="input"
      class="sb-minibrowser__input"
      type="search"
      :value="value"
      :placeholder="placeholder"
      @input="handleSearchInput"
      @keydown="handleSearchKeydown"
    />

    <button
      v-if="showCloseIcon"
      class="sb-minibrowser__input-container-clear"
      @click="clearSearchInputValue"
    >
      <SbIcon name="x-clear" color="light-gray" />
    </button>

    <SbIcon v-else class="sb-minibrowser__input-container-icon" v-bind="icon" />
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
    placeholder: {
      type: String,
      default: null,
    },
    value: {
      type: String,
      required: true,
    },
  },

  computed: {
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
      return (
        this.context.isOnLoadingFilter ||
        this.context.isOnLazyLoad ||
        this.context.isLoading
      )
    },

    isOnFilter() {
      return this.context.isOnFilter
    },

    showCloseIcon() {
      return this.isOnFilter && !this.isLoading
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
      this.$emit('input', '')
    },

    /**
     * handles input event in search input
     * @param {Event} event
     */
    handleSearchInput(event) {
      this.$emit('input', event.target.value)
    },

    /**
     * handles input event in search input
     * @param {Event} event
     */
    handleSearchKeydown(event) {
      if (event.key === 'Escape') {
        this.clearSearchInputValue(event)
      }
    },
  },
}
</script>
