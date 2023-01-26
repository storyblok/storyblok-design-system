<template>
  <span
    :tabindex="0"
    :aria-describedby="id"
    :x-tooltip-anchor="tooltipAnchorId"
    @focus="showTooltip"
    @blur="hideTooltip"
    @mouseenter="showTooltip"
    @mouseleave="hideTooltip"
    @keydown="handleKeydown"
  >
    <slot />
  </span>
  <SbPopover
    v-if="show"
    ref="popover"
    :aria-hidden="!isVisibleTooltip"
    role="tooltip"
    :use-anchor-id="id"
    :class="`sb-tooltip sb-tooltip--${variant} sb-tooltip--text--${textAlign}`"
    :use-portal="true"
    :reference="tooltipAnchor"
    :placement="position"
    :offset="[0, 10]"
    :use-portal-target="tooltipTarget"
    :is-open="isVisibleTooltip"
  >
    {{ label }}
    <SbPopoverArrow />
  </SbPopover>
</template>

<script>
import { SbPopover, SbPopoverArrow } from '../Popover'
import { canUseDOM, includes, randomString } from '../../utils'
import { availablePositions } from './lib'

export default {
  name: 'SbTooltip',

  components: {
    SbPopover,
    SbPopoverArrow,
  },

  props: {
    id: {
      type: String,
      default: () => `#sb-tooltip-${randomString(5)}`,
    },
    label: {
      type: String,
      required: true,
    },
    show: {
      type: Boolean,
      default: true,
    },
    position: {
      type: String,
      default: 'top',
      validator: (position) => includes(availablePositions, position),
    },
    tooltipTarget: {
      type: String,
      default: () => `#sb-tooltip-target-${randomString(4)}`,
    },
    variant: {
      type: String,
      default: 'dark',
    },
    textAlign: {
      type: String,
      default: 'center',
    },
  },

  data: () => ({
    isVisibleTooltip: false,
    tooltipAnchor: undefined,
  }),

  computed: {
    tooltipAnchorId() {
      return `sb-tooltip-anchor-${randomString(5)}`
    },
  },

  mounted() {
    this.$nextTick(() => {
      if (canUseDOM) {
        this.tooltipAnchor = document.querySelector(
          `[x-tooltip-anchor=${this.tooltipAnchorId}]`
        )
      }
    })
  },

  methods: {
    showTooltip() {
      if (this.label.length) {
        this.isVisibleTooltip = true
      }
    },

    hideTooltip() {
      this.isVisibleTooltip = false
    },

    handleKeydown(event) {
      if (event.key === 'Escape') {
        this.hideTooltip()
      }
    },
  },
}
</script>
