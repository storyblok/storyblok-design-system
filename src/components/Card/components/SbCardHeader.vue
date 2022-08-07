<template>
  <div class="sb-card__header">
    <component :is="as" class="sb-card__title">{{ title }}</component>
    <SbCardOptions :options="options" />
  </div>
</template>

<script>
export default {
  name: 'SbCardHeader',
  props: {
    as: {
      type: String,
      default: 'span',
    },
    options: {
      type: Array,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
  },
}
</script>
