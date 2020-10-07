import {
  SbDataTableInput
} from '.'

/**
 * SbDataTableHead
 *
 * Render a thead element
 */
export const SbDataTableHead = {
  name: 'SbDataTableHead',
  props: {
    headers: {
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
    const renderTableHead = () => {
      if (this.showHeader) {
        const rowArray = []
        if (this.selectable) {
          rowArray.push(h('th', [
            h(SbDataTableInput)
          ]))
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

    return renderTableHead()
  }
}
