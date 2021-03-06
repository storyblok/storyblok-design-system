import './block.scss'

const SbBlockUi = {
  name: 'SbBlockUi',
  inheritAttrs: false,

  render(h) {
    return h(
      'div',
      {
        class: 'sb-block-ui',
        on: this.$listeners,
        attrs: this.$attrs,
      },
      [this.$slots.default]
    )
  },
}

export default SbBlockUi
