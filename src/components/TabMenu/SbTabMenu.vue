<template>
  <PrimeTabMenu
    v-bind="props"
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
    :class="computedClasses"
    unstyled
    @tab-change="handleTabChange"
    @update:active-index="handleActiveIndexChange"
  />
</template>

<script lang="ts" setup>
import PrimeTabMenu, { type TabMenuChangeEvent } from 'primevue/tabmenu'
import { computed } from 'vue'

const props = defineProps({
  model: {
    type: Array,
    default: null,
  },
  activeIndex: {
    type: Number,
    default: 0,
  },
  ariaLabelledby: {
    type: String,
    default: null,
  },
  ariaLabel: {
    type: String,
    default: null,
  },
  vertical: {
    type: Boolean,
    default: false,
  },
  pt: {
    type: Object,
    default: () => ({}),
  },
})

const emits = defineEmits(['update:activeIndex', 'tab-change'])

const computedClasses = computed(() => {
  return {
    'sb-tab-menu--vertical': props.vertical,
  }
})

const handleTabChange = (e: TabMenuChangeEvent): void => {
  emits('tab-change', props.model[e.index])
}

const handleActiveIndexChange = (e: number): void => {
  emits('update:activeIndex', e)
}
</script>

<style lang="scss" src="./tab-menu.scss" />
