// other components
import SbIcon from '../Icon'

// styles
import './button.scss'

import { sharedProps } from './lib'

/**
 * SbButton component
 *
 * SbButton is a component used for clickable user interactions
 */
const SbButton = {
  name: 'SbButton',

  props: {
    hasIconOnly: {
      type: Boolean,
      default: false
    },
    iconAfter: {
      type: String,
      default: null
    },
    iconBefore: {
      type: String,
      default: null
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    isFullWidth: {
      type: Boolean,
      default: false
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    isRounded: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: null
    },
    ...sharedProps
  },

  render (h) {
    const renderIcon = (icon) => {
      return h(SbIcon, {
        props: {
          size: 'small',
          name: this.isLoading ? 'loading' : icon
        }
      })
    }

    const renderLabel = () => {
      if (this.label) {
        return h('span', {
          staticClass: 'sb-button__label'
        }, this.label)
      }

      if (this.$slots.default) {
        return h('span', {
          staticClass: 'sb-button__label'
        }, this.$slots.default)
      }

      return null
    }

    const renderButton = (content) => {
      return h('button', {
        staticClass: `sb-button sb-button--${this.type}`,
        attrs: {
          disabled: this.isDisabled,
          'aria-disabled': this.isDisabled
        },
        class: {
          'sb-button--disabled': this.isDisabled,
          'sb-button--small': this.size === 'small',
          'sb-button--large': this.size === 'large',
          'sb-button--full': this.isFullWidth,
          'sb-button--rounded': this.isRounded,
          'sb-button--has-icon-only': this.hasIconOnly,
          'sb-button--has-icon-before': this.iconBefore,
          'sb-button--has-icon-after': this.iconAfter
        },
        on: {
          click: (!this.isDisabled || !this.isLoading ? $event => this.$emit('click', $event) : '')
        }
      }, content)
    }

    if (this.isLoading) {
      return renderButton([renderIcon('loading')])
    }

    const content = [
      this.iconBefore && renderIcon(this.iconBefore),
      renderLabel(),
      this.iconAfter && renderIcon(this.iconAfter)
    ]

    return renderButton(content)
  }
}

export default SbButton
