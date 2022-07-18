import './badge.scss'

import SbIcon from '../Icon'

import { badgeTypes, mapIconByTypes } from './lib'
import { isValidNumber } from '../../utils'
import { h } from 'vue'

// @vue/component
const SbBadge = {
  name: 'SbBadge',

  props: {
    inlineLabel: {
      type: Boolean,
      default: false,
    },
    contract: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: null,
    },
    number: {
      type: Number,
      default: null,
    },
    onlyIcon: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      required: true,
      validator: (type) => badgeTypes.indexOf(type) !== -1,
    },
  },

  render() {
    const badgeProps = {
      class: ['sb-badge', `sb-badge--${this.type}`,{
        'sb-badge--contract': this.contract,
        'sb-badge--only-icon': this.onlyIcon,
        'sb-badge--inline-label': this.inlineLabel,
      }],
    }

    const renderIcon = () => {
      return h(SbIcon, {
        props: {
          name: mapIconByTypes[this.type],
        },
      })
    }

    const renderLabel = () => {
      const textLabel = this.label || this.$slots?.default && this.$slots.default()
      const label = isValidNumber(this.number) ? this.number : textLabel

      return h(
        'span',
        {
          class: ['sb-badge__label'],
        },
        label
      )
    }

    const isRenderIcon = !this.contract && !isValidNumber(this.number)
    const hasLabelToRender =
      this.label || this.$slots?.default && this.$slots?.default() || isValidNumber(this.number)

    const children = [
      isRenderIcon && renderIcon(),
      hasLabelToRender && !this.contract && !this.onlyIcon && renderLabel(),
    ]

    return h('div', badgeProps, children)
  },
}

export default SbBadge
