<template>
  <div class="sb-modal-footer">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'SbModalFooter'
}
</script>

<style lang="scss">
.sb-modal-footer {
  width: 100%;
  max-height: 76px;
  background-color: $light;
}
</style>
