<template>
  <div role="group">
    <p v-if="title.length" :class="computedClasses">
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
    isTitleBold: Boolean,
  },

  computed: {
    computedClasses() {
      return [
        'sb-menu-group__title',
        { 'sb-menu-group__title--bold': this.isTitleBold },
      ]
    },
  },
}
</script>
