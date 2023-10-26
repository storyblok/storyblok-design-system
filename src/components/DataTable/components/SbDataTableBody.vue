<template>
  <tbody :data-testid="dataTestid">
    <SbDataTableBodyRow
      v-for="(row, i) in items"
      v-bind="{ allowSelection, headers, row, selectedRows }"
      :key="i"
      :data-testid="`${dataTestid}-row__${i}`"
    />
  </tbody>
</template>

<script>
import SbDataTableBodyRow from './SbDataTableBodyRow'
import sharedProps from '../sharedProps'

export default {
  name: 'SbDataTableBody',
  components: {
    SbDataTableBodyRow,
  },
  props: {
    allowSelection: sharedProps.allowSelection,
    headers: sharedProps.headers,
    items: sharedProps.items,
    selectedRows: sharedProps.selectedItems,
  },
  computed: {
    dataTestid() {
      return this.$attrs['data-testid'] || 'sb-data-table-body'
    },
  },
}
</script>
