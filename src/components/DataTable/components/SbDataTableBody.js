import {
  SbDataTableInput
} from '.'

/**
 * SbDataTableBody
 *
 * Render a tbody element
 */
export const SbDataTableBody = {
  name: 'SbDataTableBody',
  props: {
    headers: {
      type: Array,
      default: () => []
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
    }
  },
  render (h) {
    const renderTableBody = () => {
      const tableArray = []

      this.items.forEach(row => {
        const rowArray = []
        if (this.selectable) {
          rowArray.push(h('td', [
            h(SbDataTableInput)
          ]))
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

    return renderTableBody()
  }
}
