export default {
  props: {
    // component itself properties
    modelValue: {},
    error: Boolean,
    errorMessage: String,
    label: {
      type: String,
      default: null,
    },

    // HTML general properties
    id: String,
    disabled: Boolean,
    name: String,
    placeholder: String,
    readonly: Boolean,
    required: Boolean,
    autocomplete: String,

    // HTML input type number
    min: Number,
    max: Number,
    precision: {
      type: Number,
      validator(val) {
        return val >= 0 && val === parseInt(val, 10)
      },
    },
    step: {
      type: Number,
      default: 1,
    },
  },

  data() {
    return {
      internalValue: 0,
      userInput: null,
      componentKey: 0,
    }
  },
}
