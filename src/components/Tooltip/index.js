import './tooltip.scss'
import { canUseDOM, includes, randomString } from '../../utils'
import { availablePositions } from './lib'

import SbFragment from '../Fragment'
import { SbPopover, SbPopoverArrow } from '../Popover'

/**
 * SbTooltip component
 *
 * SbTooltip is a small piece of contextual information about an element on the screen, which is displayed when a user hovers or focuses on the element it is describing.
 */
export default {
  name: 'SbTooltip',

  components: { SbFragment },

  props: {
    id: {
      type: String,
      default: () => `sb-tooltip-${randomString(5)}`,
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
      default: () => `sb-tooltip-target-${randomString(4)}`,
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
    /**
     * shows the tooltip
     */
    showTooltip() {
      if (this.label.length) {
        this.isVisibleTooltip = true
      }
    },

    /**
     * hides the tooltip
     */
    hideTooltip() {
      this.isVisibleTooltip = false
    },

    /**
     * handles with the keydown event to close the tooltip when esc key is pressed
     * @param  {Event} event
     */
    handleKeydown(event) {
      if (event.key === 'Escape') {
        this.hideTooltip()
      }
    },
  },

  render(h) {
    const children = this.$slots.default() || []

    if (children.length !== 1) {
      return console.warn(
        '[SbTooltip]: The SbTooltip component only expects one child.'
      )
    }

    if (!this.show) return children[0]

    const { id, label } = this
    const childrenElement = children[0]

    const processChildren = () => {
      if (childrenElement.componentOptions) {
        return h(
          childrenElement.componentOptions.Ctor,
          {
            ...childrenElement.data,
            ...(childrenElement.componentOptions.listeners || {}),
            props: {
              ...(childrenElement.data.props || {}),
              ...childrenElement.componentOptions.propsData,
            },
            attrs: {
              ...childrenElement.data.attrs,
              'aria-describedby': id,
              'x-tooltip-anchor': this.tooltipAnchorId,
            },
            on: childrenElement.componentOptions.listeners,
            nativeOn: {
              focus: this.showTooltip,
              blur: this.hideTooltip,
              mouseenter: this.showTooltip,
              mouseleave: this.hideTooltip,
              keydown: this.handleKeydown,
            },
          },
          childrenElement.componentOptions.children
        )
      }

      // if it is an simple text element
      if (childrenElement.text) {
        return h(
          'span',
          {
            attrs: {
              tabindex: 0,
              'aria-describedby': id,
              'x-tooltip-anchor': this.tooltipAnchorId,
            },
            on: {
              focus: this.showTooltip,
              blur: this.hideTooltip,
              mouseenter: this.showTooltip,
              mouseleave: this.hideTooltip,
              keydown: this.handleKeydown,
            },
          },
          childrenElement.text
        )
      }

      const childrenData = childrenElement.data || {}
      return h(
        childrenElement.tag,
        {
          ...childrenData,
          attrs: {
            ...(childrenElement.data ? childrenElement.data.attrs : {}),
            'aria-describedby': id,
            'x-tooltip-anchor': this.tooltipAnchorId,
          },
          on: {
            focus: this.showTooltip,
            blur: this.hideTooltip,
            mouseenter: this.showTooltip,
            mouseleave: this.hideTooltip,
            keydown: this.handleKeydown,
            ...(childrenData.on || {}),
          },
        },
        childrenElement.children
      )
    }

    return h('SbFragment', [
      processChildren(),
      h(
        SbPopover,
        {
          props: {
            usePortal: true,
            reference: this.tooltipAnchor,
            placement: this.position,
            offset: [0, 10],
            usePortalTarget: this.tooltipTarget,
            isOpen: this.isVisibleTooltip,
          },
          attrs: {
            useAnchorId: id,
            class: `sb-tooltip sb-tooltip--${this.variant} sb-tooltip--text--${this.textAlign}`,
            role: 'tooltip',
            'aria-hidden': !this.isVisibleTooltip + '',
          },
          ref: 'popover',
        },
        [label, h(SbPopoverArrow)]
      ),
    ])
  },
}
