<template>
  <tbody>
    <SbDataTableBodyRow
      v-for="(row, i) in items"
      v-bind="{ allowSelection, headers, row, selectedItems }"
      :key="i"
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
    selectedItems: sharedProps.selectedItems,
  },
}
</script>
