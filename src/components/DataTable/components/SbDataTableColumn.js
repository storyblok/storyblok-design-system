/**
 * SbDataTableColumn
 *
 * Render the content inside the component
 */
export const SbDataTableColumn = {
  name: 'SbDataTableColumn',

  props: {
    label: {
      type: String,
    },
    sortable: {
      type: Boolean,
    },
    value: {
      type: String,
    },
    row: {
      type: Object,
    },
  },

  render(h) {
    return h(
      'td',
      {
        staticClass: 'sb-data-table__body-cell',
      },
      [
        this.$scopedSlots.default({
          row: {
            ...this.row,
          },
        }),
      ]
    )
  },
}
