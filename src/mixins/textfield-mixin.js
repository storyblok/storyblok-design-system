export default {
  props: {
    value: [String, Number],
    nativeValue: [String, Number],

    type: String,

    id: String,
    disabled: Boolean,
    required: Boolean,
    name: String,
    min: Number,
    max: Number,
    step: Number,
    readonly: Boolean,
    label: {
      type: String,
      default: null,
    },
    placeholder: String,

    errorMessage: String,

    error: Boolean,
    clearable: Boolean,
    ghost: Boolean,

    iconLeft: String,
    iconRight: String,

    prefix: String,
    suffix: String,
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
