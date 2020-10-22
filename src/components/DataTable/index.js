
// styles
import './data-table.scss'

import {
  SbDataTableActions,
  SbDataTableBody,
  SbDataTableHeader
} from './components'

import SbIcon from '../Icon'

import {
  getPropertyValue,
  isNumeric
} from '../../utils'

/**
 * SbDataTable
 *
 * The data table element
 */
const SbDataTable = {
  name: 'SbDataTable',
  data: () => ({
    selectedRows: [],
    sortKey: null,
    sortOrder: null
  }),
  props: {
    allowSelection: {
      required: false,
      type: Boolean,
      default: false
    },
    headers: {
      required: false,
      type: Array,
      default: () => []
    },
    isLoading: {
      required: false,
      type: Boolean,
      default: false
    },
    items: {
      required: false,
      type: Array,
      default: () => []
    },
    selectionMode: {
      required: false,
      type: String,
      default: 'single'
    },
    showHeader: {
      required: false,
      type: Boolean,
      default: true
    },
    striped: {
      required: false,
      type: Boolean,
      default: false
    }
  },
  computed: {
    allRowsSelected () {
      if (this.selectionMode === 'single' || !this.selectedRows.length) return false

      return this.selectedRows.length === this.items.length
        ? true
        : null
    },
    sortedData () {
      if (this.sortKey && this.sortOrder !== 0) {
        return this.doSort()
      }
      return this.items
    }
  },
  methods: {
    doSort () {
      const local = [...this.items]

      return local.sort((a, b) => {
        let val1 = getPropertyValue(a, this.sortKey)
        let val2 = getPropertyValue(b, this.sortKey)

        if (val1 === null || val1 === undefined) val1 = ''
        if (val2 === null || val2 === undefined) val2 = ''

        if (isNumeric(val1) && isNumeric(val2)) {
          return (val1 - val2) * this.sortOrder
        }

        const str1 = val1.toString()
        const str2 = val2.toString()

        return str1.localeCompare(str2) * this.sortOrder
      })
    },
    selectRow (row) {
      if (this.selectionMode === 'single') {
        this.selectedRows = [row]
        return
      }
      const index = this.selectedRows.indexOf(row)
      if (index === -1) {
        this.selectedRows.push(row)
      }
    },
    selectRows (rows) {
      for (const row of rows) {
        this.selectRow(row)
      }
    },
    deselectRow (row) {
      const index = this.selectedRows.indexOf(row)

      if (index > -1) {
        this.selectedRows.splice(index, 1)
      }
    },
    deselectRows (rows) {
      for (const row of rows) {
        this.deselectRow(row)
      }
    },
    selectAll () {
      this.selectedRows = [...this.items]
    },
    deselectAll () {
      this.selectedRows = []
    },
    toggleTableOrder (order, key) {
      this.sortOrder = order
      this.sortKey = key
    }
  },
  provide: function () {
    return {
      selectRow: this.selectRow,
      deselectRow: this.deselectRow,
      selectAll: this.selectAll,
      deselectAll: this.deselectAll,
      toggleTableOrder: this.toggleTableOrder
    }
  },
  render (h) {
    const renderActions = () => {
      return h(SbDataTableActions, {
        props: {
          selectedRowsLength: this.selectedRows.length
        }
      })
    }

    const renderIcon = () => {
      return h(SbIcon, {
        props: {
          color: 'primary',
          name: 'loading',
          size: 'large'
        }
      })
    }

    const renderLoading = () => {
      return h('div', {
        staticClass: 'sb-data-table__loading'
      }, [
        renderIcon()
      ])
    }

    const renderTable = () => {
      return h('table', {
        staticClass: 'sb-data-table',
        class: {
          'sb-data-table--striped': this.striped
        }
      },
      [
        h(SbDataTableHeader, {
          props: {
            allowSelection: this.allowSelection,
            allRowsSelected: this.allRowsSelected,
            headers: this.headers,
            selectionMode: this.selectionMode,
            sortedKey: this.sortKey,
            showHeader: this.showHeader
          }
        }),
        h(SbDataTableBody, {
          props: {
            allowSelection: this.allowSelection,
            headers: this.headers,
            items: this.sortedData,
            selectedRows: this.selectedRows
          }
        })
      ])
    }

    if (this.isLoading) {
      return h('div', {
        staticClass: 'sb-data-table--is-loading'
      },
      [
        renderTable(),
        renderLoading()
      ])
    }

    if (this.selectedRows.length) {
      return h('div',
        [
          renderActions(),
          renderTable()
        ])
    }

    return renderTable()
  }
}

export default SbDataTable
