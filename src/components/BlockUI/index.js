import './block.scss'
import { capitalize } from '../../utils'

const SbBlockUi = {
  name: 'SbBlockUi',
  inheritAttrs: false,
  props: {
    message: {
      type: String,
      default: null
    }
  },

  render (h) {
    const renderMessage = () => {
      if (this.message) {
        return h('p', {
          class: 'sb-block-ui--message'
        }, capitalize(this.message))
      }
    }

    return h('div', {
      class: 'sb-block-ui'
    },
    [
      renderMessage(),
      this.$slots.default
    ])
  }
}

export default SbBlockUi
