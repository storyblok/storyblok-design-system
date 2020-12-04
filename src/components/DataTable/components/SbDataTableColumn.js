/**
 * SbDataTableColumn
 *
 * Render the content inside the component
 */
export const SbDataTableColumn = {
  name: 'SbDataTableColumn',

  props: {
    name: {
      type: String,
    },
    data: {
      type: Array,
    },
  },

  render(h) {
    // console.log('this.$slots.default: ', this.$slots.default)
    // console.log('this.data: ', this.data);

    // console.log('this: ', this)
    // console.log('this._uid: ', this._uid)
    // console.log('this.parent: ', this.$parent)

    // const indexComponent = this.$parent.$children.findIndex(x => x._uid === this._uid);
    // console.log('indexComponent: ', indexComponent)

    const renderChildren = () => {
      if (this.data) {
        console.log('entrou')

        return this.data.map((element, index) => {
          // if (!indexComponent) {
          //   console.log('is first row')

          //   return h('tr', {
          //     staticClass: 'sb-data-table__row',
          //   }, [
          //     h('td', {
          //       staticClass: 'sb-data-table__body-cell',
          //     }, [
          //       this.$scopedSlots.default({
          //         ...element
          //       })
          //     ])
          //   ])
          // }

          // if (indexComponent === index) {
          return h(
            'td',
            {
              staticClass: 'sb-data-table__body-cell',
            },
            [
              this.$scopedSlots.default({
                ...element,
              }),
            ]
          )
          // }
        })
      }

      return h(
        'td',
        {
          staticClass: 'sb-data-table__body-cell',
        },
        [this.$slots.default]
      )
    }

    return h(
      'tr',
      {
        staticClass: 'sb-data-table__row',
      },
      [renderChildren()]
    )
  },
}
