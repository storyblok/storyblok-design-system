import {
  SbDataTableInput
} from '.'

import SbIcon from '../../Icon'

/**
 * SbDataTableHead
 *
 * Render a thead element
 */
export const SbDataTableHead = {
  name: 'SbDataTableHead',
  data: () => ({
    order: 0,
    iconsSort: ['chevron-down', 'chevron-up', 'chevron-up']
  }),
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
    },
    toggleSort (event) {
      const elem = event.currentTarget
      const sortKey = elem.getAttribute('data-key')
      const isSortable = elem.getAttribute('data-sortable')

      if (sortKey && isSortable) {
        this.order = this.order === 0 || this.order === -1 ? this.order + 1 : -1
        this.toggleOrder(this.order, sortKey)
      } else if (!sortKey && isSortable) {
        throw new Error('Must provide the value property when sortable is defined.')
      }
    }
  },
  inject: ['selectAll', 'deselectAll', 'toggleOrder'],
  render (h) {
    const renderTableHead = () => {
      if (this.showHeader) {
        const rowArray = []

        const renderIcon = (icon) => {
          return h(SbIcon, {
            class: 'sb-data-table__sort-icon',
            props: {
              size: 'small',
              name: icon
            }
          })
        }

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
          rowArray.push(h('th', {
            class: {
              'sb-data-table--sortable': elem.sortable && this.order
            },
            attrs: {
              'data-key': elem.value,
              'data-sortable': elem.sortable
            },
            on: {
              click: this.toggleSort
            }
          }, [
            elem.text,
            elem.sortable ? renderIcon(this.iconsSort[this.order + 1]) : ''
          ]))
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
