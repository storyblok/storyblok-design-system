import './block.scss'
import { h } from 'vue'

const SbBlockUi = {
  name: 'SbBlockUi',
  inheritAttrs: false,

  render() {
    return h(
      'div',
      {
        class: 'sb-block-ui',
        attrs: this.$attrs,
      },
      [this.$slots.default()]
    )
  },
}

export default SbBlockUi
