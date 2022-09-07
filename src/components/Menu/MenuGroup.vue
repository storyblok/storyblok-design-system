<template>
  <div role="group">
    <p
      v-if="title.length"
      :class="[
        'sb-menu-group__title',
        { 'sb-menu-group__title--bold': isTitleBold },
      ]"
    >
      {{ title }}
    </p>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'SbMenuGroup',
  props: {
    title: {
      type: String,
      default: '',
    },
    isTitleBold: {
      type: Boolean,
    },
  },
}
</script>
