/**
 * SbDataTableInput
 *
 * Render a input checkbox
 */
export const SbDataTableInput = {
  name: 'SbDataTableInput',
  props: {
    isChecked: {
      default: false
    }
  },
  render (h) {
    return h('input', {
      attrs: {
        type: 'checkbox',
        checked: this.isChecked
      }
    })
  }
}
