<template>
  <div class="sb-checkbox" :class="componentClasses">
    <div class="sb-checkbox__inner">
      <input
        :id="id"
        v-model="computedValue"
        v-bind="$attrs"
        :indeterminate.prop="indeterminate"
        class="sb-checkbox__native"
        type="checkbox"
        :name="name"
        :value="nativeValue"
        :required="required"
        :disabled="disabled"
      />

      <div class="sb-checkbox__input">
        <svg class="sb-checkbox__svg" focusable="false" viewBox="0 0 24 24">
          <path
            class="sb-checkbox__truthy"
            fill="none"
            d="M1.73,12.91 8.1,19.28 22.79,4.59"
          />
          <path class="sb-checkbox__indet" d="M5,14H18V10H5" />
        </svg>
      </div>

      <label :for="id" class="sb-checkbox__label">{{ label }}</label>
    </div>
  </div>
</template>

<script>
import CheckboxRadioMixin from '../../mixins/checkbox-radio-mixin'

export default {
  name: 'SbCheckbox',

  mixins: [CheckboxRadioMixin],

  inheritAttrs: false,

  props: {
    label: {
      type: String,
      default: null,
    },
    indeterminate: Boolean,
    inline: Boolean,
    outline: Boolean,
  },

  computed: {
    componentClasses() {
      return [
        this.inline && 'sb-checkbox--inline',
        this.outline && 'sb-checkbox--outline',
      ]
    },
  },
}
</script>
