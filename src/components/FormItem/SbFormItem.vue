<template>
  <div class="sb-form-item">
    <label v-if="label" class="sb-form-item__label">{{ label }}</label>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'SbFormItem',

  props: {
    label: {
      type: String,
      default: null,
    },
  },
}
</script>
