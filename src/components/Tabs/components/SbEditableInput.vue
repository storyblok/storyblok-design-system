<template>
  <input
    ref="editInput"
    :value="value"
    placeholder="Type a label to new tab"
    v-on="$listeners"
  />
</template>

<script>
export default {
  name: 'SbEditableInput',

  props: {
    value: {
      type: String,
      default: '',
    },
  },

  mounted() {
    this.$refs.editInput.focus()
  },
}
</script>
