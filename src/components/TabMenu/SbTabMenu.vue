<template>
  <div class="sb-tab-menu" :class="computedClasses">
    <slot name="left-slot"></slot>
    <SbIconButton
      v-if="showLeftArrow"
      class="sb-tab-menu__arrow"
      aria-label="Go to previous tab"
      icon-name="chevron-left"
      icon-color="light-gray"
      @focus="scrollTabs('left')"
      @mouseover="scrollTabs('left')"
      @click="scrollTabs('left')"
    />
    <PrimeTabMenu
      ref="tabContainer"
      v-bind="props"
      :pt="{
        root: 'sb-tab-menu__container',
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
      @tab-change="handleTabChange"
      @update:active-index="handleActiveIndexChange"
    />
    <SbIconButton
      v-if="showRightArrow"
      class="sb-tab-menu__arrow sb-tab-menu__arrow--right"
      aria-label="Go to next tab"
      icon-name="chevron-right"
      icon-color="light-gray"
      @focus="scrollTabs('right')"
      @mouseover="scrollTabs('right')"
      @click="scrollTabs('right')"
    />
    <slot name="right-slot"></slot>
  </div>
</template>

<script lang="ts" setup>
import { SbIconButton } from '..'
import PrimeTabMenu, { type TabMenuChangeEvent } from 'primevue/tabmenu'
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useEventListener, useResizeObserver } from '@vueuse/core'

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
  scrollable: {
    type: Boolean,
    default: true,
  },
  pt: {
    type: Object,
    default: () => ({}),
  },
})

const emits = defineEmits(['update:activeIndex', 'tab-change'])

// styling computation
const computedClasses = computed(() => {
  return {
    'sb-tab-menu--vertical': props.vertical,
  }
})

// methods
const handleTabChange = (e: TabMenuChangeEvent): void => {
  emits('tab-change', props.model[e.index])
}

const handleActiveIndexChange = (e: number): void => {
  emits('update:activeIndex', e)
}

// scrolling behaviours
const tabContainer = ref<HTMLElement | null>(null)
const containerWidth = ref(0)
const scrollWidth = ref(0)
const scrollPosition = ref(0)
let cleanUpScroll = null
let cleanUpResize = null

const showTabArrows = computed(() => {
  return scrollWidth.value >= containerWidth.value && props.scrollable
})

const showLeftArrow = computed(() => {
  return (
    showTabArrows.value && containerWidth.value > 0 && scrollPosition.value > 1
  )
})

const showRightArrow = computed(() => {
  return (
    showTabArrows.value &&
    scrollPosition.value + containerWidth.value < scrollWidth.value - 10
  )
})

const scrollTabs = (direction: string): void => {
  const scrollContainer = tabContainer.value?.$el

  if (!scrollContainer) return

  const scrollPosition = scrollContainer.scrollLeft
  const scrollAmount = Math.floor(scrollWidth.value / 4)
  const scrollAdd = direction === 'left' ? -scrollAmount : scrollAmount
  scrollContainer.scrollTo({
    top: 0,
    left: scrollPosition + scrollAdd,
    behavior: 'smooth',
  })
}

onMounted(() => {
  const container = tabContainer.value?.$el
  containerWidth.value = container?.clientWidth || 0
  scrollWidth.value = container?.scrollWidth || 0
  scrollPosition.value = container?.scrollLeft || 0

  cleanUpResize = useResizeObserver(container, () => {
    containerWidth.value = container?.clientWidth || 0
    scrollWidth.value = container?.scrollWidth || 0
  })
  cleanUpScroll = useEventListener(container, 'scroll', () => {
    scrollPosition.value = container?.scrollLeft
  })
})

onBeforeUnmount(() => {
  if (typeof cleanUpScroll === 'function') cleanUpScroll()
  if (typeof cleanUpResize === 'function') cleanUpResize.stop()
})
</script>

<style lang="scss" src="./tab-menu.scss" />
