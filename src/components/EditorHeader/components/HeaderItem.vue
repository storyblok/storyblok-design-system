<template>
  <div style="display: flex">
    <div
      class="sb-editor-header__item"
      :class="{ 'sb-editor-header__separator': withSeparator }"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SbHeaderItem',

  props: {
    withSeparator: Boolean,
  },
}
</script>
