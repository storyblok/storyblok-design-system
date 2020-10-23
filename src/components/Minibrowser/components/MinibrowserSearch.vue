<template>
  <div class="sb-minibrowser__input-container">
    <input
      ref="input"
      class="sb-minibrowser__input"
      type="search"
      :value="value"
      :placeholder="placeholder"
    >

    <SbIcon
      name="search"
      size="small"
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

  mounted () {
    this.$refs.input.focus()
  }
}
</script>
