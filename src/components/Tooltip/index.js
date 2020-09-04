import './tooltip.scss'
import { includes, getRandomNumber } from '../../utils'
import { availablePositions } from './lib'

/**
 * @method randomString
 * @param  {Number} length
 * @return {String}
 */
const randomString = length => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(getRandomNumber(0, length))
  }

  return result
}

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
    }
  },

  render (h) {
    const children = this.$slots.default
    if (children.length > 1) {
      return console.error('[SbTooltip]: The SbTooltip component only expects one child.')
    }

    const { id, label } = this

    const tooltipProps = {
      staticClass: `sb-tooltip sb-tooltip--${this.position}`,
      attrs: {
        tabindex: 0,
        'aria-describedby': id
      },
      on: {
        focus: this.showTooltip,
        blur: this.hideTooltip,
        mouseenter: this.showTooltip,
        mouseleave: this.hideTooltip
      }
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

    const content = [
      ...this.$slots.default,
      this.label && renderTooltipLabel()
    ]

    return h('div', tooltipProps, content)
  }
}
