<template>
  <thead :data-testid="dataTestid">
    <tr :data-testid="`${dataTestid}-list-column`">
      <th
        v-if="allowSelection && isMultiple"
        class="sb-data-table__head -cell"
        :data-testid="`${dataTestid}-checkbox-cell`"
      >
        <SbCheckbox
          v-model="isActive"
          :indeterminate="isIndeterminate"
          :data-testid="`${dataTestid}-checkbox`"
        />
      </th>
      <SbDataTableHeaderCell
        v-for="(elem, index) in headers"
        :key="index"
        :column="elem"
        :sorted-key="sortedKey"
        :data-testid="`${dataTestid}-cell__${index}`"
        :is-sort-icon-always-visible="isSortIconAlwaysVisible"
      />
    </tr>
  </thead>
</template>

<script>
import SbCheckbox from '../../Checkbox'
import SbDataTableHeaderCell from './SbDataTableHeaderCell'
import sharedProps from '../sharedProps'

export default {
  name: 'SbDataTableHeader',

  components: {
    SbCheckbox,
    SbDataTableHeaderCell,
  },

  inject: ['dataTableContext'],

  props: {
    allowSelection: sharedProps.allowSelection,
    headers: sharedProps.headers,
    selectedRows: sharedProps.selectedItems,
    selectionMode: sharedProps.selectionMode,
    sortedKey: {
      type: String,
      default: null,
    },
    allRowsSelected: {
      required: false,
      type: Boolean,
      default: true,
    },
    isSortIconAlwaysVisible: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    dataTestid() {
      return this.$attrs['data-testid'] || 'sb-data-table-header'
    },

    context() {
      return this.dataTableContext()
    },

    isIndeterminate() {
      return !this.allRowsSelected && !!this.selectedItemsLength
    },

    selectedItemsLength() {
      return this.selectedRows.length
    },

    isMultiple() {
      return this.selectionMode === 'multiple'
    },

    isActive: {
      get() {
        return this.allRowsSelected
      },
      set() {
        this.handleAllRowsSelected()
      },
    },
  },

  methods: {
    handleAllRowsSelected() {
      this.allRowsSelected
        ? this.context.deselectAll()
        : this.context.selectAll()
    },
  },
}
</script>
