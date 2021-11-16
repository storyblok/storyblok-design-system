import './tag.scss'

import { includes } from '../../utils'

import SbIcon from '../Icon'
import { Tooltip } from '../../directives'
import { tagTypes } from './lib'

// @vue/component
const SbTag = {
  name: 'SbTag',

  directives: {
    tooltip: Tooltip,
  },

  props: {
    closable: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: 'light',
      validator: (type) => includes(tagTypes, type),
    },
  },

  render(h) {
    const tagProps = {
      staticClass: `sb-tag sb-tag--${this.type}`,
      class: {
        'sb-tag--closable': this.closable,
      },
      attrs: {
        ...this.$attrs,
      },
      on: {
        ...this.$listeners,
      },
    }

    const renderClosableIcon = () => {
      return h(SbIcon, {
        props: {
          name: 'close',
          size: 'small',
        },
        on: {
          click: (event) => {
            this.$emit('close', event)
          },
        },
        directives: [
          {
            name: 'tooltip',
            value: {
              label: 'Remove',
              position: 'bottom',
            },
          },
        ],
      })
    }

    const children = [
      this.label || this.$slots.default,
      this.closable && renderClosableIcon(),
    ]

    return h('div', tagProps, children)
  },
}

export default SbTag
