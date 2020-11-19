<template>
  <div class="sb-textfield">
    <label v-if="label" :for="id" class="sb-textfield__label">{{
      label
    }}</label>
    <div class="sb-textfield__inner">
      <span v-if="prefix" class="sb-textfield__suffix">{{ prefix }}</span>
      <input
        :id="id"
        v-model="computedValue"
        class="sb-textfield__input"
        :type="internalType"
        :placeholder="placeholder"
        :name="name"
        :value="nativeValue"
        :min="min"
        :max="max"
        :step="step"
        :readonly="readonly"
        :class="componentClasses"
        :required="required"
        :disabled="disabled"
        @focus="handleFocusInput"
        @blur="handleBlurInput"
      />
      <SbIcon
        v-if="iconLeft && type !== 'password'"
        size="small"
        :name="iconLeft"
        class="sb-textfield__icon sb-textfield__icon--left"
      />
      <SbIcon
        v-if="(iconRight || error) && type !== 'password'"
        size="small"
        :name="iconRight"
        class="sb-textfield__icon sb-textfield__icon--right"
      />
      <SbIcon
        v-if="type === 'password'"
        size="small"
        :name="internalIconRight"
        class="sb-textfield__icon sb-textfield__icon--right"
        @click="handleShowHidePassword"
      />
      <SbIcon
        v-if="showClearIcon"
        size="small"
        name="x-clear"
        class="sb-textfield__icon sb-textfield__icon--right"
        @click="handleClearableClick"
      />
      <span v-if="suffix" class="sb-textfield__prefix">{{ suffix }}</span>
    </div>
    <span
      v-if="error && errorMessage"
      class="sb-textfield__message sb-textfield__message--error"
    >
      {{ errorMessage }}
    </span>
  </div>
</template>

<script>
import SbIcon from '../Icon'
import TextFieldMixin from '../../mixins/textfield-mixin'

export default {
  name: 'SbTextField',

  components: { SbIcon },

  mixins: [TextFieldMixin],

  computed: {
    hasValue() {
      return this.computedValue !== null && ('' + this.computedValue).length > 0
    },
    hasSpecialClass() {
      return [
        this.error && 'sb-textfield__input--error',
        this.ghost && 'sb-textfield__input--ghost',
        !this.error && !this.ghost && 'sb-textfield__input--default',
      ]
    },
    hasIcon() {
      return [
        this.iconLeft && 'sb-textfield__input--with-icon-left',
        this.iconRight && 'sb-textfield__input--with-icon-right',
      ]
    },
    hasTextOnSide() {
      return [
        this.prefix && 'sb-textfield__input--with-prefix',
        this.suffix && 'sb-textfield__input--with-suffix',
      ]
    },
    componentClasses() {
      return [...this.hasTextOnSide, ...this.hasIcon, ...this.hasSpecialClass]
    },
    showClearIcon() {
      return this.hasValue && this.clearable
    },
  },
  methods: {
    handleShowHidePassword() {
      this.internalType === 'password'
        ? (this.internalType = 'text')
        : (this.internalType = 'password')
      this.internalIconRight === 'eye'
        ? (this.internalIconRight = 'eye-off')
        : (this.internalIconRight = 'eye')
    },

    handleClearableClick(e) {
      e.stopPropagation()

      const previousValue = this.computedValue
      this.computedValue = null
      this.$emit('clear', previousValue)
    },

    handleFocusInput(e) {
      this.$emit('focus', e)
    },

    handleBlurInput(e) {
      this.$emit('blur', e)
    },
  },
}
</script>
