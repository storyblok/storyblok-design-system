<template>
  <div class="sb-radio" :class="componentClasses">
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
    />

    <label v-if="label" :for="id" class="sb-radio__label">{{ label }}</label>
  </div>
</template>

<script>
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
        this.inline && 'sb-radio--inline',
        this.outline && 'sb-radio--outline',
      ]
    },
  },
}
</script>
