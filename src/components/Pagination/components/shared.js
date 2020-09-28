import SbIcon from '../../Icon'
import SbTooltip from '../../Tooltip'

/**
 * SbPaginationButton
 *
 * Render the arrow buttons in Pagination
 */
export const SbPaginationButton = {
  name: 'SbPaginationButton',

  functional: true,

  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String
    },
    tooltipLabel: {
      type: String
    }
  },

  render (h, { props, listeners, data }) {
    const { icon, tooltipLabel, disabled } = props

    return h(SbTooltip, {
      props: {
        label: tooltipLabel,
        position: 'bottom'
      }
    }, [
      h('button', {
        staticClass: 'sb-pagination__button',
        attrs: {
          disabled,
          ...data.attrs || {}
        },
        class: {
          'sb-pagination__button--disabled': disabled
        },
        on: {
          ...listeners
        }
      }, [
        h(SbIcon, {
          props: {
            name: icon,
            size: 'small'
          }
        })
      ])
    ])
  }
}

/**
 * SbPaginationPagesText
 *
 * Render the pages information
 */
export const SbPaginationPagesText = {
  name: 'SbPaginationPagesText',

  functional: true,

  props: {
    currentPage: {
      type: Number
    },
    isPlaceholder: {
      type: Boolean,
      default: false
    },
    pages: {
      type: Number,
      default: 1
    }
  },

  render (h, { props }) {
    const { currentPage, isPlaceholder, pages } = props
    const hasCurrentPage = currentPage >= 0
    const text = hasCurrentPage
      ? `${currentPage} of ${pages} pages`
      : `of ${pages} pages`

    return h('span', {
      class: {
        'sb-pagination__placeholder': isPlaceholder
      },
      attrs: {
        'data-testid': 'pagination-pages-information'
      }
    }, text)
  }
}

/**
 * SbPaginationItemsText
 *
 * Render the information about items in current page
 */
export const SbPaginationItemsText = {
  name: 'SbPaginationItemsText',

  functional: true,

  props: {
    currentPage: {
      type: Number
    },
    isPlaceholder: {
      type: Boolean,
      default: false
    },
    pages: {
      type: Number
    },
    perPage: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 100
    }
  },

  render (h, { props }) {
    const { currentPage, isPlaceholder, pages, perPage, total } = props
    const isTheLastPage = currentPage === pages
    const currentPageItems = (currentPage * perPage)
    const firstCurrentPageItem = currentPage === 1
      ? 1
      : (currentPageItems - perPage) + 1
    const lastCurrentPageItem = currentPage === 1
      ? perPage
      : isTheLastPage
        ? total
        : currentPageItems

    const text = `${firstCurrentPageItem}-${lastCurrentPageItem} of ${total} items`

    return h('span', {
      class: {
        'sb-pagination__placeholder': isPlaceholder
      },
      attrs: {
        'data-testid': 'pagination-items-information'
      }
    }, text)
  }
}

/**
 * SbPaginationSelect
 *
 * Wrapper for selects elements in Pagination component
 */
export const SbPaginationSelect = {
  name: 'SbPaginationSelect',

  functional: true,

  props: {
    options: {
      type: Array,
      default: () => []
    },
    value: {
      type: Number
    }
  },

  render (h, { props, listeners, data }) {
    const { options } = props

    const processAriaLabel = (option) => {
      const { ariaLabel, value } = option
      return props.value === value ? `${ariaLabel}, Current` : ariaLabel
    }

    return h('select', {
      attrs: { ...data.attrs || {} },
      staticClass: 'sb-pagination__select',
      on: {
        ...listeners
      }
    }, [
      ...options.map(option => {
        return h('option', {
          attrs: {
            ...(option.ariaLabel && { 'aria-label': processAriaLabel(option) }),
            value: option.value,
            selected: props.value === option.value
          }
        }, option.label)
      })
    ])
  }
}
