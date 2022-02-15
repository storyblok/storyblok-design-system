import SbButton from '../../Button'

/**
 * SbDataTableActions
 *
 * Render an actions menu over the table
 */
export const SbDataTableActions = {
  props: {
    actions: {
      type: Array,
      default: [],
    },
    selectedRowsLength: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    labelSelectedRowsLength() {
      const labelItem = this.selectedRowsLength > 1 ? 'items' : 'item'
      return `${this.selectedRowsLength} ${labelItem} selected`
    },
  },

  render(h) {
    const renderSelectedRowsLength = () => {
      return h(
        'span',
        {
          staticClass: 'sb-actions-menu__rows-selected',
        },
        this.labelSelectedRowsLength
      )
    }

    const renderActionCancel = () => {
      return h(
        SbButton,
        {
          props: {
            variant: 'secondary',
            size: 'small',
          },
          staticClass: 'sb-actions-menu__btn sb-actions-menu__btn-cancel',
          on: {
            click: () => this.$emit('cancel'),
          },
        },
        'Cancel'
      )
    }

    const renderActions = () => {
      const actions = this.actions.map((action) => {
        return h(
          SbButton,
          {
            props: {
              variant: 'secondary',
              size: 'small',
              icon: action.icon,
            },
            staticClass: 'sb-actions-menu__btn',
            on: {
              click: () => this.$emit('click', action.value),
            },
          },
          action.label
        )
      })

      return actions
    }

    return h(
      'div',
      {
        staticClass: 'sb-actions-menu',
      },
      [renderSelectedRowsLength(), renderActions(), renderActionCancel()]
    )
  },
}
