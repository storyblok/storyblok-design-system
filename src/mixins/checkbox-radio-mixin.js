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

  data(vm) {
    return {
      internalValue: vm.modelValue,
    }
  },

  watch: {
    modelValue(newValue) {
      this.internalValue = newValue
    },
    internalValue(newValue) {
      this.$emit('update:modelValue', newValue)
    },
  },
}
