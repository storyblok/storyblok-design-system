// other components
import SbIcon from '../Icon'
import SbLoading from '../Loading'

import { Tooltip } from '../../directives'
import { h } from 'vue'

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

  directives: {
    tooltip: Tooltip,
  },

  props: {
    hasIconOnly: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: null,
    },
    iconColor: {
      type: String,
      default: null,
    },
    iconSize: {
      type: String,
      default: 'normal',
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

  render() {
    const useTooltip = this.hasIconOnly && this.iconDescription

    const renderIcon = (icon, color) => {
      return h(SbIcon, {
        props: {
          size: this.iconSize,
          name: icon,
          color,
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

      if (this.$slots.default()) {
        return h(
          'span',
          {
            staticClass: 'sb-button__label',
          },
          this.$slots.default()
        )
      }

      return null
    }

    const renderButton = (content) => {
      return h(
        'button',
        {
          staticClass: `sb-button sb-button--${this.variant}`,
          attrs: {
            ...this.$attrs,
            disabled: this.isDisabled || this.isLoading,
            'aria-disabled': this.isDisabled || this.isLoading,
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
            click:
              !this.isDisabled || !this.isLoading
                ? ($event) => this.$emit('click', $event)
                : '',
          },
          directives: useTooltip
            ? [
                {
                  name: 'tooltip',
                  value: {
                    label: this.iconDescription,
                    position: this.tooltipPosition,
                  },
                },
              ]
            : null,
        },
        content
      )
    }

    const content = [
      this.icon && renderIcon(this.icon, this.iconColor),
      !this.hasIconOnly && renderLabel(),
      this.iconRight && renderIcon(this.iconRight, this.iconColor),
    ]

    if (this.isLoading) {
      const whiteLoading = [
        'primary',
        'secondary',
        'danger',
        'caution',
        'inverted-link',
        'primary-link',
      ]

      return renderButton([
        content,
        h(SbLoading, {
          props: {
            type: 'spinner',
            size: 'small',
            color:
              whiteLoading.indexOf(this.variant) < 4 ? 'white' : 'primary-dark',
          },
        }),
      ])
    }

    return renderButton(content)
  },
}

export default SbButton
