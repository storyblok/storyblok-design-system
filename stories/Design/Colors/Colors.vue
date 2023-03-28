<template>
  <div class="sb-colors--container">
    <div class="sb-colors" :style="{ backgroundColor: colorName}"></div>
    <span>{{name}}</span>
    <span>{{colorName}}</span>
  </div>
</template>

<script>
export default {
  name: 'SbColors',
  props: {
    colorName: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
  }
}
</script>

<style lang="scss">
@import './colors.scss';
</style>
