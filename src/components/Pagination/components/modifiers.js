import { TranslationMixin } from '../../../mixins'

/**
 * @vue/component
 *
 * SbPaginationDot
 *
 * Render a dot button to change the page
 */
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
    sbTranslations: {
      type: Object,
      required: true,
    },
  },

  render(h, { props, listeners }) {
    const { page, currentPage, sbTranslations } = props
    const isCurrent = currentPage === page
    return h('button', {
      staticClass: 'sb-pagination-dot',
      class: {
        'sb-pagination-dot--active': isCurrent,
      },
      attrs: {
        page,
        'aria-label': isCurrent
          ? `${sbTranslations.currentPage} ${page}`
          : `${sbTranslations.gotoPage} ${page}`,
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

  mixins: [TranslationMixin],

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
  },

  methods: {
    onChangePageButton(page) {
      this.$emit('change-page', page)
    },
  },

  render(h) {
    const paginationDots = []

    for (let pageNumber = 1; pageNumber <= this.pages; pageNumber++) {
      paginationDots.push(
        h(SbPaginationDot, {
          props: {
            page: pageNumber,
            currentPage: this.currentPage,
            sbTranslations: this.$data.sbTranslations,
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
          'aria-label': this.$data.sbTranslations.paginationNavigation,
        },
      },
      paginationDots
    )
  },
}
