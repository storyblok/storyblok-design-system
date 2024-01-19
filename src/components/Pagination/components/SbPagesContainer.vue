<template>
  <div class="sb-pagination__pages-container">
    <SbPaginationSelect
      data-testid="page-select"
      :options="pagesOptions"
      :model-value="currentPage"
      @change="onSelectChange"
    />
    <SbPaginationPagesText :pages="pages" is-placeholder :locale="locale" />
  </div>
</template>

<script lang="ts">
import { SbPaginationSelect, SbPaginationPagesText } from './shared'
import { buildSelectOptions } from '../utils'
import i18n from '../../../i18n/index'

export default {
  name: 'SbPagesContainer',

  components: {
    SbPaginationSelect,
    SbPaginationPagesText,
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

  emits: ['page-change'],

  computed: {
    pagesOptions() {
      return buildSelectOptions(
        this.pages,
        (page) => i18n(this.locale, 'goToPage') + `${page}`,
      )
    },
  },

  methods: {
    onSelectChange(value) {
      this.$emit('page-change', value)
    },
  },
}
</script>
