<template>
  <div class="sb-modal">
    <slot />
  </div>
</template>

<script>

export default {
  name: 'SbModal'

}
</script>

<style lang="scss">
.sb-modal {
  width: 100%;
  max-width: 620px;
  min-height: 199px;
  border-radius: 5px;
  background-color: $white;
  box-shadow: 0px 2px 17px 3px rgba(34, 42, 69, 0.07);
}
</style>
