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
    handleRowSelected (event) {
      if (!this.allowSelection) return

      const source = event.target || event.srcElement
      if (source.tagName.toLowerCase() === 'td' || source.tagName.toLowerCase() === 'input') {
        if (this.isSelected) {
          this.deselectRow(this.row)
        } else {
          this.selectRow(this.row)
        }
      }
    }
  },
  inject: ['selectRow', 'deselectRow'],
  render (h) {
    const rowArray = []

    const renderInput = () => {
      return h(SbDataTableInput, {
        props: {
          isChecked: this.isSelected
        }
      })
    }

    if (this.allowSelection) {
      rowArray.push(h('td', {
        staticClass: 'sb-data-table__col-selection'
      }, [
        renderInput()
      ]))
    }

    const isMainColumn = this.headers.findIndex(col => col.main)
    Object.values(this.row).forEach((elem, index) => {
      rowArray.push(h('td', {
        class: { 'sb-data-table__col-main': isMainColumn === index }
      }, elem))
    })

    return h('tr', {
      staticClass: 'sb-data-table__tr',
      class: {
        'sb-data-table__tr--selected': this.isSelected && this.allowSelection
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

    this.items.forEach(row => {
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
