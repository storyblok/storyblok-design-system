<template>
  <PrimeSkeleton v-bind="$attrs" class="sb-skeleton" />
</template>

<script>
import PrimeSkeleton from 'primevue/skeleton'

export default {
  name: 'SbSkeleton',
  components: {
    PrimeSkeleton,
  },
  props: {
    ...PrimeSkeleton.props,
  },
}
</script>

<style lang="scss">
@import './skeleton';
</style>
