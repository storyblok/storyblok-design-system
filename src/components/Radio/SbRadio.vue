<template>
  <div class="sb-radio" :class="componentClasses">
    <input
      :id="id"
      v-model="computedValue"
      class="sb-radio__input"
      type="radio"
      :name="name"
      :value="nativeValue"
      :required="required"
      :disabled="disabled"
    />

    <label v-if="label" :for="id" class="sb-radio__label">{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: 'SbRadio',
  props: {
    inline: Boolean,
    outline: Boolean,

    label: {
      type: String,
      default: null,
    },
    id: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },

    value: {
      type: String,
      default: null,
    },
    nativeValue: {
      type: String,
      default: null,
    },

    required: Boolean,
    disabled: Boolean,
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
        this.setInternalValue(newValue)
        this.$emit('input', newValue)
      },
    },

    componentClasses() {
      return [
        this.inline && 'sb-radio--inline',
        this.outline && 'sb-radio--outline',
      ]
    },
  },

  watch: {
    value: 'setInternalValue',
  },

  methods: {
    setInternalValue(value) {
      this.internalValue = value
    },
  },
}
</script>
