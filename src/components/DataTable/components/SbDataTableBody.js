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
    const mainColumnIndex = this.headers.findIndex(col => col.main)

    return h('tr', {
      staticClass: 'sb-data-table__row',
      class: {
        'sb-data-table__row--selected': this.isSelected && this.allowSelection
      },
      on: {
        click: this.handleRowSelected
      }
    }, [
      this.allowSelection && h('td', {
        staticClass: 'sb-data-table__body-cell',
        class: 'sb-data-table__col-selection'
      }, [
        h(SbDataTableInput, {
          props: {
            value: this.isSelected
          },
          on: {
            input: this.handleRowSelected
          }
        })
      ]),
      this.headers.map((elem, index) => {
        return h('td', {
          staticClass: 'sb-data-table__body-cell',
          class: {
            'sb-data-table__col-main': mainColumnIndex === index
          }
        }, this.row[elem.value])
      })
    ])
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
    return h('tbody', [
      this.items.map(row => {
        return h(SbDataTableBodyRow, {
          props: {
            allowSelection: this.allowSelection,
            headers: this.headers,
            row: row,
            selectedRows: this.selectedRows
          }
        })
      })
    ])
  }
}
