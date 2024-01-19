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
    @tab-change="(event) => $emit('update:modelValue', event)"
  />
</template>

<script setup>
import PrimeTabMenu from 'primevue/tabmenu'

defineProps({
  ...PrimeTabMenu.props,
})

defineEmits(['update:modelValue', ...PrimeTabMenu.emits])
</script>

<style lang="scss" src="./tab-menu.scss" />
