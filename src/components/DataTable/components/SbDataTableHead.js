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
      required: false,
      type: Array,
      default: () => []
    },
    allowSelection: {
      required: false,
      type: Boolean,
      default: false
    },
    showHeader: {
      required: false,
      type: Boolean,
      default: true
    }
  },
  render (h) {
    const renderTableHead = () => {
      if (this.showHeader) {
        const rowArray = []
        if (this.allowSelection) {
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
