<template>
  <PrimeTabMenu
    :pt="{
      root: 'sb-tab-menu',
      menu: 'sb-tab-menu__menu',
      menuitem: 'sb-tab-menu__menu-item',
      action: 'sb-tab-menu__action',
      icon: 'sb-tab-menu__icon',
      label: 'sb-tab-menu__label',
      inkbar: 'sb-tab-menu__inkbar',
      hooks: 'sb-tab-menu__hooks',
      ...$props.pt,
    }"
    unstyled
    @tab-change="(e) => $emit('tab-change', e)"
    @update:active-index="(e) => $emit('update:activeIndex', e)"
  />
</template>

<script setup>
import PrimeTabMenu from 'primevue/tabmenu'
import { defineProps, defineEmits, computed } from 'vue'

defineProps({
  ...PrimeTabMenu.props,
  pt: {
    type: Object,
    default: () => ({}),
  },
})

defineEmits([...PrimeTabMenu.emits])
</script>

<style lang="scss" src="./tab-menu.scss" />
