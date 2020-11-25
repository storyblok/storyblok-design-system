<template>
  <fieldset class="sb-form-group" :class="componentClasses">
    <div class="sb-form-group__info">
      <legend class="sb-form-group__legend">{{ legend }}</legend>
      <p v-if="description" class="sb-form-group__description">
        {{ description }}
      </p>
    </div>
    <div v-if="inline" class="sb-form-group__slot">
      <slot />
    </div>
    <slot v-else />
  </fieldset>
</template>

<script>
export default {
  name: 'SbFormGroup',

  props: {
    inline: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      default: null,
    },
    legend: {
      type: String,
      default: null,
      required: true,
    },
  },

  computed: {
    componentClasses() {
      return [this.inline && 'sb-form-group--inline']
    },
  },
}
</script>
