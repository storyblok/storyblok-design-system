
// styles
import './data-table.scss'

import {
  SbDataTableBody,
  SbDataTableHead
} from './components'

import SbIcon from '../Icon'

/**
 * SbDataTable
 *
 * The data table element
 */
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
    const renderIcon = () => {
      return h(SbIcon, {
        props: {
          color: 'primary',
          name: 'loading',
          size: 'large'
        }
      })
    }

    const renderLoading = () => {
      return h('div', {
        staticClass: 'sb-data-table__loading'
      }, [
        renderIcon()
      ])
    }

    const renderTable = () => {
      return h('table', {
        staticClass: 'sb-data-table',
        class: {
          'sb-data-table--striped': this.striped
        }
      },
      [
        h(SbDataTableHead, {
          props: {
            headers: this.headers,
            selectable: this.selectable,
            showHeader: this.showHeader
          }
        }),
        h(SbDataTableBody, {
          props: {
            headers: this.headers,
            items: this.items,
            selectable: this.selectable
          }
        })
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
