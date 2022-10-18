<template>
  <td class="sb-data-table__body-cell" :width="width">
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
  },
}
</script>
