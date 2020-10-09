
// styles
import './data-table.scss'

import {
  SbDataTableBody,
  SbDataTableHead
} from './components'

import SbIcon from '../Icon'

/**
 * SbDataTable
 *
 * The data table element
 */
const SbDataTable = {
  name: 'SbDataTable',
  data: () => ({
    selectedRows: []
  }),
  props: {
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
    allowSelection: {
      required: false,
      type: Boolean,
      default: false
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
  methods: {
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
    selectAll (all) {
      this.selectedRows = all
    },
    deselectAll () {
      this.selectedRows = []
    }
  },
  provide: function () {
    return {
      selectRow: this.selectRow,
      deselectRow: this.deselectRow
    }
  },
  render (h) {
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
        },
        on: {
          'select-row': this.selectRow
        }
      },
      [
        h(SbDataTableHead, {
          props: {
            allowSelection: this.allowSelection,
            headers: this.headers,
            showHeader: this.showHeader
          }
        }),
        h(SbDataTableBody, {
          props: {
            allowSelection: this.allowSelection,
            headers: this.headers,
            items: this.items,
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

    return renderTable()
  }
}

export default SbDataTable
