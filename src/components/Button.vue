<template>
  <button
    class="button"
    :class="`is-${type}`"
    @click="onClick"
  >
    {{ label }}
    <slot />
  </button>
</template>

<script>
export default {
  name: 'SBButton',
  props: {
    label: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'primary'
    }
  },
  methods: {
    onClick () {
      this.$emit('click')
    }
  }
}
</script>
