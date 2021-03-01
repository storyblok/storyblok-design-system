<template>
  <div class="sb-minibrowser__list-header">
    <SbIcon
      name="chevron-down"
      size="normal"
      class="sb-minibrowser__list-header-icon"
    />

    <p class="sb-minibrowser__list-header-title">{{ title }}</p>

    <slot name="right" />
  </div>
</template>

<script>
import SbIcon from '../../Icon'

export default {
  name: 'SbMinibrowserListHeader',

  components: {
    SbIcon,
  },

  props: {
    title: {
      type: String,
      default: '',
      required: true,
    },
  },
}
</script>
