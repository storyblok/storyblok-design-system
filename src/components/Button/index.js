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
const SbButton = (props, {slots, attrs}) => {
    const useTooltip = props.hasIconOnly && props.iconDescription

    const renderIcon = (icon, color) => {
      return h(SbIcon, {
        props: {
          size: props.iconSize,
          name: icon,
          color,
        },
      })
    }

    const renderLabel = () => {
      if (props.label) {
        return h(
          'span',
          {
            class: 'sb-button__label',
          },
          props.label
        )
      }

      if (slots.default()) {
        return h(
          'span',
          {
            class: 'sb-button__label',
          },
          slots.default()
        )
      }

      return null
    }

    const renderButton = (content) => {
      return h(
        'button',
        {
          attrs: {
            ...attrs,
            disabled: props.isDisabled || props.isLoading,
            'aria-disabled': props.isDisabled || props.isLoading,
            type: props.type,
          },
          class: {
            'sb-button': true,
            [`sb-button--${props.variant}`]: true,
            'sb-button--disabled': props.isDisabled,
            'sb-button--small': props.size === 'small',
            'sb-button--large': props.size === 'large',
            'sb-button--full': props.isFullWidth,
            'sb-button--rounded': props.isRounded,
            'sb-button--has-icon-only': props.hasIconOnly,
            'sb-button--has-icon': props.icon,
            'sb-button--has-icon-right': props.iconRight,
            'sb-button--loading': props.isLoading,
          },
          on: {
            click:
              !props.isDisabled || !props.isLoading
                ? ($event) => props.$emit('click', $event)
                : '',
          },
          directives: useTooltip
            ? [
                {
                  name: 'tooltip',
                  value: {
                    label: props.iconDescription,
                    position: props.tooltipPosition,
                  },
                },
              ]
            : null,
        },
        content
      )
    }

    const content = [
      props.icon && renderIcon(props.icon, props.iconColor),
      !props.hasIconOnly && renderLabel(),
      props.iconRight && renderIcon(props.iconRight, props.iconColor),
    ]

    if (props.isLoading) {
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
              whiteLoading.indexOf(props.variant) < 4 ? 'white' : 'primary-dark',
          },
        }),
      ])
    }

    return renderButton(content)
}

SbButton.props = {
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
}

SbButton.directives = {
  tooltip: Tooltip,
}

export default SbButton
