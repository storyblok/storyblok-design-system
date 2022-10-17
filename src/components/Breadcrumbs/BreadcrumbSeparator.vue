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
