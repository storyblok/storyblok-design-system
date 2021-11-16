<template>
  <div class="sb-minibrowser__list-header">
    <slot name="left">
      <SbIcon name="chevron-down" class="sb-minibrowser__list-header-icon" />

      <p class="sb-minibrowser__list-header-title">{{ title }}</p>
    </slot>

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
