<template>
  <div class="sb-modal-content">
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
  padding: 15px 35px 15px 35px;
  box-sizing: border-box;
  min-height: 30px;
}
</style>
