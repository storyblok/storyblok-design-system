<template>
  <li class="sb-breadcrumbs__separator" :class="computedClass">
    <SbIcon size="normal" name="chevron-right" />
  </li>
</template>

<script>
import SbIcon from '../Icon/SbIcon.vue'
export default {
  name: 'BreadcrumbSeperator',
  components: { SbIcon },
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    computedClass() {
      return {
        'sb-breadcrumbs__separator--active': this.active,
      }
    },
  },
}
</script>

<style lang="scss">
.sb-breadcrumbs__separator {
  display: inline-flex;
  margin-right: 5px;
  cursor: pointer;
  list-style: none;
  transition: 0.1s ease-in-out;

  &--active {
    background-color: $light-50;
    transform: rotate(90deg);
  }
}
</style>
