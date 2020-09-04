import './tooltip.scss'
import { includes } from '../../utils'
import { availablePositions } from './lib'

/**
 * SbTooltip component
 *
 * SbTooltip is a small piece of contextual information about an element on the screen, which is displayed when a user hovers or focuses on the element it is describing.
 */
export default {
  name: 'SbTooltip',

  props: {
    label: {
      type: String
    },
    position: {
      type: String,
      default: 'top',
      validator: position => includes(availablePositions, position)
    }
  },

  render (h) {
    const tooltipProps = {
      staticClass: `sb-tooltip sb-tooltip--${this.position}`
    }

    const renderTooltipLabel = () => {
      return h('span', {
        staticClass: 'sb-tooltip__label'
      }, this.label)
    }

    const children = [
      ...this.$slots.default,
      this.label && renderTooltipLabel()
    ]

    return h('div', tooltipProps, children)
  }
}
