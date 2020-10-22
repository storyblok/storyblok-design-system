import {
  SbDataTableInput
} from '.'

/**
 * SbDataTableBodyRow
 *
 * Render a tr element
 */
export const SbDataTableBodyRow = {
  name: 'SbDataTableBodyRow',
  props: {
    allowSelection: {
      type: Boolean
    },
    headers: {
      type: Array
    },
    row: {
      type: Object
    },
    selectedRows: {
      type: Array
    }
  },
  computed: {
    isSelected () {
      return this.selectedRows.some(row => row === this.row)
    }
  },
  methods: {
    handleRowSelected () {
      if (!this.allowSelection) return

      this.isSelected
        ? this.deselectRow(this.row)
        : this.selectRow(this.row)
    }
  },
  inject: ['selectRow', 'deselectRow'],
  render (h) {
    const rowArray = []

    if (this.allowSelection) {
      const renderInput = () => {
        return h(SbDataTableInput, {
          props: {
            value: this.isSelected
          },
          on: {
            input: this.handleRowSelected
          }
        })
      }

      rowArray.push(h('td', {
        staticClass: 'sb-data-table__body-cell',
        class: 'sb-data-table__col-selection'
      }, [
        renderInput()
      ]))
    }

    const isMainColumn = this.headers.findIndex(col => col.main)
    this.headers.map((elem, index) => {
      rowArray.push(h('td', {
        staticClass: 'sb-data-table__body-cell',
        class: { 'sb-data-table__col-main': isMainColumn === index }
      }, this.row[elem.value]))
    })

    return h('tr', {
      staticClass: 'sb-data-table__row',
      class: {
        'sb-data-table__row--selected': this.isSelected && this.allowSelection
      },
      on: {
        click: this.handleRowSelected
      }
    }, [rowArray])
  }
}

/**
 * SbDataTableBody
 *
 * Render a tbody element
 */
export const SbDataTableBody = {
  name: 'SbDataTableBody',
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
    items: {
      required: false,
      type: Array,
      default: () => []
    },
    selectedRows: {
      required: false,
      type: Array,
      default: () => []
    }
  },
  render (h) {
    const tableBodyArray = []

    this.items.map(row => {
      tableBodyArray.push(h(SbDataTableBodyRow, {
        props: {
          allowSelection: this.allowSelection,
          headers: this.headers,
          row: row,
          selectedRows: this.selectedRows
        }
      }))
    })
    return h('tbody', tableBodyArray)
  }
}
