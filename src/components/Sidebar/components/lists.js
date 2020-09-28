import SbIcon from '../../Icon'

/**
 * SbSidebarList component
 *
 * Render a list container to SbSidebarLink component
 */
const SbSidebarList = {
  name: 'SbSidebarList',

  functional: true,

  render (h, { slots }) {
    return h('ul', {
      staticClass: 'sb-sidebar-list',
      attrs: {
        role: 'navigation'
      }
    }, slots().default)
  }
}

/**
 * SbSidebarLink component
 *
 * Render a list item to SbSidebar list and may render a single item
 */
const SbSidebarLink = {
  name: 'SbSidebarLink',

  props: {
    active: {
      type: Boolean,
      default: false
    },
    ariaLabel: {
      type: String,
      default: null
    },
    as: {
      type: String,
      default: 'a'
    },
    label: {
      type: String,
      default: null
    },
    href: {
      type: String
    },
    icon: {
      type: String,
      default: null
    },
    to: {
      type: String,
      default: null
    }
  },

  functional: true,

  render (h, { props, listeners, data }) {
    const renderLabel = () => {
      return h('span', {
        staticClass: 'sb-sidebar-link__label'
      }, props.label)
    }

    const renderIcon = () => {
      return h(SbIcon, {
        props: {
          size: 'small',
          name: props.icon
        }
      })
    }

    const ariaLabel = props.active
      ? props.ariaLabel + ', Current Page'
      : props.ariaLabel

    return h(props.as, {
      staticClass: 'sb-sidebar-link',
      class: {
        'sb-sidebar-link--active': props.active
      },
      attrs: {
        ...data.attrs,
        'aria-label': ariaLabel || null,
        'aria-current': props.active && props.active + '',
        href: props.href || null
      },
      props: {
        to: props.to || null
      },
      on: {
        ...listeners
      }
    }, [
      renderIcon(),
      renderLabel()
    ])
  }
}

export {
  SbSidebarList,
  SbSidebarLink
}
