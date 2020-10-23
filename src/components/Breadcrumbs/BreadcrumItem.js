import SbTooltip from '../Tooltip'

/**
 * @method getLabelTruncated
 * @param  {string} label
 * @return {string}
 */
const getLabelTruncated = label => `${label.slice(0, 13)}...`

const sharedLinkProps = {
  // general props
  as: {
    type: String,
    default: 'a'
  },
  label: {
    type: String,
    required: true,
    default: null
  },

  // <a> tag props
  title: String,
  target: String,

  // router-link props and derivatives
  append: Boolean,
  disabled: Boolean,
  exact: Boolean,
  exactActiveClass: String,
  link: Boolean,
  href: String,
  to: [String, Object],
  replace: Boolean
}

/**
 * @vue/component
 *
 * SbBreadcrumbLink component
 *
 * Link abstraction to handle with <a> tags and custom tags
 */
const SbBreadcrumbLink = {
  name: 'SbBreadcrumbLink',
  functional: true,
  props: {
    ...sharedLinkProps
  },
  render (h, { props, listeners }) {
    const { label } = props

    // if href exists, we understand that's expected a <a> tag
    if (props.href) {
      return h(props.as, {
        attrs: {
          title: props.title,
          href: props.href,
          target: props.target
        },
        on: {
          ...listeners
        }
      }, label)
    }

    // otherwise, that's expected a <router-link> tag and derivatives, like <nuxt-link>
    return h(props.as, {
      props: {
        ...props
      },
      on: {
        ...listeners
      }
    }, label)
  }
}

/**
 * @vue/component
 *
 * SbBreadcrumbItem component
 *
 * Breadcrumb item that renders just a text or a SbBreadcrumbLink
 */
const SbBreadcrumbItem = {
  name: 'SbBreadcrumbItem',

  functional: true,

  props: {
    isActive: Boolean,
    ...sharedLinkProps
  },

  render (h, { props, listeners }) {
    const { isActive, label, title, href, to, as } = props
    const isTruncated = (label || '').length > 15
    const labelFormated = isTruncated ? getLabelTruncated(label) : label

    const breadcrumbsItemProps = {
      staticClass: 'sb-breadcrumbs__item',
      class: {
        'sb-breadcrumbs__item--active': isActive
      },
      attrs: {
        // to identify that the last link is the current page
        'aria-current': isActive ? 'page' : null
      }
    }

    const renderLabel = () => {
      if (!isActive) {
        return h(SbBreadcrumbLink, {
          props: {
            title,
            href,
            to,
            as,
            label: labelFormated
          },
          on: {
            ...listeners
          }
        })
      }

      return labelFormated
    }

    const renderChildren = () => {
      if (isTruncated) {
        return [
          h(SbTooltip, {
            props: {
              position: 'bottom',
              label
            }
          }, [renderLabel()])
        ]
      }

      return [renderLabel()]
    }

    return h('li', breadcrumbsItemProps, renderChildren())
  }
}

export {
  SbBreadcrumbLink,
  SbBreadcrumbItem
}
