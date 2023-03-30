<template>
  <div class="sb-accordion"
:class="activeClasses">
    <button
      class="sb-accordion__button"
      :aria-expanded="isOpenLocal"
      :aria-controls="`collapse${title}`"
      @click="toggleAccordion"
    >
      <SbIcon :name="chevronIcon" />
      <p class="sb-accordion__title">
        {{ title }}
      </p>

      <SbIcon
        v-if="icon"
        v-tooltip="{ label: iconDescription }"
        :name="icon"
        class="sb-accordion__icon"
        @click.stop="$emit('icon-click')"
      />

      <div v-if="$slots.contentInfo"
class="sb-accordion__content-info">
        <slot name="contentInfo" />
      </div>
    </button>

    <AccordionTransition>
      <div
        v-show="isOpenLocal"
        :id="`collapse${title}`"
        class="sb-accordion__content"
      >
        <slot />
      </div>
    </AccordionTransition>
  </div>
</template>

<script>
import SbIcon from '../Icon'
import AccordionTransition from './AccordionTransition'
import { computed, watch, ref } from 'vue'
import { Tooltip } from '../../directives'

export default {
  name: 'SbAccordion',

  components: {
    AccordionTransition,
    SbIcon,
  },

  directives: {
    tooltip: Tooltip,
  },

  props: {
    icon: {
      type: String,
      default: null,
    },
    iconDescription: {
      type: String,
      default: '',
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
    noPadding: {
      type: Boolean,
      default: false,
    },
    noHighlight: {
      type: Boolean,
      default: false,
    },
    noBorder: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: null,
      required: true,
    },
  },

  emits: ['icon-click', 'toggle-open'],

  setup(props, { emit }) {
    const isOpenLocal = ref(props.isOpen)
    const chevronIcon = computed(() =>
      isOpenLocal.value ? 'chevron-down' : 'chevron-right'
    )
    const activeClasses = computed(() => ({
      'sb-accordion--open': isOpenLocal.value,
      'sb-accordion--no-highlight': props.noHighlight,
      'sb-accordion--no-padding': props.noPadding,
      'sb-accordion--no-border': props.noBorder,
    }))

    watch(
      () => props.isOpen,
      (newValue) => {
        isOpenLocal.value = newValue
      }
    )

    const toggleAccordion = () => {
      isOpenLocal.value = !isOpenLocal.value
      emit('toggle-open', isOpenLocal.value)
    }

    return {
      isOpenLocal,
      chevronIcon,
      activeClasses,
      toggleAccordion,
    }
  },
}
</script>
