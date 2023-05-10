<template>
  <div class="sb-textfield" :class="$attrs.class">
    <label v-if="label" :for="id" class="sb-textfield__label">
      {{ label }} <span v-if="required" class="sb-textfield__required">*</span>
    </label>
    <div class="sb-textfield__inner">
      <span v-if="prefix" class="sb-textfield__prefix">{{ prefix }}</span>
      <input
        v-if="!isTextAreaType"
        v-bind="inputAttrs"
        :id="id"
        ref="textfield"
        v-model="computedValue"
        v-maska="mask"
        :type="internalType"
        :placeholder="placeholder"
        :name="name"
        :readonly="readonly"
        :class="componentClasses"
        :required="required"
        :disabled="disabled"
        :maxlength="maxlength"
        :minlength="minlength"
        @focus="handleFocusInput"
        @blur="handleBlurInput"
        @keydown="handleKeyDownInput"
        @keypress="handleKeyPressInput"
        @keyup="handleKeyUpInput"
      />

      <textarea
        v-else
        :id="id"
        ref="textfield"
        v-model="computedValue"
        v-bind="$attrs"
        class="sb-textfield__textarea"
        :placeholder="placeholder"
        :name="name"
        :readonly="readonly"
        :class="componentClasses"
        :required="required"
        :disabled="disabled"
        :cols="cols"
        :rows="rows"
        :wrap="wrap"
        :maxlength="maxlength"
        :minlength="minlength"
        @focus="handleFocusInput"
        @blur="handleBlurInput"
        @keydown="handleKeyDownInput"
        @keypress="handleKeyPressInput"
        @keyup="handleKeyUpInput"
      />

      <SbIcon
        v-if="iconLeft && type !== 'password' && !iconDescription"
        :style="returnIconCustomColor"
        :name="iconLeft"
        class="sb-textfield__icon sb-textfield__icon--left"
        :color="iconColor"
        data-testid="sb-textfield-icon-click"
        @click="handleIconClick"
      />
      <SbTooltip
        v-if="iconLeft && type !== 'password' && iconDescription"
        :label="iconDescription"
        position="bottom"
      >
        <SbIcon
          v-if="iconLeft && type !== 'password'"
          :style="returnIconCustomColor"
          :name="iconLeft"
          class="sb-textfield__icon sb-textfield__icon--left"
          :color="iconColor"
          data-testid="sb-textfield-icon-click"
          @click="handleIconClick"
        />
      </SbTooltip>
      <SbIcon
        v-if="hasIconRight"
        :name="iconRight"
        class="sb-textfield__icon sb-textfield__icon--right"
        :color="iconColor"
        data-testid="sb-textfield-icon-click"
        @click="handleIconClick"
      />
      <SbIcon
        v-if="internalIconRight && type === 'password'"
        :name="internalIconRight"
        class="sb-textfield__icon sb-textfield__icon--right"
        :color="iconColor"
        data-testid="sb-textfield-icon-click"
        @click="handleShowHidePassword"
      />
      <SbIcon
        v-if="showClearIcon"
        v-tooltip="{ label: 'Clear' }"
        name="x-clear"
        :class="computedClearIconClasses"
        :color="iconColor"
        @click="handleClearableClick"
      />
      <span v-if="suffix" class="sb-textfield__suffix">{{ suffix }}</span>

      <slot />
    </div>
    <span
      v-if="showError"
      class="sb-textfield__message sb-textfield__message--error"
    >
      {{ errorMessage }}
    </span>

    <span
      v-if="showCounter"
      class="sb-textfield__counter"
      :class="{ 'sb-textfield__counter--warning': isAlmostRaiseMaxlength }"
    >
      <template v-if="!isAlmostRaiseMaxlength">
        {{ remainingValue }} characters remaining
      </template>

      <template v-else>
        {{ remainingValue }}/{{ maxlengthParsed }} characters remaining
      </template>
    </span>
  </div>
</template>

