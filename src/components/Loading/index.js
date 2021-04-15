import './loading.scss'

import { loadingSizes } from './utils'

import SbIcon from '../Icon'
import SbBlockUI from '../BlockUI'

const SbLoading = {
  name: 'SbLoading',

  props: {
    type: {
      type: String,
      default: 'spinner',
    },
    size: {
      type: String,
      validator: (size) => loadingSizes.indexOf(size) !== -1,
    },
    value: {
      type: [Number, String],
      default: 0,
    },
    showPercentage: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: null,
    },
    uiBlock: {
      type: Boolean,
      default: false,
    },
  },

  render(h) {
    const renderSpinnerLoading = () => {
      return h(SbIcon, {
        props: {
          size: this.size || 'normal',
          name: 'loading',
          color: this.color,
        },
      })
    }

    const renderPercentage = (from, id) => {
      return h(
        'label',
        {
          attrs: {
            class: from,
            for: id,
          },
        },
        [`${parseInt(this.value)}%`]
      )
    }

    const renderProgressBarLoading = () => {
      return h('progress', {
        attrs: {
          class: 'sb-loading--bar',
          id: 'progres-bar-loading',
          value: parseInt(this.value),
          min: 0,
          max: 100,
        },
      })
    }

    const returnSizeOfSpinner = () => {
      if (this.type === 'spinner') {
        return `sb-loading--spinner-${this.size || 'normal'}`
      }
      return ''
    }

    const renderLoading = () => {
      return h(
        'div',
        {
          staticClass: 'sb-loading ' + returnSizeOfSpinner(),
          class: {
            'sb-loading--block': this.uiBlock,
            'sb-loading--progress-bar': this.type === 'bar',
            'sb-loading--spinner': this.type === 'spinner',
          },
        },
        [
          this.type === 'bar'
            ? renderProgressBarLoading()
            : renderSpinnerLoading(),
          this.showPercentage
            ? renderPercentage(
                this.type === 'bar'
                  ? 'sb-loading--bar-label'
                  : 'sb-loading--spinner-label'
              )
            : null,
        ]
      )
    }

    if (this.uiBlock) {
      return h(SbBlockUI, [renderLoading()])
    }
    return renderLoading()
  },
}

export default SbLoading
