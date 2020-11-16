// popper imports
import { createPopper } from '@popperjs/core/lib/popper-lite'
import {
  flip,
  offset,
  preventOverflow,
  arrow,
} from '@popperjs/core/lib/modifiers'

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
  },

  data: () => ({
    popoverInstance: null,
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
      if (typeof this.reference === 'string') {
        return canUseDOM && document.querySelector(this.reference)
      }

      return this.reference
    },

    popoverEl() {
      const ref = this.usePortal
        ? canUseDOM && document.querySelector(`#${this.anchorId}`)
        : this.$el

      return ref
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
        this.reference.setAttribute('data-show', '')
      }
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
    hidePopover() {
      if (this.popoverInstance) {
        this.popoverEl.removeAttribute('data-show')
        this.$emit('hide')
      }
    },

    /**
     * shows the Popover
     */
    showPopover() {
      this.$emit('show')

      if (this.popoverInstance) {
        this.popoverEl.setAttribute('data-show', '')
      }

      this.$nextTick(() => {
        this.$_createPopoverInstance()
      })
    },

    /**
     * creates the Popover instance
     */
    $_createPopoverInstance() {
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
        this.hidePopover()
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

const SbPopoverArrow = {
  name: 'SbPopoverArrow',
  functional: true,
  render(h, { data, ...rest }) {
    return h('div', {
      ...rest,
      attrs: {
        ...data.attrs,
        'data-popper-arrow': true,
        role: 'presentation',
      },
    })
  },
}

export { SbPopover, SbPopoverArrow }
