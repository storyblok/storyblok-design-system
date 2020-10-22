/**
 * SbDataTableActions
 *
 * Render an actions menu over the table
 */
export const SbDataTableActions = {
  props: {
    selectedRowsLength: {
      type: Number,
      default: 0
    }
  },

  computed: {
    labelSelectedRowsLength () {
      const labelItem = (this.selectedRowsLength > 1) ? 'items' : 'item'
      return `${this.selectedRowsLength} ${labelItem} selected`
    }
  },

  methods: {
    handleCancel () {
      console.warn('handleCancel')
    },

    handleCopy () {
      console.warn('handleCopy')
    },

    handleDelete () {
      console.warn('handleDelete')
    },

    handleMove () {
      console.warn('handleMove')
    },

    handlePublish () {
      console.warn('handlePublish')
    },

    handleUnpublish () {
      console.warn('handleUnpublish')
    }
  },

  render (h) {
    const renderSelectedRowsLength = () => {
      return h('span', {
        staticClass: 'sb-actions-menu__rows-selected'
      }, this.labelSelectedRowsLength)
    }

    const renderActionMove = () => {
      return h('button', {
        staticClass: 'sb-actions-menu__btn',
        on: {
          click: this.handleMove
        }
      }, 'Move')
    }

    const renderActionCopy = () => {
      return h('button', {
        staticClass: 'sb-actions-menu__btn',
        on: {
          click: this.handleCopy
        }
      }, 'Copy')
    }

    const renderActionPublish = () => {
      return h('button', {
        staticClass: 'sb-actions-menu__btn',
        on: {
          click: this.handlePublish
        }
      }, 'Publish')
    }

    const renderActionUnpublish = () => {
      return h('button', {
        staticClass: 'sb-actions-menu__btn',
        on: {
          click: this.handleUnpublish
        }
      }, 'Unpublish')
    }

    const renderActionDelete = () => {
      return h('button', {
        staticClass: 'sb-actions-menu__btn sb-actions-menu__btn-delete',
        on: {
          click: this.handleDelete
        }
      }, 'Delete')
    }

    const renderActionCancel = () => {
      return h('button', {
        staticClass: 'sb-actions-menu__btn sb-actions-menu__btn-cancel',
        on: {
          click: this.handleCancel
        }
      }, 'Cancel')
    }

    return h('div', {
      staticClass: 'sb-actions-menu'
    },
    [
      renderSelectedRowsLength(),
      renderActionMove(),
      renderActionCopy(),
      renderActionPublish(),
      renderActionUnpublish(),
      renderActionDelete(),
      renderActionCancel()
    ])
  }
}
