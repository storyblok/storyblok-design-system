import './tooltip.scss'
import { includes, randomString } from '../../utils'
import { availablePositions } from './lib'

/**
 * SbTooltip component
 *
 * SbTooltip is a small piece of contextual information about an element on the screen, which is displayed when a user hovers or focuses on the element it is describing.
 */
export default {
  name: 'SbTooltip',

  data: () => ({
    isVisibleTooltip: false
  }),

  props: {
    id: {
      type: String,
      default: () => `sb-tooltip-${randomString(5)}`
    },
    label: {
      type: String
    },
    position: {
      type: String,
      default: 'top',
      validator: position => includes(availablePositions, position)
    }
  },

  methods: {
    showTooltip () {
      this.isVisibleTooltip = true
    },
    hideTooltip () {
      this.isVisibleTooltip = false
    },
    handleKeydown (event) {
      if (event.key === 'Escape') {
        this.hideTooltip()
      }
    }
  },

  render (h) {
    const children = this.$slots.default || []
    if (children.length !== 1) {
      return console.warn('[SbTooltip]: The SbTooltip component only expects one child.')
    }

    const { id, label } = this
    const staticClass = `sb-tooltip sb-tooltip--${this.position}`
    const childrenElement = children[0]

    const processChildren = () => {
      if (childrenElement.componentOptions) {
        return h(childrenElement.componentOptions.Ctor, {
          ...childrenElement.data,
          ...(childrenElement.componentOptions.listeners || {}),
          props: {
            ...(childrenElement.data.props || {}),
            ...childrenElement.componentOptions.propsData
          },
          attrs: {
            ...childrenElement.data.attrs,
            'aria-describedby': id
          },
          on: childrenElement.componentOptions.listeners,
          nativeOn: {
            focus: this.showTooltip,
            blur: this.hideTooltip,
            mouseenter: this.showTooltip,
            mouseleave: this.hideTooltip,
            keydown: this.handleKeydown
          }
        }, childrenElement.componentOptions.children)
      }

      return h(childrenElement.tag, {
        ...(childrenElement.data || {}),
        attrs: {
          ...(childrenElement.data ? childrenElement.data.attrs : {}),
          'aria-describedby': id
        },
        on: {
          focus: this.showTooltip,
          blur: this.hideTooltip,
          mouseenter: this.showTooltip,
          mouseleave: this.hideTooltip,
          keydown: this.handleKeydown
        }
      }, childrenElement.children)
    }

    const renderTooltipLabel = () => {
      return h('span', {
        staticClass: 'sb-tooltip__label',
        attrs: {
          id,
          role: 'tooltip',
          'aria-hidden': !this.isVisibleTooltip + ''
        }
      }, label)
    }

    // if it is an simple text element
    if (childrenElement.text) {
      return h('span', {
        staticClass,
        attrs: {
          tabindex: 0,
          'aria-describedby': id
        },
        on: {
          focus: this.showTooltip,
          blur: this.hideTooltip,
          mouseenter: this.showTooltip,
          mouseleave: this.hideTooltip,
          keydown: this.handleKeydown
        }
      }, [
        childrenElement.text,
        this.label && renderTooltipLabel()
      ])
    }

    return h('div', {
      staticClass
    }, [
      processChildren(),
      this.label && renderTooltipLabel()
    ])
  }
}
