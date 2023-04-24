<template>
  <SbPortal ref="portalRef"
:target="portalTarget" :disabled="!usePortal">
    <component
      :is="parentElementTag"
      :id="anchorId"
      ref="elementRef"
      v-click-outside="wrapClose"
      class="sb-popover"
      v-bind="$attrs"
      :style="computedStyle"
    >
      <slot />
    </component>
  </SbPortal>
</template>

<script>
import SbPortal from '../Portal'
import { createPopper } from '@popperjs/core/lib/popper-lite'
import {
  flip,
  offset,
  preventOverflow,
  arrow,
  hide,
} from '@popperjs/core/lib/modifiers'

import { randomString, canUseDOM, includes } from '../../utils'
import { ClickOutside } from '../../directives'

// @see https://popper.js.org/docs/v2/constructors/#placement
export const placementOptions = [
  'auto',
  'auto-start',
  'auto-end',
  'top',
  'top-start',
  'top-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'right',
  'right-start',
  'right-end',
  'left',
  'left-start',
  'left-end',
]

export default {
  name: 'SbPopover',

  directives: {
    ClickOutside,
  },

  components: {
    SbPortal,
  },

  props: {
    // popper.js options
    modifiers: {
      type: Array,
      default: () => [],
    },
    placement: {
      type: String,
      default: 'auto',
      validator: (val) => includes(placementOptions, val),
    },
    strategy: {
      type: String,
      default: 'absolute',
    },

    // component itself properties
    isOpen: Boolean,
    offset: {
      type: Array,
      default: () => [0, 8],
    },
    parentElementTag: {
      type: String,
      default: 'div',
    },
    // eslint-disable-next-line
    reference: [String, Element],
    // eslint-disable-next-line
    useAnchorId: String,
    // eslint-disable-next-line
    usePortalTarget: String,
    usePortal: {
      type: Boolean,
      default: false,
    },
    zIndex: {
      type: Number,
      default: 5,
    },
  },

  data: () => ({
    popoverInstance: null,
    vcoConfig: {
      detectIFrame: false,
    },
  }),

  computed: {
    computedModifiers() {
      const defaultModifierValues = [
        flip,
        preventOverflow,
        offset,
        {
          name: 'offset',
          options: {
            offset: this.offset,
          },
        },
        arrow,
        hide,
      ]

      return [...defaultModifierValues, ...this.modifiers]
    },

    anchorId() {
      return this.useAnchorId || `sb-popover-${randomString(4)}`
    },

    portalTarget() {
      return this.usePortalTarget || `sb-portal-target-${randomString(4)}`
    },

    referenceEl() {
      if (
        this.reference &&
        typeof this.reference === 'string' &&
        this.reference.length > 0 &&
        canUseDOM
      ) {
        return document.querySelector(this.reference)
      }

      return this.reference
    },

    popoverEl() {
      if (this.usePortal && canUseDOM) {
        return document.querySelector(`#${this.anchorId}`)
      }
      return this.$refs.elementRef
    },

    computedStyle() {
      return {
        display: this.isOpen ? 'unset' : 'none',
        zIndex: this.zIndex,
      }
    },
  },

  watch: {
    isOpen(newValue) {
      if (newValue) {
        this.showPopover()
      } else {
        this.hidePopover()
      }
    },

    placement(newPlacement) {
      if (this.popoverInstance) {
        this.popoverInstance.state.options.placement = newPlacement
        this.referenceEl.setAttribute('data-show', '')
      }
    },
  },

  beforeUnmount() {
    this.destroyPopoverInstance()
  },

  mounted() {
    if (this.isOpen && !this.popoverInstance) {
      this.createPopoverInstance()
    }
  },

  methods: {
    hidePopover() {
      if (this.popoverInstance) {
        this.popoverEl.removeAttribute('data-show')
        this.$emit('hide')
        this.destroyPopoverInstance()
      }
    },

    showPopover() {
      this.$emit('show')

      if (this.popoverInstance) {
        this.popoverEl.setAttribute('data-show', '')
      }

      this.$nextTick(() => {
        this.createPopoverInstance()
      })
    },

    createPopoverInstance() {
      if (this.usePortal && this.$refs.portalRef) {
        this.$refs.portalRef.mountTarget()
      }

      if (this.popoverInstance) {
        this.popoverEl.setAttribute('data-show', '')
        this.popoverInstance.update()
      } else {
        if (this.referenceEl && this.popoverEl) {
          this.popoverInstance = createPopper(
            this.referenceEl,
            this.popoverEl,
            {
              placement: this.placement,
              modifiers: this.computedModifiers,
            }
          )

          this.popoverInstance.update()
        }
      }
    },

    destroyPopoverInstance() {
      if (this.popoverInstance) {
        this.popoverInstance.destroy()
        this.popoverInstance = null
      }
    },

    wrapClose(e) {
      const referenceIsString = typeof this.referenceEl === 'string'
      const hasContains = typeof this.referenceEl?.contains === 'function'
      const targetIsNode = e?.target instanceof Node
      if (
        this.popoverInstance &&
        !referenceIsString &&
        hasContains &&
        targetIsNode &&
        !this.referenceEl.contains(e?.target)
      ) {
        this.hidePopover()
      }
    },
  },
}
</script>
