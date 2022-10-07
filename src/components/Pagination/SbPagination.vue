<template>
  <div class="sb-pagination" :class="computedClasses">
    <template v-if="carousel || compact">
      <SbPaginationButton
        data-testid="pagination-previous-button"
        icon="chevron-left"
        :tooltip-label="i18n(locale, 'previousPage')"
        :disabled="isFirstDisabled"
        @click="handlePreviousPage"
      />
      <SbPaginationCarousel
        v-if="carousel"
        :pages="pages"
        :current-page="value"
        :locale="locale"
        @change-page="onPageChange"
      />
      <SbPaginationPagesText
        v-else-if="compact"
        :pages="pages"
        :current-page="value"
        show-current-page
        :locale="locale"
      />

      <SbPaginationButton
        data-testid="pagination-next-button"
        icon="chevron-right"
        :tooltip-label="i18n(locale, 'nextPage')"
        :disabled="isLastDisabled"
        @click="handleNextPage"
      />
    </template>
    <template v-else>
      <SbPerPageContainer
        :total="total"
        :per-page="perPage"
        :current-page="value"
        :pages="pages"
        :per-page-available="perPageAvailable"
        :locale="locale"
        @per-page-change="onPerPageChange"
      />
      <SbPagesContainer
        :pages="pages"
        :current-page="value"
        :locale="locale"
        @page-change="onPageChange"
      />
      <SbPaginationButton
        data-testid="pagination-previous-button"
        icon="chevron-left"
        :tooltip-label="i18n(locale, 'previousPage')"
        :disabled="isFirstDisabled"
        @click="handlePreviousPage"
      />
      <SbPaginationButton
        data-testid="pagination-next-button"
        icon="chevron-right"
        :tooltip-label="i18n(locale, 'nextPage')"
        :disabled="isLastDisabled"
        @click="handleNextPage"
      />
    </template>
  </div>
</template>

<script>
import i18n from '../../i18n/index'

import { Tooltip } from '../../directives'

import {
  SbPaginationButton,
  SbPagesContainer,
  SbPaginationPagesText,
  SbPerPageContainer,
  SbPaginationCarousel,
} from './components'

const DEFAULT_ROWS_PER_PAGE_DROPDOWN = [25, 50, 75, 100]

export default {
  name: 'SbPagination',

  components: {
    SbPerPageContainer,
    SbPagesContainer,
    SbPaginationButton,
    SbPaginationPagesText,
    SbPaginationCarousel,
  },

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
      const shouldShowCustomPage = this.customPerPageOptions?.length > 0

      return shouldShowCustomPage
        ? this.customPerPageOptions
        : DEFAULT_ROWS_PER_PAGE_DROPDOWN
    },
    computedClasses() {
      return {
        'sb-pagination--full-width': this.isFullWidth,
        'sb-pagination--carousel': this.carousel,
        'sb-pagination--compact': this.compact,
      }
    },
  },

  methods: {
    i18n,
    handlePreviousPage() {
      if (!this.isFirstDisabled) {
        this.updateValue(this.value - 1)
        this.$emit('on-previous-page', this.value - 1)
      }
    },
    handleNextPage() {
      if (!this.isLastDisabled) {
        this.updateValue(this.value + 1)
        this.$emit('on-next-page', this.value + 1)
      }
    },
    onPageChange(page) {
      this.$emit('page-change', page)
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
}
</script>
