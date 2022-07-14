/**
 * @vue/component
 *
 * SbPaginationDot
 *
 * Render a dot button to change the page
 */
import i18n from '../../../i18n/index'
import { h } from 'vue'

export const SbPaginationDot = {
  name: 'SbPaginationDot',

  functional: true,

  props: {
    currentPage: {
      type: Number,
      required: true,
      default: 1,
    },
    page: {
      type: Number,
      required: true,
      default: 1,
    },
    locale: {
      type: String,
      required: false,
      default: 'en',
    },
  },

  render(_, { props, listeners }) {
    const { page, currentPage, locale } = props
    const isCurrent = currentPage === page
    return h('button', {
      staticClass: 'sb-pagination-dot',
      class: {
        'sb-pagination-dot--active': isCurrent,
      },
      attrs: {
        page,
        'aria-label': isCurrent
          ? `${i18n(locale, 'currentPage')} ${page}`
          : `${i18n(locale, 'goToPage')} ${page}`,
        'aria-current': isCurrent + '',
      },
      on: {
        ...listeners,
      },
    })
  },
}

/**
 * @vue/component
 *
 * SbPaginationCarousel
 *
 * Render a Pagination carousel style
 */
export const SbPaginationCarousel = {
  name: 'SbPaginationCarousel',

  props: {
    currentPage: {
      type: Number,
      required: true,
      default: 1,
    },
    pages: {
      type: Number,
      required: true,
      default: 10,
    },
    locale: {
      type: String,
      required: false,
      default: 'en',
    },
  },

  methods: {
    onChangePageButton(page) {
      this.$emit('change-page', page)
    },
  },

  render() {
    const paginationDots = []

    for (let pageNumber = 1; pageNumber <= this.pages; pageNumber++) {
      paginationDots.push(
        h(SbPaginationDot, {
          props: {
            page: pageNumber,
            currentPage: this.currentPage,
            locale: this.locale,
          },
          on: {
            click: () => {
              this.onChangePageButton(pageNumber)
            },
          },
        })
      )
    }

    return h(
      'nav',
      {
        staticClass: 'sb-pagination-carousel-container',
        attrs: {
          role: 'navigation',
          'aria-label': i18n(this.locale, 'paginationNavigation'),
        },
      },
      paginationDots
    )
  },
}
