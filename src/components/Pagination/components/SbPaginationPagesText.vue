<template>
  <span
    :class="{ 'sb-pagination__placeholder': isPlaceholder }"
    data-testid="pagination-pages-information"
  >
    {{ text }}
  </span>
</template>

<script lang="ts">
import i18n from '../../../i18n/index'

export default {
  name: 'SbPaginationPagesText',

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
    locale: {
      type: String,
      required: false,
      default: 'en',
    },
  },

  computed: {
    text() {
      const { currentPage, showCurrentPage, pages, locale } = this
      let text = ''
      const ofTranslated = i18n(locale, 'of')
      const pageTranslated = i18n(locale, 'page')
      const pagesTranslated = i18n(locale, 'pages')

      if (pages === 1) {
        text = showCurrentPage
          ? `${currentPage} ${ofTranslated} ${pages} ${pageTranslated}` // to compact container
          : `${ofTranslated} ${pages} ${pageTranslated}` // to other container types
      } else {
        text = showCurrentPage
          ? `${currentPage} ${ofTranslated} ${pages} ${pagesTranslated}` // to compact container
          : `${ofTranslated} ${pages} ${pagesTranslated}` // to other container types
      }

      return text
    },
  },
}
</script>
