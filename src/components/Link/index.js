// other components
import { h } from 'vue'
import SbIcon from '../Icon'

// styles
import './link.scss'

/**
 * @vue/component
 *
 * SbLink component
 *
 * SbLink is a component used primarly to navigation
 */
const SbLink = (props, { slots }) => {
  const getAttrs = () => {
    const attrs = {}

    if (props.title) {
      attrs.title = props.title
    }

    if (props.as === 'a') {
      attrs.href = props.href
    }

    return attrs
  }

  const renderIcon = (icon) => {
    return h(SbIcon, {
      props: {
        size: 'normal',
        name: icon,
      },
    })
  }

  const renderLabel = () => {
    if (props.label) {
      return h(
        'span',
        {
          class: 'sb-link__label',
        },
        props.label
      )
    }

    if (slots.default()) {
      return h(
        'span',
        {
          class: 'sb-link__label',
        },
        slots.default()
      )
    }

    return null
  }

  const getProps = () => {
    const props = {}

    if (props.as !== 'a' && props.to) {
      props.to = props.to
    }

    return props
  }

  return h(
    props.as || 'a',
    {
      class: [
        'sb-link',
        props.icon && 'sb-link--has-icon',
        props.iconRight && 'sb-link--has-icon-right',
        props.variant && `sb-link--${props.variant}`,
      ],
      attrs: getAttrs(),
      props: getProps(),
    },
    [
      props.icon && renderIcon(props.icon),
      renderLabel(),
      props.iconRight && renderIcon(props.iconRight),
    ]
  )
}

SbLink.props = {
  as: {
    type: String,
    default: 'a',
  },
  label: {
    type: String,
    default: null,
  },
  href: {
    type: String,
    default: null,
  },
  icon: {
    type: String,
    default: null,
  },
  iconRight: {
    type: String,
    default: null,
  },
  title: {
    type: String,
    default: null,
  },
  to: {
    type: [String, Object],
    default: null,
  },
  variant: {
    type: String,
    default: '',
  },
}

export default SbLink
