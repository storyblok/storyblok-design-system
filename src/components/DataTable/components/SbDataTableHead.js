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
    allowSelection: {
      required: false,
      type: Boolean
    },
    allRowsSelected: {
      required: false,
      type: Boolean,
      default: false
    },
    headers: {
      required: false,
      type: Array
    },
    selectionMode: {
      required: false,
      type: String
    },
    showHeader: {
      required: false,
      type: Boolean
    }
  },
  methods: {
    handleAllRowsSelected () {
      this.allRowsSelected
        ? this.deselectAll()
        : this.selectAll()
    }
  },
  inject: ['selectAll', 'deselectAll'],
  render (h) {
    const renderTableHead = () => {
      if (this.showHeader) {
        const rowArray = []

        const renderInput = () => {
          return h(SbDataTableInput, {
            props: {
              value: this.allRowsSelected
            },
            on: {
              input: this.handleAllRowsSelected
            }
          })
        }

        if (this.allowSelection) {
          rowArray.push(h('th', [
            this.selectionMode === 'multiple' ? renderInput() : null
          ]))
        }

        this.headers.forEach(elem => {
          rowArray.push(h('th', elem.text))
        })

        const tableArray = []
        tableArray.push(h('tr', [
          rowArray
        ]))

        return h('thead', [
          tableArray
        ])
      }

      return null
    }

    return renderTableHead()
  }
}
