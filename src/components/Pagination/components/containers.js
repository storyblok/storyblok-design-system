import { buildSelectOptions, factorySelectOption } from '../utils'

import {
  SbPaginationSelect,
  SbPaginationPagesText,
  SbPaginationItemsText
} from './shared'

/**
 * SbPagesContainer
 *
 * A container element to pages information when in default Pagination style
 */
export const SbPagesContainer = {
  name: 'SbPagesContainer',

  props: {
    currentPage: {
      type: Number
    },
    pages: {
      type: Number,
      default: 10
    }
  },

  methods: {
    onSelectChange (event) {
      this.$emit('page-change', Number(event.target.value))
    }
  },

  render (h) {
    const pagesOptions = buildSelectOptions(
      this.pages,
      page => `Go to page ${page}`
    )

    return h('div', {
      staticClass: 'sb-pagination__pages-container'
    }, [
      h(SbPaginationSelect, {
        attrs: {
          'data-testid': 'page-select'
        },
        props: {
          options: pagesOptions,
          value: this.currentPage
        },
        on: {
          change: this.onSelectChange
        }
      }),
      h(SbPaginationPagesText, {
        props: {
          pages: this.pages,
          isPlaceholder: true
        }
      })
    ])
  }
}

/**
 * SbPerPageContainer
 *
 * A container element to items and per page information when in default Pagination style
 */
export const SbPerPageContainer = {
  name: 'SbPerPageContainer',

  props: {
    currentPage: {
      type: Number
    },
    pages: {
      type: Number
    },
    perPage: {
      type: Number
    },
    perPageAvailable: {
      type: Array,
      default: () => []
    },
    total: {
      type: Number
    }
  },

  methods: {
    onSelectChange (event) {
      this.$emit('per-page-change', Number(event.target.value))
    }
  },

  render (h) {
    const perPageOptions = this.perPageAvailable.map(perPage => {
      return factorySelectOption(
        perPage, value => `Select per page ${value} items`
      )
    })

    return h('div', {
      staticClass: 'sb-pagination__per-page-container'
    }, [
      h('span', 'Items per page:'),
      h(SbPaginationSelect, {
        attrs: {
          'data-testid': 'per-page-select'
        },
        props: {
          options: perPageOptions,
          value: this.perPage
        },
        on: {
          change: this.onSelectChange
        }
      }),
      h(SbPaginationItemsText, {
        props: {
          total: this.total,
          currentPage: this.currentPage,
          pages: this.pages,
          perPage: this.perPage,
          isPlaceholder: true
        }
      })
    ])
  }
}
