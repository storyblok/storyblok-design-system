import SbIcon from '../Icon'

// styles
import './data-table.scss'

const SbDataTable = {
  name: 'SbDataTable',
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
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
    const renderLoading = () => {
      const renderIcon = () => {
        return h(SbIcon, {
          props: {
            color: 'primary',
            name: 'loading',
            size: 'large'
          }
        })
      }

      return h('div', {
        staticClass: 'sb-data-table__loading'
      }, [
        renderIcon()
      ])
    }

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
