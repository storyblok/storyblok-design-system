<template>
  <tr
    class="sb-data-table__row"
    :class="{
      'sb-data-table__row--selected': isSelected && allowSelection,
    }"
  >
    <td
      v-if="allowSelection && row.selectable !== false"
      class="sb-data-table__body-cell sb-data-table__col-selection"
    >
      <SbCheckbox :id="rowId"
v-model="isSelected" />
    </td>

    <td
      v-else-if="allowSelection && row.selectable === false"
      class="sb-data-table__body-cell sb-data-table__col-locked"
    >
      <SbIcon name="lock" />
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
import SbIcon from '../../Icon'
import sharedProps from '../sharedProps'

export default {
  name: 'SbDataTableBodyRow',

  components: {
    SbCheckbox,
    SbIcon,
  },

  inject: ['dataTableContext'],

  props: {
    allowSelection: sharedProps.allowSelection,
    headers: sharedProps.headers,
    selectedRows: sharedProps.selectedItems,
    row: {
      type: [Object, Array],
      default: () => ({}),
    },
    rowId: {
      type: String,
      default: '',
    },
  },

  computed: {
    context() {
      return this.dataTableContext()
    },
    mainColumnIndex() {
      return this.headers.findIndex((col) => col.main)
    },
    isSelected: {
      get() {
        return this.selectedRows?.some(
          (row) => JSON.stringify(row) === JSON.stringify(this.row)
        )
      },
      set() {
        this.handleRowSelected()
      },
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
