<template>
  <tr
    class="sb-data-table__row"
    :class="{
      'sb-data-table__row--selected': isSelected && allowSelection,
    }"
  >
    <td
      v-if="allowSelection"
      class="sb-data-table__body-cell sb-data-table__col-selection"
      @click="handleRowSelected"
    >
      <SbCheckbox :value="isSelected" @click="handleRowSelected" />
    </td>

    <slot v-if="$slots.default" />

    <td
      v-for="(elem, index) in headers"
      v-else
      :key="index"
      class="sb-data-table__body-cell"
      :class="{
        'sb-data-table__col-main': mainColumnIndex === index,
      }"
    >
      {{ row[elem.value] }}
    </td>
  </tr>
</template>

<script>
import SbCheckbox from '../../Checkbox'
import sharedProps from '../sharedProps'

export default {
  name: 'SbDataTableBodyRow',

  components: {
    SbCheckbox,
  },

  inject: ['dataTableContext'],

  props: {
    allowSelection: sharedProps.allowSelection,
    headers: sharedProps.headers,
    selectedRows: sharedProps.selectedRows,
    row: {
      type: [Object, Array],
      default: () => ({}),
    },
  },

  computed: {
    context() {
      return this.dataTableContext()
    },
    mainColumnIndex() {
      return this.headers.findIndex((col) => col.main)
    },
    isSelected() {
      return this.selectedRows.some(
        (row) => JSON.stringify(row) === JSON.stringify(this.row)
      )
    },
  },

  methods: {
    handleRowSelected() {
      if (!this.allowSelection) return

      this.isSelected
        ? this.context.deselectRow(this.row)
        : this.context.selectRow(this.row)
    },
  },
}
</script>
