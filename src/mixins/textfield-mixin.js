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
    withIconLeft: Boolean,
    withIconRight: Boolean,
    withTextLeft: Boolean,
    withTextRight: Boolean,

    icon: {
      side: String,
      name: String,
      size: String,
    },
    sideText: {
      side: String,
      text: String,
    },
  },

  data() {
    return {
      internalValue: this.value,
      internalType: this.type,
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
