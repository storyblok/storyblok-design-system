import SbIcon from '../../Icon'
import SbSelect from '../../Select'
import { Tooltip } from '../../../directives'

/**
 * @vue/component
 *
 * SbPaginationButton
 *
 * Render the arrow buttons in Pagination
 */
export const SbPaginationButton = {
  name: 'SbPaginationButton',

  functional: true,

  directives: {
    tooltip: Tooltip,
  },

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      required: true,
    },
    tooltipLabel: {
      type: String,
      required: true,
    },
  },

  render(h, { props, listeners, data }) {
    const { icon, tooltipLabel, disabled } = props

    return h(
      'button',
      {
        staticClass: 'sb-pagination__button',
        attrs: {
          disabled,
          ...(data.attrs || {}),
        },
        class: {
          'sb-pagination__button--disabled': disabled,
        },
        on: {
          ...listeners,
        },
        directives: [
          {
            name: 'tooltip',
            value: {
              label: tooltipLabel,
              position: 'bottom',
            },
          },
        ],
      },
      [
        h(SbIcon, {
          props: {
            name: icon,
            size: 'normal',
          },
        }),
      ]
    )
  },
}

/**
 * @vue/component
 *
 * SbPaginationPagesText
 *
 * Render the pages information
 */
export const SbPaginationPagesText = {
  name: 'SbPaginationPagesText',

  functional: true,

  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    isPlaceholder: {
      type: Boolean,
      default: false,
    },
    pages: {
      type: Number,
      default: 1,
    },
    showCurrentPage: {
      type: Boolean,
      default: false,
    },
    sbTranslations: {
      type: Object,
      required: true,
    },
  },

  render(h, { props }) {
    const {
      currentPage,
      showCurrentPage,
      isPlaceholder,
      pages,
      sbTranslations,
    } = props
    let text = ''
    if (pages === 1) {
      text = showCurrentPage
        ? `${currentPage} ${sbTranslations.of} ${pages} ${sbTranslations.page}` // to compact container
        : `${sbTranslations.of} ${pages} ${sbTranslations.page}` // to other container types
    } else {
      text = showCurrentPage
        ? `${currentPage} ${sbTranslations.of} ${pages} ${sbTranslations.page}s` // to compact container
        : `${sbTranslations.of} ${pages} ${sbTranslations.page}s` // to other container types
    }

    return h(
      'span',
      {
        class: {
          'sb-pagination__placeholder': isPlaceholder,
        },
        attrs: {
          'data-testid': 'pagination-pages-information',
        },
      },
      text
    )
  },
}

/**
 * @vue/component
 *
 * SbPaginationItemsText
 *
 * Render the information about items in current page
 */
export const SbPaginationItemsText = {
  name: 'SbPaginationItemsText',

  functional: true,

  props: {
    currentPage: {
      type: Number,
      required: true,
      default: 1,
    },
    isPlaceholder: {
      type: Boolean,
      default: false,
    },
    pages: {
      type: Number,
      required: true,
      default: 10,
    },
    perPage: {
      type: Number,
      default: 10,
    },
    total: {
      type: Number,
      default: 100,
    },
    sbTranslations: {
      type: Object,
      required: true,
    },
  },

  render(h, { props }) {
    const {
      currentPage,
      isPlaceholder,
      pages,
      perPage,
      total,
      sbTranslations,
    } = props
    const isTheLastPage = currentPage === pages
    const currentPageItems = currentPage * perPage
    const firstCurrentPageItem =
      currentPage === 1 ? 1 : currentPageItems - perPage + 1
    const lastCurrentPageItem =
      currentPage === 1 ? perPage : isTheLastPage ? total : currentPageItems

    let text = ''

    if (firstCurrentPageItem === 1 && lastCurrentPageItem >= total) {
      text = `${firstCurrentPageItem}-${total} ${sbTranslations.of} ${total} ${sbTranslations.items}`
    } else {
      text = `${firstCurrentPageItem}-${lastCurrentPageItem} ${sbTranslations.of} ${total} ${sbTranslations.items}`
    }

    return h(
      'span',
      {
        class: {
          'sb-pagination__placeholder': isPlaceholder,
        },
        attrs: {
          'data-testid': 'pagination-items-information',
        },
      },
      text
    )
  },
}

/**
 * @vue/component
 *
 * SbPaginationSelect
 *
 * Wrapper for selects elements in Pagination component
 */
export const SbPaginationSelect = {
  name: 'SbPaginationSelect',

  props: {
    options: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Number,
      default: 1,
    },
  },

  methods: {
    onSelectInput(value) {
      this.$emit('change', value)
    },
  },

  render(h) {
    const parsedOpts = this.options.map((option) => {
      return {
        ...option,
        label: `${option.label}`,
      }
    })

    return h(SbSelect, {
      props: {
        options: parsedOpts,
        label: `${this.value}`,
        inline: true,
        showListOnTop: true,
      },
      on: {
        input: this.onSelectInput,
      },
    })
  },
}
