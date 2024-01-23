<template>
  <div role="group" :data-testid="dataTestid">
    <p
      v-if="title.length"
      :class="computedClasses"
      :data-testid="`${dataTestid}-title`"
    >
      {{ title }}
    </p>
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: 'SbMenuGroup',

  props: {
    title: {
      type: String,
      default: '',
    },
    isTitleBold: Boolean,
    dataTestid: {
      type: String,
      default: 'menu-group',
    },
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
