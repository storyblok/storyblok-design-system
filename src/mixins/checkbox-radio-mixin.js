export default {
  props: {
    modelValue: [String, Number, Boolean, Array],
    nativeValue: [String, Number, Boolean],

    id: String,
    disabled: Boolean,
    required: Boolean,
    name: String,
  },

  emits: ['update:modelValue'],

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
    modelValue(newValue) {
      this.internalValue = newValue
    },
  },
}
