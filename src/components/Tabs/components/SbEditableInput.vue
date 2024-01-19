<template>
  <input
    ref="editInput"
    :value="modelValue"
    placeholder="Type a label to new tab"
    v-bind="$attrs"
  />
</template>

<script lang="ts">
export default {
  name: 'SbEditableInput',

  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },

  mounted() {
    this.$refs.editInput.focus()
  },
}
</script>
