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
  min-height: 76px;
  background-color: $light-50;
  // position: absolute;
  bottom: 0;
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 30px 0 30px;
  box-sizing: border-box;
}
</style>
