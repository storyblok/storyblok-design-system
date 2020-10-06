import SbIcon from '../Icon'

// styles
import './data-table.scss'

const SbDataTable = {
  name: 'SbDataTable',
  props: {
    headers: {
      type: Array,
      default: () => []
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      default: () => []
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
        const rowArray = []
        this.headers.forEach(elem => {
          rowArray.push(h('th', elem.text))
        })

        const tableArray = []
        tableArray.push(h('tr', [rowArray]))

        return h('thead', [tableArray])
      }

      return null
    }

    const renderTableBody = () => {
      const tableArray = []

      this.items.forEach(row => {
        const rowArray = []
        const isMainColumn = this.headers.findIndex(col => col.main)
        Object.values(row).forEach((elem, index) => {
          rowArray.push(h('td', {
            class: { 'sb-data-table__main-col': isMainColumn === index }
          }, elem))
        })

        tableArray.push(h('tr', [rowArray]))
      })
      return h('tbody', [tableArray])
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
