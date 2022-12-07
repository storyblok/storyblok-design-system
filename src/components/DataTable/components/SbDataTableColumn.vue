<template>
  <td class="sb-data-table__body-cell" :class="computedClasses" :width="width">
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
    value: {
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
  },
  computed: {
    computedClasses() {
      return this.isContentCentered ? 'sb-data-table__body-cell--centered' : ''
    },
  },
}
</script>
