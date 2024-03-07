<template>
  <div class="sb-numberfield" v-bind="$attrs">
    <label v-if="label" :for="id" class="sb-numberfield__label">
      {{ label }}
    </label>
    <div class="sb-numberfield__inner">
      <button :class="arrowIncreaseClasses" @click="increaseValue">
        <SbIcon
          color="primary-dark"
          name="chevron-up"
          class="sb-numberfield__icon sb-textfield__icon--up"
        />
      </button>
      <button :class="arrowDecreaseClasses" @click="decreaseValue">
        <SbIcon
          color="primary-dark"
          name="chevron-down"
          class="sb-numberfield__icon sb-textfield__icon--down"
        />
      </button>
      <input
        :id="id"
        :key="componentKey"
        :value="computedValue"
        class="sb-numberfield__input"
        data-testid="sb-numberfield__input"
        :autocomplete="autocomplete"
        :placeholder="placeholder"
        :name="name"
        type="number"
        :min="min"
        :max="max"
        :step="step"
        :precision="precision"
        :readonly="readonly"
        :class="componentClasses"
        :required="required"
        :disabled="disabled"
        @input="handleInputEvent"
        @focus="handleFocusEvent"
        @blur="handleBlurEvent"
        @change="handleChangeEvent"
        @keydown="handleKeydownEvent"
      />
      <slot />
    </div>

    <span
      v-if="showError"
      class="sb-numberfield__message sb-numberfield__message--error"
    >
      {{ errorMessage }}
    </span>
  </div>
</template>

<script lang="ts">
import SbIcon from '../Icon'
import NumberFieldMixin from '../../mixins/numberfield-mixin'

export default {
  name: 'SbNumberField',

  components: { SbIcon },

  mixins: [NumberFieldMixin],

  inheritAttrs: false,

  emits: ['blur', 'change', 'focus', 'update:modelValue', 'keydown'],

  computed: {
    isMinArrowDisabled() {
      return (
        this.calculateDecreasement(this.modelValue, this.step) < this.min ||
        this.disabled
      )
    },

    isMaxArrowDisabled() {
      return (
        this.calculateIncreasement(this.modelValue, this.step) > this.max ||
        this.disabled
      )
    },

    precisionNumber() {
      const stepPrecision = this.getPrecision(this.step)

      if (this.precision && stepPrecision > this.precision) {
        console.warn(
          '[NumberField] - precision should not be less than the decimal places of step',
        )

        return this.precision
      } else {
        return Math.max(this.getPrecision(this.modelValue), stepPrecision)
      }
    },

    computedValue() {
      let currentValue = this.internalValue

      if (this.userInput !== null) {
        return this.userInput
      }

      if (typeof currentValue === 'number' && this.precision) {
        currentValue = currentValue.toFixed(this.precision)
      }

      return currentValue
    },

    arrowIncreaseClasses() {
      return [
        this.isMaxArrowDisabled && 'sb-numberfield__arrow--disabled',
        'sb-numberfield__arrow--increase',
      ]
    },

    arrowDecreaseClasses() {
      return [
        this.isMinArrowDisabled && 'sb-numberfield__arrow--disabled',
        'sb-numberfield__arrow--decrease',
      ]
    },

    componentClasses() {
      return [
        this.error && 'sb-numberfield__input--error',
        !this.error && 'sb-numberfield__input--default',
      ]
    },

    showError() {
      return this.error && this.errorMessage
    },
  },

  watch: {
    modelValue: {
      handler(value) {
        let newValue = value === undefined ? value : Number(value)

        if (newValue) {
          if (isNaN(newValue)) {
            return
          }

          if (this.precision) {
            newValue = this.getClosestPreciseNumber(newValue, this.precision)
          }
        }

        if (newValue >= this.max) {
          newValue = this.max
        }

        if (newValue <= this.min) {
          newValue = this.min
        }

        this.internalValue = newValue
        this.userInput = null
        this.$emit('update:modelValue', newValue)
      },
      immediate: true,
    },
  },

  methods: {
    getClosestPreciseNumber(num, precision) {
      if (precision === undefined) {
        precision = this.precisionNumber
      }

      return parseFloat(
        Math.round(num * Math.pow(10, precision)) / Math.pow(10, precision),
      )
    },

    getPrecision(value) {
      if (!value) {
        return 0
      }

      const valueString = value.toString()
      const dotPosition = valueString.indexOf('.')
      let precision = 0

      if (dotPosition !== -1) {
        precision = valueString.length - dotPosition - 1
      }

      return precision
    },

    calculateIncreasement(value, step) {
      if (value && typeof value !== 'number') {
        return this.internalValue
      }

      const precisionFactor = Math.pow(10, this.precisionNumber)

      return this.getClosestPreciseNumber(
        (precisionFactor * value + precisionFactor * step) / precisionFactor,
      )
    },

    calculateDecreasement(value, step) {
      if (value && typeof value !== 'number') {
        return this.internalValue
      }

      const precisionFactor = Math.pow(10, this.precisionNumber)

      return this.getClosestPreciseNumber(
        (precisionFactor * value - precisionFactor * step) / precisionFactor,
      )
    },

    increaseValue() {
      if (this.isMaxArrowDisabled || this.readonly) {
        return
      }

      const value = this.modelValue || 0
      const newValue = this.calculateIncreasement(value, this.step)
      this.setInternalValue(newValue)
    },

    decreaseValue() {
      if (this.isMinArrowDisabled || this.readonly) {
        return
      }

      const value = this.modelValue || 0
      const newValue = this.calculateDecreasement(value, this.step)
      this.setInternalValue(newValue)
    },

    setInternalValue(newValue) {
      if (typeof newValue === 'number' && this.precision !== undefined) {
        newValue = this.getClosestPreciseNumber(newValue, this.precision)
      }

      if (newValue >= this.max) {
        newValue = this.max
      }
      if (newValue <= this.min) {
        newValue = this.min
      }
      if (this.internalValue === newValue) {
        return
      }

      this.userInput = null
      this.$emit('update:modelValue', newValue)
      this.$emit('change', newValue, this.internalValue)
      this.internalValue = newValue
    },

    handleBlurEvent(e) {
      if (e.target.value === '') {
        this.componentKey++
      }
      this.$emit('blur', e)
    },

    handleFocusEvent(e) {
      this.$emit('focus', e)
    },

    handleInputEvent(e) {
      this.userInput = e.target.value
    },

    handleChangeEvent(e) {
      const value = e.target.value
      const newValue = value === '' ? undefined : Number(value)
      if (!isNaN(newValue) || value === '') {
        this.setInternalValue(newValue)
      }
      this.userInput = null
    },

    handleKeydownEvent(e) {
      if (e.keyCode === 38) {
        e.preventDefault()
        this.increaseValue()
      } else if (e.keyCode === 40) {
        e.preventDefault()
        this.decreaseValue()
      }
      this.$emit('keydown', e)
    },
  },
}
</script>
