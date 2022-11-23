<template>
  <nav
    class="sb-pagination-carousel-container"
    role="navigation"
    :aria-label="ariaLabel"
  >
    <SbPaginationDot
      v-for="pageNumber in pages"
      :key="pageNumber"
      :page="pageNumber"
      :current-page="currentPage"
      :locale="locale"
      @click="onChangePageButton(pageNumber)"
    />
  </nav>
</template>

<script>
import SbPaginationDot from './SbPaginationDot.vue'
import i18n from '../../../i18n/index'

export default {
  name: 'SbPaginationCarousel',

  components: {
    SbPaginationDot,
  },

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

  emits: ['change-page'],

  computed: {
    ariaLabel() {
      return i18n(this.locale, 'paginationNavigation')
    },
  },

  methods: {
    onChangePageButton(page) {
      this.$emit('change-page', page)
    },
  },
}
</script>
