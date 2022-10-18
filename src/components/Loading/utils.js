/**
 * @type {Array<String>}
 */
export const loadingSizes = ['small', 'normal', 'large', 'x-large']

/**
 * @type {Array<String>}
 */
export const loadingTypes = ['spinner', 'bar', 'placeholder']

export const sharedProps = {
  type: {
    type: String,
    validator: (type) => loadingTypes.indexOf(type) !== -1,
    default: 'spinner',
  },
  size: {
    type: String,
    validator: (size) => loadingSizes.indexOf(size) !== -1,
  },
  modelValue: {
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
