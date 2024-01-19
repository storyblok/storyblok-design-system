<template>
  <span
    :class="{ 'sb-pagination__placeholder': isPlaceholder }"
    data-testid="pagination-items-information"
  >
    {{ text }}
  </span>
</template>

<script lang="ts">
import i18n from '../../../i18n/index'

export default {
  name: 'SbPaginationItemsText',

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
    locale: {
      type: String,
      required: false,
      default: 'en',
    },
  },

  computed: {
    text() {
      const { currentPage, pages, perPage, total, locale } = this
      const isTheLastPage = currentPage === pages
      const currentPageItems = currentPage * perPage
      const firstCurrentPageItem =
        currentPage === 1 ? 1 : currentPageItems - perPage + 1
      const lastCurrentPageItem =
        currentPage === 1 ? perPage : isTheLastPage ? total : currentPageItems

      let text = ''
      const ofTranslated = i18n(locale, 'of')
      const itemsTranslated = i18n(locale, 'items')

      if (firstCurrentPageItem === 1 && lastCurrentPageItem >= total) {
        text = `${firstCurrentPageItem}-${total} ${ofTranslated} ${total} ${itemsTranslated}`
      } else {
        text = `${firstCurrentPageItem}-${lastCurrentPageItem} ${ofTranslated} ${total} ${itemsTranslated}`
      }

      return text
    },
  },
}
</script>