<script>
import SbIcon from '../Icon'
import SbTooltip from '../Tooltip'
import { maska } from 'maska'

import TextFieldMixin from '../../mixins/textfield-mixin'
import { Tooltip } from '../../directives'

export default {
  name: 'SbTextField',

  directives: {
    tooltip: Tooltip,
    maska,
  },

  components: { SbIcon, SbTooltip },

  mixins: [TextFieldMixin],

  inheritAttrs: false,

  props: {
    iconColor: {
      type: String,
      default: 'light-gray',
    },
    iconCustomColor: {
      type: String,
      default: null,
    },
    iconDescription: {
      type: String,
      default: null,
    },
    modelValue: {
      type: [String, Number, Boolean],
      default: '',
    },
    mask: {
      type: String,
      default: '',
    },
  },

  emits: [
    'blur',
    'clear',
    'focus',
    'icon-click',
    'keydown',
    'keypress',
    'keyup',
    'update:modelValue',
  ],

  computed: {
    hasValue() {
      return this.computedValue !== null && ('' + this.computedValue).length > 0
    },

    computedClearIconClasses() {
      return [
        'sb-textfield__icon',
        'sb-textfield__icon--right',
        'sb-textfield__icon--pointer',
        'sb-textfield__icon--clearable',
      ]
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
        (this.iconRight || this.clearable) &&
          'sb-textfield__input--with-icon-right',
      ]
    },

    hasTextOnSide() {
      return [
        this.prefix && 'sb-textfield__input--with-prefix',
        this.suffix && 'sb-textfield__input--with-suffix',
      ]
    },

    componentClasses() {
      return [
        'sb-textfield__input',
        ...this.hasTextOnSide,
        ...this.hasIcon,
        ...this.hasSpecialClass,
      ]
    },

    isTextAreaType() {
      return this.type === 'textarea'
    },

    showClearIcon() {
      return this.hasValue && this.clearable
    },

    showCounter() {
      return (
        this.maxlength && !this.showError && this.hasValue && this.isOnInput
      )
    },

    showError() {
      return this.error && this.errorMessage
    },

    maxlengthParsed() {
      return parseInt(this.maxlength || 0)
    },

    isRaiseMaxlength() {
      return this.computedValueLength >= this.maxlengthParsed
    },

    isAlmostRaiseMaxlength() {
      const limit = Math.floor(this.maxlengthParsed * 0.2)

      return this.computedValueLength >= this.maxlengthParsed - limit
    },

    computedValueLength() {
      return `${this.computedValue}`.length
    },

    remainingValue() {
      if (!this.showCounter) {
        return 0
      }

      return this.maxlengthParsed - this.computedValueLength
    },

    returnIconCustomColor() {
      return this.iconCustomColor ? `color: ${this.iconCustomColor};` : ''
    },

    hasIconRight() {
      return (
        (this.iconRight || (this.error && this.iconRight)) &&
        this.type !== 'password'
      )
    },
    inputAttrs() {
      return {
        ...this.$attrs,
        class: '',
      }
    },
  },

  watch: {
    autofocus(val) {
      if (val) this.handleAutoFocus()
    },
  },

  mounted() {
    if (this.autofocus) this.handleAutoFocus()
  },

  methods: {
    handleAutoFocus() {
      this.$nextTick(() => this.$refs.textfield?.focus())
    },

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
      this.handleAutoFocus()
    },

    handleFocusInput(e) {
      this.isOnInput = true
      this.$emit('focus', e)
    },

    handleBlurInput(e) {
      this.isOnInput = false
      this.$emit('blur', e.target.value)
    },

    handleKeyDownInput(e) {
      this.$emit('keydown', e)
    },

    handleKeyPressInput(e) {
      this.$emit('keypress', e)
    },

    handleKeyUpInput(e) {
      this.$emit('keyup', e)
    },

    handleIconClick() {
      this.$emit('icon-click')
    },
  },
}
</script>
