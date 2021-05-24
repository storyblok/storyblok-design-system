<template>
  <div v-if="format !== 'desktop'" class="sb-editor--title">
    <SbButton icon="plus" variant="secondary" size="small" />
    <span>{{ title }}</span>
  </div>
</template>

<script>
import SbButton from '../../Button'
export default {
  name: 'SbHeaderTitle',

  components: {
    SbButton,
  },

  props: {
    title: {
      type: String,
      default: null,
    },
    format: {
      type: String,
      default: null,
    },
  },
}
</script>
