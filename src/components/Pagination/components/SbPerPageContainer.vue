<template>
  <div class="sb-pagination__per-page-container">
    <span>{{ selectPerPageTranslated }}</span>
    <SbPaginationSelect
      data-testid="per-page-select"
      :options="perPageOptions"
      :value="perPage"
      @change="onSelectChange"
    />
    <SbPaginationItemsText
      :total="total"
      :current-page="currentPage"
      :pages="pages"
      :per-page="perPage"
      is-placeholder
      :locale="locale"
    />
  </div>
</template>

<script>
import { factorySelectOption } from '../utils'
import i18n from '../../../i18n/index'

import { SbPaginationSelect, SbPaginationItemsText } from './shared'

export default {
  name: 'SbPerPageContainer',

  components: {
    SbPaginationSelect,
    SbPaginationItemsText,
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
    perPage: {
      type: Number,
      required: true,
      default: 1,
    },
    perPageAvailable: {
      type: Array,
      default: () => [],
    },
    total: {
      type: Number,
      required: true,
      default: 100,
    },
    locale: {
      type: String,
      required: false,
      default: 'en',
    },
  },

  computed: {
    selectPerPageTranslated() {
      return i18n(this.locale, 'selectPerPage')
    },
    perPageOptions() {
      return this.perPageAvailable.map((perPage) => {
        return factorySelectOption(
          perPage,
          (value) =>
            i18n(this.locale, 'selectPerPage') +
            ` ${value} ` +
            i18n(this.locale, 'items')
        )
      })
    },
  },

  methods: {
    onSelectChange(value) {
      this.$emit('per-page-change', value)
    },
  },
}
</script>
