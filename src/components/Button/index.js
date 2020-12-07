// other components
import SbIcon from '../Icon'
import SbLoading from '../Loading'
import SbTooltip from '../Tooltip'

// styles
import './button.scss'

import { sharedProps } from './lib'

/**
 * @vue/component
 *
 * SbButton component
 *
 * SbButton is a component used for clickable user interactions
 */
const SbButton = {
  name: 'SbButton',

  props: {
    hasIconOnly: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: null,
    },
    iconRight: {
      type: String,
      default: null,
    },
    iconDescription: {
      type: String,
      default: null,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    isFullWidth: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    isRounded: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: null,
    },
    tooltipPosition: {
      type: String,
      default: 'bottom',
    },
    ...sharedProps,
  },

  render(h) {
    const renderIcon = (icon) => {
      return h(SbIcon, {
        props: {
          size: 'small',
          name: icon,
        },
      })
    }

    const renderLabel = () => {
      if (this.label) {
        return h(
          'span',
          {
            staticClass: 'sb-button__label',
          },
          this.label
        )
      }

      if (this.$slots.default) {
        return h(
          'span',
          {
            staticClass: 'sb-button__label',
          },
          this.$slots.default
        )
      }

      return null
    }

    const renderButton = (content) => {
      return h(
        'button',
        {
          staticClass: `sb-button sb-button--${this.colorPalette}`,
          attrs: {
            ...this.$attrs,
            disabled: this.isDisabled,
            'aria-disabled': this.isDisabled,
            type: this.type,
          },
          class: {
            'sb-button--disabled': this.isDisabled,
            'sb-button--small': this.size === 'small',
            'sb-button--large': this.size === 'large',
            'sb-button--full': this.isFullWidth,
            'sb-button--rounded': this.isRounded,
            'sb-button--has-icon-only': this.hasIconOnly,
            'sb-button--has-icon': this.icon,
            'sb-button--has-icon-right': this.iconRight,
            'sb-button--loading': this.isLoading,
          },
          on: {
            ...this.$listeners,
            click:
              !this.isDisabled || !this.isLoading
                ? ($event) => this.$emit('click', $event)
                : '',
          },
        },
        content
      )
    }

    if (this.isLoading) {
      return renderButton([
        h(SbLoading, {
          props: {
            type: 'spinner',
            size: 'small',
            color:
              this.colorPalette === 'primary' ||
              this.colorPalette === 'secondary' ||
              this.colorPalette === 'danger'
                ? 'white'
                : 'primary-dark',
          },
        }),
      ])
    }

    const content = [
      this.icon && renderIcon(this.icon),
      !this.hasIconOnly && renderLabel(),
      this.iconRight && renderIcon(this.iconRight),
    ]

    if (this.hasIconOnly && this.iconDescription) {
      return h(
        SbTooltip,
        {
          props: {
            label: this.iconDescription,
            position: this.tooltipPosition,
          },
        },
        [renderButton(content)]
      )
    }

    return renderButton(content)
  },
}

export default SbButton
