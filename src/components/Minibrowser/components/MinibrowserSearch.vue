<template>
  <div
    class="sb-minibrowser__input-container"
    :class="{
      'sb-minibrowser__input-container--loading': isLoading
    }"
  >
    <input
      ref="input"
      class="sb-minibrowser__input"
      type="text"
      :value="value"
      :placeholder="placeholder"
      v-on="$listeners"
    >

    <SbIcon
      size="small"
      v-bind="icon"
    />
  </div>
</template>

<script>
import SbIcon from '../../Icon'

export default {
  name: 'SbMinibrowserSearch',

  components: {
    SbIcon
  },

  inject: ['browserContext'],

  props: {
    placeholder: {
      type: String,
      default: null
    },
    value: {
      type: String,
      required: true
    }
  },

  computed: {
    context () {
      return this.browserContext()
    },

    icon () {
      return {
        name: this.isLoading ? 'loading' : 'search',
        color: this.isLoading ? 'primary' : null
      }
    },

    isLoading () {
      return this.context.isOnFilter || this.context.isOnLazyLoad
    }
  },

  mounted () {
    this.$refs.input.focus()
  }
}
</script>
