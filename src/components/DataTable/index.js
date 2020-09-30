const SbDataTable = {
  name: 'SbDataTable',
  props: {
    compact: {
      type: Boolean,
      default: false
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  render (h) {
    return h('table', {
      staticClass: 'sb-table'
    })
  }
}

export default SbDataTable
