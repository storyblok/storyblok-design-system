/**
 * SbDataTableInput
 *
 * Render a input checkbox
 */
export const SbDataTableInput = {
  name: 'SbDataTableInput',
  render (h) {
    return h('input', {
      attrs: {
        type: 'checkbox'
      }
    })
  }
}
