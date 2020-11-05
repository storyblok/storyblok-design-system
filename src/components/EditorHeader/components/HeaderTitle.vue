<template>
  <div v-if="format !== 'desktop'" class="sb-editor--title">
    <SbButton icon="plus" type="secondary" size="small" />
    <span>{{ title }}</span>
  </div>
</template>

<script>
import SbButton from '../../Button'
export default {
  name: 'HeaderTitle',

  components: {
    SbButton,
  },

  props: {
    title: {
      type: String,
      default: null,
    },
    subTitle: {
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

<style></style>
