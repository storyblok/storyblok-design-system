<template>
  <div class="sb-checkbox" :class="componentClasses" @click="$emit('click')">
    <div class="sb-checkbox__inner">
      <input
        :id="id"
        v-model="internalValue"
        v-bind="$attrs"
        :indeterminate.prop="indeterminate"
        class="sb-checkbox__native"
        type="checkbox"
        :name="name"
        :value="nativeValue"
        :required="required"
        :disabled="disabled"
        @click.stop
      />

      <div class="sb-checkbox__input">
        <svg class="sb-checkbox__svg" focusable="false" viewBox="0 0 16 16">
          <path
            class="sb-checkbox__truthy"
            fill="none"
            d="M11.611 5.27l.008.009c.37.374.37.977 0 1.352l-4.004 4.054a.934.934 0 01-.496.264l-.11.013-.111.001a.935.935 0 01-.618-.278L4.277 8.658a.962.962 0 010-1.352.938.938 0 011.327-.008l.008.008 1.335 1.351 3.337-3.378a.938.938 0 011.327-.008z"
          />
          <rect
            class="sb-checkbox__indeterminate"
            x="4"
            y="7"
            width="8"
            height="2"
          />
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

  emits: ['click'],

  computed: {
    componentClasses() {
      return [
        this.$attrs.class,
        this.inline && 'sb-checkbox--inline',
        this.outline && 'sb-checkbox--outline',
      ]
    },
  },
}
</script>
