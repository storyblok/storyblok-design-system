<template>
  <div
    class="sb-select-inner"
    :class="{
      'sb-select-inner--with-value': hasValue
    }"
    v-on="$listeners"
  >
    {{ innerLabel }}

    <SbIcon
      name="chevron-down"
      size="small"
    />
  </div>
</template>

<script>
import SbIcon from '../../Icon'

export default {
  name: 'SbSelectInner',

  components: { SbIcon },

  props: {
    label: {
      type: String,
      default: ''
    },

    value: {
      type: [String, Number],
      default: null
    }
  },

  computed: {
    hasValue () {
      return this.value !== null
    },

    innerLabel () {
      return this.hasValue ? this.value : this.label
    }
  }
}
</script>
