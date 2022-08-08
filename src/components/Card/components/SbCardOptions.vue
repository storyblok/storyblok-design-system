<template>
  <div class="sb-card__options">
    <SbMenu v-if="options">
      <SbMenuButton
        icon-name="menu-horizontal"
        :has-icon-only="true"
        variant="tertiary"
      />
      <SbMenuList :items="options" placement="bottom-end" />
    </SbMenu>
  </div>
</template>

<script>
export default {
  name: 'SbCardOptions',
  props: {
    options: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
