import './typography.scss'

const SbTypography = {
  name: 'SbTypography',

  render (h) {
    const renderTypos = () => {
      return h('div', {
        staticClass: 'sb-typography'
      })
    }

    return h('div', {
      staticClass: 'sb-typography--container'
    },
    [
      renderTypos()
    ])
  }
}

export default SbTypography
