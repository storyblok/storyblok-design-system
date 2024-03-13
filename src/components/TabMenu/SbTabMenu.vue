<template>
  <div
    class="sb-tab-menu"
    :class="computedClasses"
    @keyup.up="handleKey('up')"
    @keyup.down="handleKey('down')"
  >
    <template v-if="isLoading">
      <SbLoading type="placeholder" class="sb-tab-menu__loading">
        <SbLoadingPlaceholder width="100px" height="24px" />
        <SbLoadingPlaceholder width="100px" height="24px" />
        <SbLoadingPlaceholder width="100px" height="24px" />
      </SbLoading>
    </template>
    <template v-else>
      <slot name="left-slot"></slot>
      <SbIconButton
        v-if="showLeftArrow"
        class="sb-tab-menu__arrow"
        :aria-label="previousArrowLabel"
        icon-name="chevron-left"
        icon-color="light-gray"
        tab-index="0"
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
      >
        <template v-if="$slots.item" #item="{ item, props }">
          <slot name="item" :item="item" :props="props" />
        </template>
      </PrimeTabMenu>
      <SbIconButton
        v-if="showRightArrow"
        class="sb-tab-menu__arrow sb-tab-menu__arrow--right"
        :aria-label="nextArrowLabel"
        icon-name="chevron-right"
        icon-color="light-gray"
        tab-index="0"
        @focus="scrollTabs('right')"
        @mouseover="scrollTabs('right')"
        @click="scrollTabs('right')"
      />
      <slot name="right-slot"></slot>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { SbIconButton, SbLoading, SbLoadingPlaceholder } from '..'
import PrimeTabMenu, { type TabMenuChangeEvent } from 'primevue/tabmenu'
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useEventListener, useResizeObserver } from '@vueuse/core'
import i18n from '../../i18n/index'

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
  type: {
    type: String,
    default: null,
    validator: (val) => ['container'].includes(val),
  },
  scrollable: {
    type: Boolean,
    default: true,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  pt: {
    type: Object,
    default: () => ({}),
  },
  locale: {
    type: String,
    required: false,
    default: 'en',
  },
})
const tabContainer = ref<HTMLElement | null>(null)
const emits = defineEmits(['update:activeIndex', 'tab-change'])

// styling computation
const computedClasses = computed(() => {
  return {
    'sb-tab-menu--vertical': props.vertical,
    'sb-tab-menu--container': props.type === 'container',
    'sb-tab-menu--scrollable': props.scrollable && !props.vertical,
  }
})

const nextArrowLabel = computed(() => {
  return i18n(props.locale, 'nextTab')
})

const previousArrowLabel = computed(() => {
  return i18n(props.locale, 'previousTab')
})

// methods
const handleTabChange = (e: TabMenuChangeEvent): void => {
  emits('tab-change', props.model[e.index])
}

const handleActiveIndexChange = (index: number): void => {
  emits('update:activeIndex', index)
}

enum Direction {
  UP = 'up',
  DOWN = 'down',
}

const handleKey = (direction: Direction): void => {
  if (!props.vertical || !document?.activeElement) return
  const activeItem = document.activeElement
  if (direction === Direction.DOWN)
    tabContainer.value.navigateToNextItem(activeItem)
  if (direction === Direction.UP)
    tabContainer.value.navigateToPrevItem(activeItem)
}

// scrolling behaviors
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
  const maxScrollOffset = scrollWidth.value - 4
  return (
    showTabArrows.value &&
    scrollPosition.value + containerWidth.value < maxScrollOffset
  )
})

enum ScrollDirection {
  LEFT = 'left',
  RIGHT = 'right',
}

const scrollTabs = (direction: ScrollDirection): void => {
  const scrollContainer = tabContainer.value?.$el

  if (!scrollContainer) return

  const scrollPosition = scrollContainer.scrollLeft
  const quarterScrollContainerWidth = Math.floor(scrollWidth.value / 4)
  const scrollAdd =
    direction === ScrollDirection.LEFT
      ? -quarterScrollContainerWidth
      : quarterScrollContainerWidth
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
  if (typeof cleanUpResize?.stop === 'function') cleanUpResize.stop()
})
</script>

<style lang="scss" src="./tab-menu.scss" />
