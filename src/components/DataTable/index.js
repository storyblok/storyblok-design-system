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
    selectable: {
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
    const renderInput = () => {
      return h('input', {
        attrs: {
          type: 'checkbox'
        }
      })
    }

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
        if (this.selectable) {
          rowArray.push(h('th', [renderInput()]))
        }
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
        if (this.selectable) {
          rowArray.push(h('td', [renderInput()]))
        }

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
