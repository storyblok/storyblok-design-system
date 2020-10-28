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
  bottom: 0;
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 35px 0 35px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  margin-bottom: -35px;
  margin-left: -35px;

  .sb-button:not(:first-child) {
    margin-left: 5px;
  }
}
</style>
