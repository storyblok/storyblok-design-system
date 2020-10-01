// styles
import './data-table.scss'

const SbDataTable = {
  name: 'SbDataTable',
  props: {
    showHeader: {
      type: Boolean,
      default: true
    },
    striped: {
      type: Boolean,
      default: false
    }
  },
  render (h) {
    const renderTableHeader = () => {
      if (this.showHeader) {
        const TableSizeArray = []

        const RowSizeArray = []
        for (let j = 1; j <= 3; j++) {
          RowSizeArray.push(h('th', 'Header col: ' + j))
        }
        TableSizeArray.push(h('tr', [RowSizeArray]))
        return h('thead', [TableSizeArray])
      }

      return null
    }

    const renderTableBody = () => {
      const TableSizeArray = []

      for (let i = 1; i < 9; i += 3) {
        const RowSizeArray = []
        for (let j = 0; j < 3; j++) {
          RowSizeArray.push(h('td', 'Body cell: ' + (i + j)))
        }
        TableSizeArray.push(h('tr', [RowSizeArray]))
      }
      return h('tbody', [TableSizeArray])
    }

    const renderTable = () => {
      return h('table', {
        staticClass: 'sb-data-table',
        class: {
          'sb-data-table--striped': this.striped
        }
      },
      [
        renderTableHeader(),
        renderTableBody()
      ])
    }

    return renderTable()
  }
}

export default SbDataTable
