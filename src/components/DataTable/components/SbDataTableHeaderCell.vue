<template>
  <th
    class="sb-data-table__head-cell"
    :class="{ 'sb-data-table--show-icon': showSortIcon }"
    @click="toggleSort"
  >
    <div v-if="hasHeaderSlot" class="sb-data-table__header-template">
      <VNodes :vnodes="this.column.scopedSlots.header()" />
    </div>
    <div v-else>{{ column.label }}</div>
    <SbIcon
      v-if="isSortable"
      class="sb-data-table__sort-icon"
      :name="$options.iconsSort[order + 1]"
      :size="'normal'"
    />
  </th>
</template>

<script>
import SbIcon from '../../Icon'

export default {
  name: 'SbDataTableHeaderCell',

  components: {
    SbIcon,
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes,
    },
  },

  iconsSort: ['chevron-down', 'chevron-double', 'chevron-up'],

  inject: ['dataTableContext'],

  props: {
    column: {
      type: Object,
      default: null,
    },
    sortedKey: {
      type: String,
      default: null,
    },
  },

  data: () => ({
    order: 0,
  }),

  computed: {
    context() {
      return this.dataTableContext()
    },

    isSortable() {
      return this.column.sortable
    },

    isSortedKey() {
      return this.sortKey === this.sortedKey
    },

    showSortIcon() {
      return this.isSortable && this.order && this.isSortedKey
    },

    sortKey() {
      return this.column.value
    },

    hasHeaderSlot() {
      return this.column?.scopedSlots?.header
    },
  },

  watch: {
    sortedKey() {
      if (!this.isSortedKey) this.order = 0
    },
  },

  methods: {
    toggleSort() {
      if (this.sortKey && this.isSortable) {
        this.order = this.order === 0 || this.order === -1 ? this.order + 1 : -1
        this.context.toggleTableOrder(this.order, this.sortKey)
      } else if (!this.sortKey && this.isSortable) {
        throw new Error(
          'Must provide the value property when sortable is defined.'
        )
      }
    },
  },
}
</script>
