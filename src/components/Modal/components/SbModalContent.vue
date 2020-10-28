<template>
  <div
    class="sb-modal-content"
    v-bind="{...$attrs}"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'SbModalContent'
}
</script>

<style lang="scss">
.sb-modal-content {
  width: 100%;
  padding: 5px 0px 5px 0px;
  box-sizing: border-box;
  min-height: 30px;
}
</style>
