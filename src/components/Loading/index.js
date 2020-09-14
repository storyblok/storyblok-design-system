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
    },
    color: {
      type: String,
      default: null
    }
  },

  render (h) {
    const renderSpinnerLoading = () => {
      return h(SbIcon, {
        props: {
          size: this.size || 'normal',
          name: 'loading',
          color: this.color
        }
      })
    }

    const renderPercentage = (from, id) => {
      return h('label', {
        attrs: {
          class: from,
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

    if (this.type === 'bar') {
      return h('div', {
        staticClass: 'sb-loading sb-loading--progress-bar'
      }, [
        renderProgressBarLoading(),
        this.showPercentage ? renderPercentage('sb-loading--bar-label') : null
      ])
    }

    if (this.type === 'spinner') {
      return h('div', {
        staticClass: `sb-loading sb-loading--spinner sb-loading--spinner-${this.size || 'normal'}`
      }, [
        renderSpinnerLoading(),
        this.showPercentage ? renderPercentage('sb-loading--spinner-label') : null
      ])
    }
  }
}

export default SbLoading
