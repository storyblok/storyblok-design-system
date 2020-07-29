const SbBreadcrumbLink = {
  name: 'SbBreadcrumbLink',
  functional: true,
  props: {
    title: String,
    target: String,
    as: String,
    label: String,
    // router-link props and derivatives
    append: Boolean,
    disabled: Boolean,
    exact: Boolean,
    exactActiveClass: String,
    link: Boolean,
    href: String,
    to: [String, Object],
    replace: Boolean
  },
  render (h, { props }) {
    const { label } = props

    // if href exists, we understand that's expected a <a> tag
    if (props.href) {
      return h('a', {
        attrs: {
          title: props.title,
          href: props.href,
          target: props.target
        }
      }, label)
    }

    // otherwise, that's expected a <router-link> tag and derivatives, like <nuxt-link>
    return h(props.as, {
      props: {
        ...props
      }
    }, label)
  }
}

const getLabelTruncated = label => `${label.slice(0, 13)}...`

const SbBreadcrumbItem = {
  name: 'SbBreadcrumbItem',

  functional: true,

  props: {
    isActive: Boolean,
    label: String,
    title: String,
    href: String,
    to: Object,
    as: {
      type: String,
      default: 'a'
    }
  },

  render (h, { props }) {
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

    const renderChildren = () => {
      if (!isActive) {
        return [
          h(SbBreadcrumbLink, {
            props: {
              title,
              href,
              to,
              as,
              label: labelFormated
            }
          })
        ]
      }

      return [labelFormated]
    }

    return h('li', breadcrumbsItemProps, renderChildren())
  }
}

export {
  SbBreadcrumbItem
}
