export default {
  props: {
    // component itself properties
    value: [String, Number],
    nativeValue: [String, Number],
    clearable: Boolean,
    error: Boolean,
    errorMessage: String,
    ghost: Boolean,

    iconLeft: String,
    iconRight: String,

    prefix: String,
    suffix: String,
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
    maxlength: [String, Number],
    minlength: [String, Number],
    autocomplete: String,
    autofocus: {
      type: Boolean,
      default: false,
    },

    // HTML input properties
    type: {
      type: String,
      default: 'text',
    },

    // HTML input type number
    min: Number,
    max: Number,
    step: Number,

    // HTML textarea properties
    cols: Number,
    rows: Number,
    wrap: String,
  },

  data() {
    return {
      internalValue: this.value,
      internalType: this.type,
      internalIconRight: this.iconRight,
    }
  },

  computed: {
    computedValue: {
      get() {
        return this.internalValue
      },
      set(newValue) {
        this.internalValue = newValue
        this.$emit('input', newValue)
      },
    },
  },

  watch: {
    value(newValue) {
      this.internalValue = newValue
    },
  },
}
