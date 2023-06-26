<template>
  <div class="sb-editor-header__title">
    <SbButton icon="chevron-left" variant="tertiary" size="small" />
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
