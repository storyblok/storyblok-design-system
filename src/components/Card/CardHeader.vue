<template>
  <div class="sb-card__header" v-bind="$attrs">
    <component :is="as" v-if="title" class="sb-card__title">
      {{ title }}
    </component>
    <slot v-else></slot>
    <SbCardOptions v-if="options" :options="options" />
  </div>
</template>
<script>
import SbCardOptions from './CardOptions.vue'
export default {
  name: 'SbCardHeader',
  components: { SbCardOptions },
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
