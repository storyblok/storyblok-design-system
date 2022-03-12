// styles
import './data-table.scss'

import {
  SbDataTableActions,
  SbDataTableBody,
  SbDataTableBodyRow,
  SbDataTableHeader,
  SbDataTableColumn,
} from './components'

import SbLoading from '../Loading'

import { getPropertyValue, isNumeric } from '../../utils'

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
    sortOrder: null,
  }),

  props: {
    actions: {
      type: Array,
      default: () => [],
    },
    allowSelection: {
      required: false,
      type: Boolean,
      default: false,
    },
    headers: {
      type: Array,
      default: () => [],
    },
    hideHeader: {
      required: false,
      type: Boolean,
      default: false,
    },
    hideLabelActionsBreakpoint: {
      type: Number,
      default: null,
    },
    isLoading: {
      required: false,
      type: Boolean,
      default: false,
    },
    items: {
      type: Array,
      default: () => [],
    },
    selectionMode: {
      required: false,
      type: String,
      default: 'single',
    },
    striped: {
      required: false,
      type: Boolean,
      default: false,
    },
  },

  computed: {
    allRowsSelected() {
      if (this.selectionMode === 'single' || !this.selectedRows.length)
        return false

      return this.selectedRows.length === this.items.length ? true : null
    },

    dataTableContext() {
      return {
        // methods to control row selection
        selectRow: this.selectRow,
        deselectRow: this.deselectRow,
        selectAll: this.selectAll,
        deselectAll: this.deselectAll,

        // method to control sorting
        toggleTableOrder: this.toggleTableOrder,
      }
    },

    showHeader() {
      return !this.hideHeader && this.headers.length
    },

    sortedData() {
      if (this.sortKey && this.sortOrder !== 0) {
        return this.doSort()
      }
      return this.items
    },
  },

  watch: {
    items() {
      this.deselectAll()
    },

    selectedRows(value) {
      this.$emit('selected-rows', value)
    },
  },

  methods: {
    /**
     * method to sort array of items
     */
    doSort() {
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

    /**
     * method to select body row(s)
     * @param {Object} row
     */
    selectRow(row) {
      if (this.selectionMode === 'single') {
        this.selectedRows = [row]
        return
      }

      const index = this.selectedRows.indexOf(row)
      if (index === -1) {
        this.selectedRows.push(row)

        this.selectedRows = this.items.filter((item) => {
          return this.selectedRows.indexOf(item) > -1
        })
      }
    },

    /**
     * method to deselect body row(s)
     * @param {Object} row
     */
    deselectRow(row) {
      const index = this.selectedRows.indexOf(row)

      if (index > -1) {
        this.selectedRows.splice(index, 1)
      }
    },

    /**
     * method to select all body row(s)
     */
    selectAll() {
      this.selectedRows = [...this.items]
    },

    /**
     * method to deselect all body row(s)
     */
    deselectAll() {
      this.selectedRows = []
    },

    /**
     * method to toggle table order
     * @param {Number} order
     * @param {String} key
     */
    toggleTableOrder(order, key) {
      this.sortOrder = order
      this.sortKey = key
    },
  },

  provide() {
    return {
      dataTableContext: () => this.dataTableContext,
    }
  },

  render(h) {
    const renderActions = () => {
      return h(SbDataTableActions, {
        props: {
          actions: this.actions,
          hideLabelActionsBreakpoint: this.hideLabelActionsBreakpoint,
          selectedRowsLength: this.selectedRows.length,
        },
        on: {
          click: (value) => this.$emit('emit-action', value),
          cancel: () => {
            this.$emit('cancel')
            this.deselectAll()
          },
        },
      })
    }

    const renderLoading = () => {
      return h(
        'div',
        {
          staticClass: 'sb-data-table__loading',
        },
        [
          h(SbLoading, {
            props: {
              type: 'spinner',
              size: 'normal',
              color: 'primary',
            },
          }),
        ]
      )
    }

    const renderTable = () => {
      let headerData = []
      let bodyData = []

      if (this.$slots.default) {
        const children = this.$slots.default.filter((e) => e.tag)

        headerData = children.map((element) => {
          return {
            ...element.componentOptions.propsData,
          }
        })

        bodyData = this.sortedData.map((tableRow) => {
          const columns = children.map((tableData) => {
            return h(
              tableData.componentOptions.Ctor,
              {
                ...tableData.data,
                ...(tableData.componentOptions.listeners || {}),
                props: {
                  ...(tableData.data.props || {}),
                  ...tableData.componentOptions.propsData,
                  // passing the row property
                  row: { ...tableRow },
                },
                attrs: {
                  ...tableData.data.attrs,
                },
                on: tableData.componentOptions.listeners,
              },
              tableData.componentOptions.children
            )
          })

          return h(
            SbDataTableBodyRow,
            {
              props: {
                allowSelection: this.allowSelection,
                headers: [...headerData],
                row: tableRow,
                selectedRows: this.selectedRows,
              },
            },
            columns
          )
        })
      }

      return h(
        'table',
        {
          staticClass: 'sb-data-table__container',
        },
        [
          this.showHeader
            ? h(SbDataTableHeader, {
                props: {
                  allowSelection: this.allowSelection,
                  allRowsSelected: this.allRowsSelected,
                  headers: this.headers,
                  selectedRowsLength: this.selectedRows.length,
                  selectionMode: this.selectionMode,
                  sortedKey: this.sortKey,
                },
              })
            : null,
          this.sortedData.length && !this.$slots.default
            ? h(SbDataTableBody, {
                props: {
                  allowSelection: this.allowSelection,
                  headers: this.headers,
                  items: this.sortedData,
                  selectedRows: this.selectedRows,
                },
              })
            : null,
          this.$slots.default
            ? [
                !this.hideHeader
                  ? h(SbDataTableHeader, {
                      props: {
                        allowSelection: this.allowSelection,
                        allRowsSelected: this.allRowsSelected,
                        headers: [...headerData],
                        selectedRowsLength: this.selectedRows.length,
                        selectionMode: this.selectionMode,
                        sortedKey: this.sortKey,
                      },
                    })
                  : null,
                h('tbody', bodyData),
              ]
            : null,
        ]
      )
    }

    return h(
      'div',
      {
        staticClass: 'sb-data-table',
        class: {
          'sb-data-table--loading': this.isLoading,
          'sb-data-table--striped': this.striped,
        },
      },
      [
        this.selectedRows.length > 0 && renderActions(),
        renderTable(),
        this.isLoading && renderLoading(),
      ]
    )
  },
}

export { SbDataTable, SbDataTableColumn }
