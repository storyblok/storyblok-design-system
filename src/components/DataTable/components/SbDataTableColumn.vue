<template>
  <td
    class="sb-data-table__body-cell"
    :class="computedClasses"
    :width="width"
    :is-sort-icon-always-visible="isSortIconAlwaysVisible"
  >
    <span v-if="showLabel" class="sb-data-table__body-cell-label"
      >{{ label }}:</span
    >
    <slot :row="row" />
  </td>
</template>

<script>
export default {
  name: 'SbDataTableColumn',
  props: {
    label: {
      type: String,
      default: null,
    },
    row: {
      type: Object,
      default: () => ({}),
    },
    sortable: {
      type: Boolean,
    },
    modelValue: {
      type: String,
      default: null,
    },
    width: {
      type: String,
      default: null,
    },
    isContentCentered: {
      type: Boolean,
      default: false,
    },
    isSortIconAlwaysVisible: {
      type: Boolean,
      default: false,
    },
    hideMobileLabel: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    computedClasses() {
      return this.isContentCentered ? 'sb-data-table__body-cell--centered' : ''
    },
    showLabel() {
      return this.label && !this.hideMobileLabel
    },
  },
}
</script>
