import './tag.scss'

import { includes } from '../../utils'

import SbIcon from '../Icon'
import { tagTypes } from './lib'

const SbTag = {
  name: 'SbTag',

  props: {
    closable: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: 'light',
      validator: type => includes(tagTypes, type)
    }
  },

  render (h) {
    const tagProps = {
      staticClass: `sb-tag sb-tag--${this.type}`,
      class: {
        'sb-tag--closable': this.closable
      }
    }

    const renderClosableIcon = () => {
      return h(SbIcon, {
        props: {
          name: 'close',
          size: 'small'
        },
        on: {
          click: (event) => {
            this.$emit('close', event)
          }
        }
      })
    }

    const children = [
      this.label || this.$slots.default,
      this.closable && renderClosableIcon()
    ]

    return h('div', tagProps, children)
  }
}

export default SbTag
