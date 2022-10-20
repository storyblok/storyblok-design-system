<template>
  <thead>
    <tr>
      <th v-if="allowSelection && isMultiple" class="sb-data-table__head-cell">
        <SbCheckbox
          :indeterminate="isIndeterminate"
          :model-value="allRowsSelected"
          @click="handleAllRowsSelected"
        />
      </th>
      <SbDataTableHeaderCell
        v-for="(elem, index) in headers"
        :key="index"
        :column="elem"
        :sorted-key="sortedKey"
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
    selectedItems: sharedProps.selectedItems,
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
  },

  computed: {
    context() {
      return this.dataTableContext()
    },

    isIndeterminate() {
      return !this.allRowsSelected && !!this.selectedItemsLength
    },

    selectedItemsLength() {
      return this.selectedItems.length
    },

    isMultiple() {
      return this.selectionMode === 'multiple'
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
