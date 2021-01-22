import './breadcrumbs.scss'

import { SbBreadcrumbItem } from './BreadcrumItem'
import SbIcon from '../Icon'

/**
 * @vue/component
 *
 * SbBreadcrumbDropdown component
 *
 * Dropdown that renders the additional items
 */
const SbBreadcrumbDropdown = {
  name: 'SbBreadcrumbDropdown',

  functional: true,

  props: {
    items: {
      type: Array,
      default: () => [],
    },
    active: Boolean,
  },

  render(h, { props }) {
    const renderChildren = () => {
      return h(
        'ul',
        {
          staticClass: 'sb-breadcrumbs__dropdown',
        },
        props.items.map((itemProps) => {
          return h(SbBreadcrumbItem, { props: itemProps })
        })
      )
    }

    return h(
      'li',
      {
        staticClass: 'sb-breadcrumbs__item',
      },
      ['...', props.active && renderChildren()]
    )
  },
}

/**
 * @vue/component
 *
 * SbBreadcrumbSeparator component
 *
 * Separator
 */
const SbBreadcrumbSeparator = {
  name: 'SbBreadcrumbSeparator',

  functional: true,

  props: {
    active: Boolean,
  },

  render(h, { props, listeners }) {
    return h(
      'li',
      {
        staticClass: 'sb-breadcrumbs__separator',
        class: {
          'sb-breadcrumbs__separator--active': props.active,
        },
        on: {
          ...listeners,
        },
      },
      [
        h(SbIcon, {
          props: {
            size: 'small',
            name: 'chevron-right',
          },
        }),
      ]
    )
  },
}

/**
 * @vue/component
 *
 * SbBreadcrumbs component
 *
 * Breadcrumbs container
 */
const SbBreadcrumbs = {
  name: 'SbBreadcrumbs',

  props: {
    items: {
      type: Array,
      default: () => [],
    },
    isLargeSection: Boolean,
  },

  data: () => ({
    showDropdown: false,
  }),

  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown
    },
  },

  render(h) {
    const breadcrumbsProps = {
      staticClass: 'sb-breadcrumbs',
      class: {
        'sb-breadcrumbs--large-section': this.isLargeSection,
      },
      attrs: {
        'aria-label': 'breadcrumb',
      },
    }

    // render the dropdown
    if (this.items.length > 6) {
      const firstElementProps = this.items[0] || {}
      const lastElementProps = this.items.slice(-1)[0] || {}
      const restElements = this.items.slice(1, -1)
      const children = [
        h(SbBreadcrumbItem, {
          props: firstElementProps,
        }),
        h(SbBreadcrumbSeparator),
        h(SbBreadcrumbDropdown, {
          props: {
            items: restElements,
            active: this.showDropdown,
          },
        }),
        h(SbBreadcrumbSeparator, {
          props: {
            active: this.showDropdown,
          },
          on: {
            click: this.toggleDropdown,
          },
        }),
        h(SbBreadcrumbItem, {
          props: lastElementProps,
        }),
      ]

      return h('nav', breadcrumbsProps, children)
    }

    const children = []

    for (const itemProps of this.items) {
      if (children.length) {
        children.push(h(SbBreadcrumbSeparator))
      }

      children.push(
        h(SbBreadcrumbItem, {
          props: itemProps,
        })
      )
    }

    return h('nav', breadcrumbsProps, [...children, this.$slots.default])
  },
}

export {
  SbBreadcrumbs,
  SbBreadcrumbItem,
  SbBreadcrumbDropdown,
  SbBreadcrumbSeparator,
}
