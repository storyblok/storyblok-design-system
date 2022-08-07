<template>
  <div
    class="sb-tab-panel"
    role="tabpanel"
    :tabindex="activate ? 0 : -1"
    :aria-hidden="!activate + ''"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'SbTabPanel',
  props: {
    activate: {
      type: Boolean,
      default: false,
    },
    name: {
      type: [String, Number],
      required: true,
    },
  },
}
</script>
