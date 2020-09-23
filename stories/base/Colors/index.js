import './colors.scss'

const SbColors = {
  name: 'SbColors',

  props: {
    colorName: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: null
    }
  },

  render (h) {
    const renderColor = () => {
      return h('div', {
        staticClass: 'sb-colors',
        style: {
          background: `${this.colorName}`
        }
      })
    }

    const renderName = () => {
      return h('span', this.name)
    }

    const renderHex = () => {
      return h('span', this.colorName)
    }

    return h('div', {
      staticClass: 'sb-colors--container'
    },
    [
      renderColor(),
      renderName(),
      renderHex()
    ])
  }
}

export default SbColors
