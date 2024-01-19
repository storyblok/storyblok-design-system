<template>
  <label class="sb-radio" :class="componentClasses">
    <input
      :id="id"
      v-model="internalValue"
      v-bind="$attrs"
      class="sb-radio__input"
      type="radio"
      :name="name"
      :value="nativeValue"
      :required="required"
      :disabled="disabled"
      @click.stop
      @input="handleInput"
    />
    <span v-if="label || label == ''" class="sb-radio__label">{{ label }}</span>
  </label>
</template>

<script lang="ts">
import CheckboxRadioMixin from '../../mixins/checkbox-radio-mixin'

export default {
  name: 'SbRadio',

  mixins: [CheckboxRadioMixin],

  inheritAttrs: false,

  props: {
    inline: Boolean,
    outline: Boolean,

    label: {
      type: String,
      default: null,
    },
  },

  computed: {
    componentClasses() {
      return [
        this.$attrs.class,
        this.inline && 'sb-radio--inline',
        this.outline && 'sb-radio--outline',
      ]
    },
  },

  methods: {
    handleInput(e) {
      const valueToEmit =
        typeof this.nativeValue !== 'undefined'
          ? this.nativeValue
          : e.target.checked
      this.$emit('update:modelValue', valueToEmit)
    },
  },
}
</script>
