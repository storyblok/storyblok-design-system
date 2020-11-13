export default {
  props: {
    value: [String, Number],
    nativeValue: [String, Number],

    type: String,
    id: String,
    disabled: Boolean,
    required: Boolean,
    name: String,
    label: {
      type: String,
      default: null,
    },
    placeholder: String,

    errorMessage: String,

    error: Boolean,
    clearable: Boolean,
    ghost: Boolean,
    withIconBefore: Boolean,
    withIconAfter: Boolean,
    withTextLeft: Boolean,
    withTextRight: Boolean,

    icon: {
      side: String,
      name: String,
      size: String,
    },
  },

  data() {
    return {
      internalValue: this.value,
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
