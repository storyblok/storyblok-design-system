import './pagination.scss'
import i18n from './i18n/index'

import { Tooltip } from '../../directives'

import {
  SbPaginationButton,
  SbPaginationCarousel,
  SbPaginationPagesText,
  SbPagesContainer,
  SbPerPageContainer,
} from './components'

const DEFAULT_ROWS_PER_PAGE_DROPDOWN = [25, 50, 75, 100]

/**
 * @vue/component
 *
 * SbPagination
 *
 * The pagination element
 */
const SbPagination = {
  name: 'SbPagination',

  directives: {
    tooltip: Tooltip,
  },

  props: {
    carousel: {
      type: Boolean,
      default: false,
    },
    compact: {
      type: Boolean,
      default: false,
    },
    customPerPageOptions: {
      type: Array,
      default: () => [],
    },
    isFullWidth: {
      type: Boolean,
      default: false,
    },
    perPage: {
      type: Number,
      default: 10,
    },
    total: {
      type: Number,
      default: 100,
    },
    value: {
      type: Number,
      required: true,
    },
    locale: {
      type: String,
      required: false,
      default: 'en',
    },
  },

  computed: {
    pages() {
      return Math.ceil(this.total / this.perPage)
    },
    isFirstDisabled() {
      return this.value <= 1
    },
    isLastDisabled() {
      return this.value >= this.pages
    },
    perPageAvailable() {
      if (
        this.customPerPageOptions !== null &&
        Array.isArray(this.customPerPageOptions) &&
        this.customPerPageOptions.length !== 0
      ) {
        return this.customPerPageOptions
      }

      return DEFAULT_ROWS_PER_PAGE_DROPDOWN
    },
  },

  methods: {
    handlePreviousPage() {
      if (!this.isFirstDisabled) {
        this.updateValue(this.value - 1)
      }
    },
    handleNextPage() {
      if (!this.isLastDisabled) {
        this.updateValue(this.value + 1)
      }
    },
    onPageChange(page) {
      this.updateValue(page)
    },
    onPerPageChange(perPage) {
      this.$emit('per-page-change', perPage)
      this.updateValue(1)
    },
    updateValue(value) {
      this.$emit('input', value)
    },
  },

  render(h) {
    const leftArrowButton = h(SbPaginationButton, {
      attrs: {
        'data-testid': 'pagination-previous-button',
      },
      props: {
        icon: 'chevron-left',
        tooltipLabel: i18n(this.locale, 'previousPage'),
        disabled: this.isFirstDisabled,
      },
      on: {
        click: this.handlePreviousPage,
      },
    })

    const rightArrowButton = h(SbPaginationButton, {
      attrs: {
        'data-testid': 'pagination-next-button',
      },
      props: {
        icon: 'chevron-right',
        tooltipLabel: i18n(this.locale, 'nextPage'),
        disabled: this.isLastDisabled,
      },
      on: {
        click: this.handleNextPage,
      },
    })

    const renderChildren = () => {
      if (this.carousel) {
        return [
          leftArrowButton,
          h(SbPaginationCarousel, {
            props: {
              pages: this.pages,
              currentPage: this.value,
            },
            on: {
              'change-page': this.onPageChange,
            },
          }),
          rightArrowButton,
        ]
      }

      if (this.compact) {
        return [
          leftArrowButton,
          h(SbPaginationPagesText, {
            props: {
              pages: this.pages,
              currentPage: this.value,
              showCurrentPage: true,
              locale: this.locale,
            },
          }),
          rightArrowButton,
        ]
      }

      return [
        h(SbPerPageContainer, {
          props: {
            total: this.total,
            perPage: this.perPage,
            currentPage: this.value,
            pages: this.pages,
            perPageAvailable: this.perPageAvailable,
            locale: this.locale,
          },
          on: {
            'per-page-change': this.onPerPageChange,
          },
        }),
        h(SbPagesContainer, {
          props: {
            pages: this.pages,
            currentPage: this.value,
            locale: this.locale,
          },
          on: {
            'page-change': this.onPageChange,
          },
        }),
        leftArrowButton,
        rightArrowButton,
      ]
    }

    return h(
      'div',
      {
        staticClass: 'sb-pagination',
        class: {
          'sb-pagination--full-width': this.isFullWidth,
          'sb-pagination--carousel': this.carousel,
          'sb-pagination--compact': this.compact,
        },
      },
      renderChildren()
    )
  },
}

export default SbPagination
