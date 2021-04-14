/**
 * @type {Array<String>}
 */
export const loadingSizes = ['small', 'normal', 'large', 'x-large']

export const sharedProps = {
  type: {
    type: String,
    default: 'spinner',
  },
  size: {
    type: String,
    validator: (size) => loadingSizes.indexOf(size) !== -1,
  },
  value: {
    type: [Number, String],
    default: 0,
  },
  showPercentage: {
    type: Boolean,
  },
  color: {
    type: String,
    default: null,
  },
  uiBlock: {
    type: Boolean,
  },
}
