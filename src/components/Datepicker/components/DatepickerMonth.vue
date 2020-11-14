<template>
  <div class="sb-datepicker-month">
    <button
      class="sb-datepicker-month__button"
      :disabled="disabled"
      @click="handlePreviousClick"
    >
      <SbIcon name="chevron-left" size="small" :color="iconColor" />
    </button>

    <span class="sb-datepicker-month__label">{{ label }}</span>

    <button
      class="sb-datepicker-month__button"
      :disabled="disabled"
      @click="handleNextClick"
    >
      <SbIcon name="chevron-right" size="small" :color="iconColor" />
    </button>
  </div>
</template>

<script>
import dayjs from 'dayjs'

import SbIcon from '../../Icon'

export default {
  name: 'SbDatepickerMonth',

  components: { SbIcon },

  props: {
    disabled: Boolean,
    value: {
      type: String,
      default: null,
    },
  },

  computed: {
    iconColor() {
      return this.disabled ? 'light-gray' : 'primary-dark'
    },

    label() {
      if (this.disabled) {
        return dayjs(this.value).format('MMM D, YYYY')
      }

      return dayjs(this.value).format('MMM, YYYY')
    },
  },

  methods: {
    handlePreviousClick() {
      this.$emit('previous-month')
    },

    handleNextClick() {
      this.$emit('next-month')
    },
  },
}
</script>
