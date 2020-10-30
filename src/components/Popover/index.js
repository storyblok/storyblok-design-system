// popper imports
import { createPopper } from '@popperjs/core/lib/popper-lite'
import { flip, offset, preventOverflow } from '@popperjs/core/lib/modifiers'

import SbPortal from '../Portal'

import { randomString, canUseDOM, includes } from '../../utils'

import { ClickOutside } from '../../directives'

/**
 * popper.js placement options
 * @see https://popper.js.org/docs/v2/constructors/#placement
 */
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

/**
 * @vue/component
 *
 * SbPopover is a wrapper component to Popper.js
 * Some of its options comes from the third library
 * @see https://popper.js.org/docs/v2/constructors/#options for popper options
 */
const SbPopover = {
  name: 'SbPopover',

  directives: {
    ClickOutside,
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
    anchorId: {
      type: String,
      default: `sb-popover-${randomString(4)}`,
    },
    offset: {
      type: Array,
      default: () => [0, 10],
    },
    parentElementTag: {
      type: String,
      default: 'div',
    },
    portalTarget: {
      type: String,
      default: `sb-portal-target-${randomString(4)}`,
    },
    reference: {
      type: String,
      required: true,
    },
    usePortal: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    popoverInstance: null,
    isOpen: false,
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
      ]

      return [...defaultModifierValues, ...this.modifiers]
    },

    referenceEl() {
      return canUseDOM && document.querySelector(this.reference)
    },

    popoverEl() {
      const ref = this.usePortal
        ? canUseDOM && document.querySelector(`#${this.anchorId}`)
        : this.$el

      return ref
    },
  },

  // clean
  beforeDestroy() {
    this.$_destroyPopoverInstance()
  },

  methods: {
    /**
     * hides the Popover
     */
    hide() {
      if (this.isOpen) {
        this.isOpen = false

        this.$emit('hide')
      }
    },

    /**
     * shows the Popover
     */
    show() {
      if (!this.isOpen) {
        this.isOpen = true

        this.$emit('show')
      }
    },

    /**
     * toggles open state the Popover
     */
    toggle() {
      if (this.isOpen) {
        return this.hide()
      }

      this.show()
    },

    /**
     * creates the Popover instance
     */
    $_createPopoverInstance() {
      if (this.usePortal && this.$refs.portalRef) {
        this.$refs.portalRef.mountTarget()
      }

      if (this.referenceEl && this.popoverEl) {
        this.popoverInstance = createPopper(this.referenceEl, this.popoverEl, {
          placement: this.placement,
          modifiers: this.computedModifiers,
        })
      }
    },

    /**
     * destroys the Popover instance
     */
    $_destroyPopoverInstance() {
      if (this.popoverInstance) {
        this.popoverInstance.destroy()
        this.popoverInstance = null
      }
    },

    /**
     * handler for click-outside directive
     */
    $_wrapClose(e) {
      if (this.popoverInstance && !this.referenceEl.contains(e.target)) {
        this.hide()
      }
    },
  },

  render(h) {
    if (this.isOpen && !this.popoverInstance) {
      this.$_createPopoverInstance()
    }

    return h(
      SbPortal,
      {
        props: {
          append: true,
          target: `#${this.portalTarget}`,
          disabled: !this.usePortal,
          slim: true,
          unmountOnDestroy: true,
          targetSlim: true,
        },
        ref: 'portalRef',
      },
      [
        h(
          this.parentElementTag,
          {
            attrs: {
              id: this.anchorId,
              ...this.$attrs,
            },
            style: {
              display: this.isOpen ? 'unset' : 'none',
            },
            directives: [
              {
                name: 'click-outside',
                value: this.$_wrapClose,
              },
            ],
          },
          this.$slots.default
        ),
      ]
    )
  },
}

export { SbPopover }
