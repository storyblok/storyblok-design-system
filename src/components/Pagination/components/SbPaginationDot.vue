<template>
  <button
    class="sb-pagination-dot"
    :class="{
      'sb-pagination-dot--active': isCurrent,
    }"
    :page="page"
    :aria-label="ariaLabel"
    :aria-current="isCurrent"
    v-on="$listeners"
  />
</template>

<script>
import i18n from '../../../i18n/index'

export default {
  name: 'SbPaginationDot',

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

  computed: {
    isCurrent() {
      return this.currentPage === this.page
    },
    ariaLabel() {
      return this.isCurrent
        ? `${i18n(this.locale, 'currentPage')} ${this.page}`
        : `${i18n(this.locale, 'goToPage')} ${this.page}`
    },
  },
}
</script>
