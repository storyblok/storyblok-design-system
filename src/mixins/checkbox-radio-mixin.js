export default {
  props: {
    value: [String, Number, Boolean, Array],
    nativeValue: [String, Number, Boolean],

    id: String,
    disabled: Boolean,
    required: Boolean,
    name: String,
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
        this.$emit('update:modelValue', newValue)
      },
    },
  },

  watch: {
    value(newValue) {
      this.internalValue = newValue
    },
  },
}
