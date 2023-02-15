<template>
  <div class="base-separator">
    <hr
      v-if="isFlat"
      class="separator"
      :class="[small && 'separator--small']"
    />
    <div v-else class="separator--vertical" />
  </div>
</template>

<script>
export default {
  name: 'BaseSeparator',
  props: {
    small: {
      type: Boolean,
      default: false,
    },
    isFlat: {
      type: Boolean,
      default: true,
    },
  },
}
</script>
