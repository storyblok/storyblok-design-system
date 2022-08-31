import SbButton from '../../Button'
import { Tooltip } from '../../../directives'
import { WindowResizeObserverMixin } from '../../../mixins'
import { h } from 'vue'

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
    hideLabelActionsBreakpoint: {
      type: Number,
      default: null,
    },
    selectedRows: {
      type: Array,
      default: [],
    },
    sticky: {
      type: Boolean,
      default: false,
      required: false,
    },
  },

  directives: {
    tooltip: Tooltip,
  },

  mixins: [WindowResizeObserverMixin()],

  computed: {
    labelSelectedRowsLength() {
      const labelItem = this.selectedRowsLength > 1 ? 'items' : 'item'
      return `${this.selectedRowsLength} ${labelItem} selected`
    },

    selectedRowsLength() {
      return this.selectedRows.length
    },
  },

  render() {
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
          attrs: {
            'data-testid': 'sb-data-table-action__clear',
          },
        },
        'Clear'
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
              hasIconOnly: !this.isOnDesktop,
            },
            directives: (!this.isOnDesktop || action.tooltip) && [
              {
                name: 'tooltip',
                value: {
                  label: action.tooltip ? action.tooltip : action.label,
                  position: 'top',
                },
              },
            ],
            staticClass: 'sb-actions-menu__btn',
            on: {
              click: () => this.$emit('click', action.value),
            },
            attrs: {
              'data-testid': `sb-data-table-action__${action.value}`,
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
        class: {
          'sb-actions-menu--sticky': this.sticky,
        },
      },
      [renderSelectedRowsLength(), renderActionCancel(), renderActions()]
    )
  },
}
