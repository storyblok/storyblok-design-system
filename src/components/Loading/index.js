import './loading.scss'

import { loadingSizes } from './utils'

import SbIcon from '../Icon'

const SbLoading = {
  name: 'SbLoading',

  props: {
    type: {
      type: String,
      default: 'spinner'
    },
    size: {
      type: String,
      validator: (size) => loadingSizes.indexOf(size) !== -1
    },
    value: {
      type: Number,
      default: 0
    },
    showPercentage: {
      type: Boolean,
      default: false
    }
  },

  render (h) {
    const renderSpinnerLoading = () => {
      return h(SbIcon, {
        class: '',
        props: {
          size: this.size,
          name: 'loading'
        }
      })
    }

    const renderPercentage = (id) => {
      return h('label', {
        attrs: {
          class: 'sb-loading--label',
          for: id
        }
      }, [`${this.value}%`])
    }

    const renderProgressBarLoading = () => {
      return h('progress', {
        attrs: {
          class: 'sb-loading--bar',
          id: 'progres-bar-loading',
          value: this.value,
          min: 0,
          max: 100
        }
      })
    }

    return h('div', {
      staticClass: 'sb-loading'
    }, [
      this.type === 'spinner' ? renderSpinnerLoading() : renderProgressBarLoading(),
      this.showPercentage ? renderPercentage() : null
    ])
  }
}

export default SbLoading
